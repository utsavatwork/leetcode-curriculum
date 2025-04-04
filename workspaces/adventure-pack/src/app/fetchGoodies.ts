import type { ReadonlyDeep } from "type-fest";
import { z } from "zod";

import { GOODIES_FILENAME } from "./constants.ts";
import { javaGoodyZodType } from "./zod-types/javaGoodyZodType.ts";
import { javaScriptGoodyZodType } from "./zod-types/javaScriptGoodyZodType.ts";
import { kotlinGoodyZodType } from "./zod-types/kotlinGoodyZodType.ts";
import { python3GoodyZodType } from "./zod-types/python3GoodyZodType.ts";
import { typeScriptGoodyZodType } from "./zod-types/typeScriptGoodyZodType.ts";

const goodiesByLanguage = z.object({
  java: z.record(z.string(), javaGoodyZodType),
  javascript: z.record(z.string(), javaScriptGoodyZodType),
  kotlin: z.record(z.string(), kotlinGoodyZodType),
  python3: z.record(z.string(), python3GoodyZodType),
  typescript: z.record(z.string(), typeScriptGoodyZodType),
});

export type GoodiesByLanguage = ReadonlyDeep<z.infer<typeof goodiesByLanguage>>;

export async function fetchGoodies(): Promise<GoodiesByLanguage> {
  const response = await fetch(GOODIES_FILENAME);

  if (!response.ok) {
    throw new Error(`Got status ${response.status} from server!`);
  }

  return goodiesByLanguage.parse(await response.json());
}
