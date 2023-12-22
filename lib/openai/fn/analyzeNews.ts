import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources";
import { openai } from "..";
import { OpenaiAnalyzeNewsResponse, OpenaiJSONPrompt } from "../../types";
import { openaiModel } from "../../../config";
import fs from "fs";

export const analyzeNews = async (
  links: string[],
  brand: string,
  jsonFilePath: string
) => {
  const promptFunctionId = "analyze_news";

  const json = fs.readFileSync(jsonFilePath, "utf-8");
  const parsedJSON = JSON.parse(json) as OpenaiJSONPrompt[];

  const newsPromptsObject = parsedJSON.find(
    (obj) => obj.function_id === promptFunctionId
  );

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: newsPromptsObject?.system_message!,
    },
    {
      role: "user",
      content: `Brand to analyze impact for: ${brand}`,
    },
    {
      role: "user",
      content: JSON.stringify(links),
    },
  ];

  const msg = await openai.chat.completions.create({
    messages,
    temperature: 0,
    tools: [newsPromptsObject?.function_object!],
    model: openaiModel,
    tool_choice: {
      type: "function",
      function: {
        name: "evaluate_news",
      },
    },
  });

  const responseMessage = msg.choices[0].message;
  console.log(msg.usage);
  if (!responseMessage.tool_calls) throw new Error("Invalid output by AI.");

  const functionArguments = JSON.parse(
    responseMessage.tool_calls[0].function.arguments
  ) as OpenaiAnalyzeNewsResponse;

  return functionArguments.evaluated_news;
};
