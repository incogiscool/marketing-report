import axios from "axios";
import { openai } from "..";
import { openaiImageModel, openaiTextModel } from "../../../config";
import { AnalyzedPost, CuratorPost } from "../../types";
import { getJSONPrompt } from "./getJSONPrompt";
import { ChatCompletionMessageParam } from "openai/resources";

export const analyzeTop5CuratorPosts = async (
  posts: CuratorPost[],
  promptPath: string,
  brand: string
) => {
  const functionId = "analyze_top_5_posts";
  const functionIdImage = "analyze_top_5_posts_image";

  const postTextLimit = 400;
  const filteredPosts = posts.filter(
    (post) => post.text.length < postTextLimit && post.image
  );

  const top5Posts = filteredPosts.slice(0, 5);

  let descriptions = [];

  for (let i = 0; i < top5Posts.length; i++) {
    const post = top5Posts[i];
    const text = post.text;
    const contentType = post.has_image
      ? "image"
      : post.has_video
      ? "video"
      : "text";

    const promptData = getJSONPrompt(promptPath, functionIdImage);

    const response = await openai.chat.completions.create({
      model: openaiImageModel,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: promptData?.system_message!,
            },
            {
              type: "image_url",
              image_url: {
                url: post.image,
                detail: "low",
              },
            },
          ],
        },
      ],
      temperature: 0,
      max_tokens: 200,
    });

    const res = response.choices[0].message;

    descriptions.push({
      image_description: res.content,
      ...post,
    });
  }

  const promptData = getJSONPrompt(promptPath, functionId);

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: promptData?.system_message!,
    },
    {
      role: "user",
      content: `Brand to analyze impact for: ${brand}`,
    },
    {
      role: "user",
      content: JSON.stringify(
        descriptions.map(({ image_description, text, ...rest }) => ({
          image_description,
          social_media_post_description: text,
        }))
      ),
    },
  ];

  const msg = await openai.chat.completions.create({
    messages,
    temperature: 0,
    tools: [promptData?.function_object!],
    model: openaiTextModel,
    tool_choice: {
      type: "function",
      function: {
        name: "analyze_top_5_posts",
      },
    },
  });

  const responseMessage = msg.choices[0].message;
  if (!responseMessage.tool_calls) throw new Error("Invalid output by AI.");

  const functionArguments = JSON.parse(
    responseMessage.tool_calls[0].function.arguments
  );

  const senitments = functionArguments.sentiments;

  const top5PostsWithSentiments = descriptions.map((post, i) => {
    return {
      ...post,
      sentiment: senitments[i],
    };
  });

  console.log(msg.usage);
  return top5PostsWithSentiments as AnalyzedPost[];
};
