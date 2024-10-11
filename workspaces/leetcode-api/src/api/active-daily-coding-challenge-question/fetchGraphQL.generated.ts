// THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
// Instead, update the generation process or inputs and run `yarn codegen`.

import { z } from "zod";

import { getGraphQLClient } from "../../getGraphQLClient.ts";
import type * as Types from "../../graphqlTypes.generated.ts";

type ActiveDailyCodingChallengeQuestionQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

type ActiveDailyCodingChallengeQuestionQuery = {
  activeDailyCodingChallengeQuestion: {
    date: string;
    question: {
      difficulty: string;
      questionFrontendId: string;
      title: string;
      titleSlug: string;
    };
  };
};

export const QUERY =
  "query{activeDailyCodingChallengeQuestion{date question{difficulty questionFrontendId title titleSlug}}}";

export const queryResultZodType = z.object({
  activeDailyCodingChallengeQuestion: z.object({
    date: z.string(),
    question: z.object({
      difficulty: z.string(),
      questionFrontendId: z.string(),
      title: z.string(),
      titleSlug: z.string(),
    }),
  }),
});

export type QueryResult = z.infer<typeof queryResultZodType>;
export type QueryVariables = ActiveDailyCodingChallengeQuestionQueryVariables;

export async function fetchGraphQL(): Promise<QueryResult> {
  const untrustedData = await getGraphQLClient().request(QUERY);

  // The type annotation serves as a TypeScript assert that the generated
  // Zod type is compatible with the types generated by GraphQL Codegen.
  const validatedData: ActiveDailyCodingChallengeQuestionQuery & QueryResult =
    queryResultZodType.parse(untrustedData);

  return validatedData;
}
