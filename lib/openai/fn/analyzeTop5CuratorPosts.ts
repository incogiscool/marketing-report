import axios from "axios";
import { openai } from "..";
import { openaiImageModel, openaiTextModel } from "../../../config";
import { CuratorPost } from "../../types";
import { getJSONPrompt } from "./getJSONPrompt";
import { ChatCompletionMessageParam } from "openai/resources";

export const analyzeTop5CuratorPosts = async (
  posts: CuratorPost[],
  promptPath: string,
  brand: string
) => {
  const functionIdImage = "analyze_top_5_posts_image";
  const functionIdVideo = "analuze_top_5_posts_video";

  const postTextLimit = 500;
  const filteredPosts = posts.filter(
    (post) => post.text.length < postTextLimit
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

    // console.log(contentType);
    // console.log(post.video, post.image);

    switch (contentType) {
      case "image": {
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
          image_description: res,
          social_media_post_description: text,
        });
      }
      //   case "video": {
      //     const promptData = getJSONPrompt(promptPath, functionIdVideo);

      //     const res = (await axios.get(post.video)).data;
      //     const buffer = Buffer.from(res);

      //     return [buffer, post.video];
      //     // openai.audio.translations.create({
      //     //     model: "whisper-1",
      //     //     file:
      //     // })
      //   }
    }
  }

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "Given a description of an image and and also the description of the social media post, evaluate each of their sentiments using an integer between 0-10.",
    },
    {
      role: "user",
      content: `Brand to analyze impact for: ${brand}`,
    },
    {
      role: "user",
      content: JSON.stringify(descriptions),
    },
  ];

  const msg = await openai.chat.completions.create({
    messages,
    temperature: 0,
    tools: [
      {
        type: "function",
        function: {
          name: "evaluate_posts",
          description:
            "Evaluates and formats the news for use in the frontend.",
          parameters: {
            type: "object",
            properties: {
              sentiments: {
                type: "array",
                items: {
                  type: "integer",
                  description:
                    "The sentiment score of the given post. From a scale of 0-10 in the public point of views. 0 being incredibly negative for the brand to analyze, while 10 being incredibly postive for the brand to analyze.",
                },
              },
            },
            required: ["sentiments"],
          },
        },
      },
    ],
    model: openaiTextModel,
    tool_choice: {
      type: "function",
      function: {
        name: "evaluate_posts",
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
  return top5PostsWithSentiments;
  //   return top5Posts;
};
