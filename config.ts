import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";
import { getReigonCode } from "./lib/tiktok-hashtags/fn/getReigonCode";
import { Industry, Period, ResultAmount } from "./lib/types";

//Reigon of the results (Any reigon on the TikTok hashtag search website)
export const reigon = "United Arab Emirates";
//Industry - Null for all industries
export const industry: Industry | null = null;

//Link of TikTok hashtag search (as of 19/12/2023) - DO NOT CHANGE UNLESS TIKTOK WEB PAGE LINK HAS CHANGED
export const tiktokPageLink = `https://ads.tiktok.com/business/creativecenter/inspiration/popular/hashtag/pc/en?deviceType=pc&locale=en&region=${getReigonCode(
  reigon,
  "./country-codes.json"
)}`;

//Period of time for the results (days)
export const period: Period = 120;
//Amount of results - 3 or 20
export const resultAmount: ResultAmount = 20;
//Keyword for searching up hashtags with a certain keyword
export const keyword: string | null = null;

export const openaiModel: ChatCompletionCreateParamsBase["model"] = "gpt-4";
