import { OpenaiJSONPrompt } from "../../types";
import fs from "fs";

export const getJSONPrompt = (path: string, function_id: string) => {
  const json = fs.readFileSync(path, "utf-8");
  const parsedJSON = JSON.parse(json) as OpenaiJSONPrompt[];

  const obj = parsedJSON.find((obj) => obj.function_id === function_id);

  return obj;
};
