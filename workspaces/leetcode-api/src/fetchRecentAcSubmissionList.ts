import { gql } from "graphql-request";
import { z } from "zod";

import { numericIdAsStringZodType } from "@code-chronicles/util/numericIdAsStringZodType";

import { getGraphQLClient } from "./getGraphQLClient.ts";
import { questionTitleSlugZodType } from "./zod-types/questionTitleSlugZodType.ts";

const QUERY = gql`
  query ($username: String!, $limit: Int!) {
    recentAcSubmissionList(username: $username, limit: $limit) {
      id
      title
      titleSlug
      timestamp
    }
  }
`;

const submissionZodType = z.object({
  id: numericIdAsStringZodType,
  title: z.string().trim().min(1),
  titleSlug: questionTitleSlugZodType,

  // TODO: reusable ZodType for timestamps as well
  timestamp: z
    .string()
    .trim()
    .regex(/^[1-9][0-9]*$/)
    .transform((value) => parseInt(value, 10)),
});

export type RecentAcSubmission = z.infer<typeof submissionZodType>;

const recentAcSubmissionListZodType = z
  .object({
    recentAcSubmissionList: z.array(submissionZodType),
  })
  .transform((data) => data.recentAcSubmissionList);

export async function fetchRecentAcSubmissionList({
  limit = 50,
  username,
}: {
  limit?: number;
  username: string;
}): Promise<RecentAcSubmission[]> {
  const data = await getGraphQLClient().request(QUERY, { username, limit });

  return recentAcSubmissionListZodType.parse(data);
}
