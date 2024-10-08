# @code-chronicles/leetcode-api

Read data from the LeetCode API in TypeScript!

For example, run:

```ts
import { fetchActiveDailyCodingChallengeQuestionWithDateValidation as fetchPotd } from "@code-chronicles/leetcode-api";

const potd = await fetchPotd();
console.log(JSON.stringify(potd, null, 2));
```

The output may look something like:

```json
{
  "date": "2024-08-03",
  "question": {
    "difficulty": "Easy",
    "questionFrontendId": 1460,
    "title": "Make Two Arrays Equal by Reversing Subarrays",
    "titleSlug": "make-two-arrays-equal-by-reversing-subarrays"
  }
}
```

Used to power sibling packages like:

- [`@code-chronicles/download-leetcode-submissions`](../download-leetcode-submissions/), which downloads the logged-in user's LeetCode submissions
- [`@code-chronicles/fetch-leetcode-problem-list`](../fetch-leetcode-problem-list/), which fetches the metadata of all LeetCode problems
- [`@code-chronicles/post-leetcode-potd-to-discord`](../post-leetcode-potd-to-discord/), which queries LeetCode's problem of the day and posts about it in a Discord channel

## Development

Like the rest of the [Code Chronicles Leetcode ecosystem](../../), this package is structured as a Node module, using [Yarn](https://yarnpkg.com/) as the package manager.

You can install dependencies by running `yarn`, either in this package's directory, or in the repository root. The usual `yarn format`, `yarn lint`, and `yarn typecheck` scripts are available to aid in development and occasionally to annoy.

See also the repository's general [development guide](../../DEVELOPMENT.md).
