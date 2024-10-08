import path from "node:path";

import type { PluginFunction } from "@graphql-codegen/plugin-helpers";
import graphqlQueryCompress from "graphql-query-compress";
import invariant from "invariant";
import nullthrows from "nullthrows";
import { z } from "zod";

import { isObject } from "@code-chronicles/util/isObject";
import { only } from "@code-chronicles/util/only";
import { spliceString } from "@code-chronicles/util/spliceString";

import { generateQueryResultZodType } from "./generateQueryResultZodType.ts";

const nonNegativeIntZodType = z.number().int().nonnegative();

const operationNameZodType = z.object({
  value: z.string(),
  loc: z.object({ start: nonNegativeIntZodType, end: nonNegativeIntZodType }),
});

export const plugin: PluginFunction<{}> = async function plugin(
  _schema,
  documents,
) {
  // Encode some assumptions as invariants, namely that there is a single query
  // operation in the file.
  const { document, rawSDL: unminifiedGraphQL, location } = only(documents);
  const definition = only(nullthrows(document).definitions);
  invariant(
    isObject(definition) &&
      definition.kind === "OperationDefinition" &&
      definition.operation === "query",
    "Expected a query!",
  );

  // TODO: should we call it a Zod schema instead?

  // Generate a Zod type to parse the result!
  const queryTypesFile = path.join(
    path.dirname(nullthrows(location)),
    "queryTypes.generated.ts",
  );
  const queryResultZodTypeCode =
    await generateQueryResultZodType(queryTypesFile);

  // Extract the operation name from the definition, as well as information
  // about its location in the raw, unminified GraphQL.
  const {
    value: operationName,
    loc: { start: operationNameStart, end: operationNameEnd },
  } = operationNameZodType.parse(definition.name);
  const operationNameLength = operationNameEnd - operationNameStart;
  invariant(
    operationName.length === operationNameLength,
    "Operation name length mismatch!",
  );

  // Minify the GraphQL we use for the query.
  const minifiedGraphQL = graphqlQueryCompress(
    spliceString(
      nullthrows(unminifiedGraphQL),
      operationNameStart,
      operationNameLength,
    ),
  );

  return {
    prepend: [
      `
        import { z } from "zod";

        import { getGraphQLClient } from "../../getGraphQLClient.ts";
        import type {
          ${operationName}Query as OriginalQueryResult,
          ${operationName}QueryVariables as OriginalQueryVariables,
        } from "./queryTypes.generated.ts";
      `,
    ],
    append: [
      `
        export const QUERY = ${JSON.stringify(minifiedGraphQL)};

        ${queryResultZodTypeCode}

        export type QueryResult = z.infer<typeof queryResultZodType>;
        export type QueryVariables = OriginalQueryVariables;

        export async function fetchGraphQL(variables: QueryVariables): Promise<QueryResult> {
          const untrustedData = await getGraphQLClient().request(QUERY, variables);

          // The type annotation serves as a TypeScript assert that the generated
          // Zod type is compatible with the types generated by GraphQL Codegen.
          const validatedData: OriginalQueryResult = queryResultZodType.parse(untrustedData);

          return validatedData;
        }
      `,
    ],
    content: "",
  };
};
