import nullthrows from "nullthrows";

import { SUBMISSION_STATUS_TO_ABBREVIATION } from "@code-chronicles/leetcode-api";
import { timestampInSecondsToYearMonthDay } from "@code-chronicles/util/timestampInSecondsToYearMonthDay";

import { LANGUAGE_TO_FILE_EXTENSION } from "./constants.js";
import type { TransformedSubmission } from "./transformSubmission.js";

export function getFilenameForSubmission({
  id,
  lang,
  // eslint-disable-next-line camelcase
  status_display,
  timestamp,
}: TransformedSubmission): string {
  const extension =
    LANGUAGE_TO_FILE_EXTENSION[
      lang as keyof typeof LANGUAGE_TO_FILE_EXTENSION
    ] ?? "txt";
  const date = timestampInSecondsToYearMonthDay(timestamp, "");
  const resultAbbreviation = nullthrows(
    SUBMISSION_STATUS_TO_ABBREVIATION[
      // eslint-disable-next-line camelcase
      status_display as keyof typeof SUBMISSION_STATUS_TO_ABBREVIATION
    ],
  ).toLowerCase();

  return `${date}-${id}-${resultAbbreviation}.${extension}`;
}
