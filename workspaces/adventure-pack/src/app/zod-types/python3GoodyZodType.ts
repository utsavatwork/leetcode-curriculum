import type { ReadonlyDeep } from "type-fest";
import { z } from "zod";

import { nonBlankStringZodType } from "@code-chronicles/util/zod-types/nonBlankStringZodType";

import { goodyBaseZodType } from "./goodyBaseZodType.ts";

export const python3GoodyZodType = goodyBaseZodType
  .extend({
    code: nonBlankStringZodType,
    language: z.literal("python3"),
  })
  .strict();

export type Python3Goody = ReadonlyDeep<z.infer<typeof python3GoodyZodType>>;
