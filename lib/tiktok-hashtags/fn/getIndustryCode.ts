import fs from "fs";
import { Industry } from "../../types";

export function getIndustryCode(industry: Industry | null, pathToJSON: string) {
  const industryCodesJSON = fs.readFileSync(pathToJSON, "utf-8");

  return JSON.parse(industryCodesJSON).find(
    (obj: any) => obj.value === (industry || "")
  )?.id;
}
