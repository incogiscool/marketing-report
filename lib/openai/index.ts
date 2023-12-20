import OpenAI from "openai";
import { openaiApiKey } from "../constants";

export const openai = new OpenAI({
  apiKey: openaiApiKey,
});
