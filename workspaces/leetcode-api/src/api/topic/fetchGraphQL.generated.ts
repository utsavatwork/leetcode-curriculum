// THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
// Instead, update the generation process or inputs and run `yarn codegen`.

import { z } from "zod";

import { getGraphQLClient } from "../../getGraphQLClient.ts";
import type * as Types from "../../graphqlTypes.generated.ts";

type TopicQueryVariables = Types.Exact<{
  topicId: Types.Scalars["Int"]["input"];
}>;

type TopicQuery = {
  topic?: {
    title: string;
    solutionTags: Array<{ slug: string } | null>;
    post: { content: string };
  } | null;
};

export const QUERY =
  "query($topicId:Int!){topic(id:$topicId){title solutionTags{slug}post{content}}}";

export const queryResultZodType = z.object({
  topic: z
    .object({
      title: z.string(),
      solutionTags: z.array(z.object({ slug: z.string() }).nullable()),
      post: z.object({ content: z.string() }),
    })
    .nullable()
    .optional(),
});

export type QueryResult = z.infer<typeof queryResultZodType>;
export type QueryVariables = TopicQueryVariables;

export async function fetchGraphQL(
  variables: QueryVariables,
): Promise<QueryResult> {
  const untrustedData = await getGraphQLClient().request(QUERY, variables);

  // The type annotation serves as a TypeScript assert that the generated
  // Zod type is compatible with the types generated by GraphQL Codegen.
  const validatedData: TopicQuery & QueryResult =
    queryResultZodType.parse(untrustedData);

  return validatedData;
}
