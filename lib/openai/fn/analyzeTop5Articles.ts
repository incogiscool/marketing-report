import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources";
import { openai } from "..";
import {
  AnalyzedNewsArticle,
  NewsArticle,
  OpenaiAnalyzeNewsResponse,
  OpenaiJSONPrompt,
} from "../../types";
import { openaiModel } from "../../../config";
import fs from "fs";
import { getJSONPrompt } from "./getJSONPrompt";

export const analyzeTop5Articles = async (
  articles: NewsArticle[],
  brand: string,
  jsonFilePath: string
) => {
  const promptFunctionId = "analyze_top_5_articles";

  const newsPromptsObject = getJSONPrompt(jsonFilePath, promptFunctionId);

  const top5Articles = articles.slice(0, 5);
  const top5ArticlesLinks = top5Articles.map((article) => article.articleLink);

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
      content: JSON.stringify(top5ArticlesLinks),
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

  const aiArgumentResponse = functionArguments.evaluated_news;

  const combined = top5Articles.map((article, i) => {
    return {
      ...article,
      sentiment: aiArgumentResponse[i]?.sentiment,
      summary: aiArgumentResponse[i]?.summary,
    };
  }) as AnalyzedNewsArticle[];

  return combined;
};
