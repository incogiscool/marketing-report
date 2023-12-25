import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";

export const openaiTextModel: ChatCompletionCreateParamsBase["model"] =
  "gpt-4-1106-preview";
export const openaiImageModel: ChatCompletionCreateParamsBase["model"] =
  "gpt-4-vision-preview";
