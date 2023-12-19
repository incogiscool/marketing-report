import fs from "fs";

export function getReigonCode(reigon: string, pathToJSON: string) {
  const reigonCodesJSON = fs.readFileSync(pathToJSON, "utf-8");

  return JSON.parse(reigonCodesJSON).find((obj: any) => obj.Name === reigon)
    .Code;
}
