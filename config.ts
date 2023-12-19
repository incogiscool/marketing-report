import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

export const reigon = "United Arab Emirates";
//Null for all industries
export const industry = null;

export const reigonCodesJSON = fs.readFileSync("./country-codes.json", "utf-8");
export const industryCodesJSON = fs.readFileSync(
  "./industry-codes.json",
  "utf-8"
);

export const reigonCode = JSON.parse(reigonCodesJSON).find(
  (obj: any) => obj.Name === reigon
).Code;
export const industryCode = JSON.parse(industryCodesJSON).find(
  (obj: any) => obj.value === (industry || "")
)?.id;

export const proxyAuth = `${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}`;
export const proxyLink = `wss://${proxyAuth}@${process.env.PROXY_HOST}`;
export const proxy2Link = `wss://chrome.browserless.io?token=${process.env.PROXY_TWO_HOST}`;

export const tiktokPageLink = `https://ads.tiktok.com/business/creativecenter/inspiration/popular/hashtag/pc/en?deviceType=pc&locale=en&region=${reigonCode}`;

//Days of results - 7 or 30 or 120
export const period = 120;
//Amount of results - 3 or 20
export const resultAmount = 20;

export const keyword = null;
