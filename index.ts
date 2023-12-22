import { getInstagramHashtagPosts } from "./lib/curator/instagram-hashtags";
import { scrapeTikTokHashtags } from "./lib/tiktok-hashtags";
import { openai } from "./lib/openai";
import { getGoogleNewsRSSData } from "./lib/news/google-news-rss";
import { analyzeTop5Articles } from "./lib/openai/fn/analyzeTop5Articles";

(async () => {
  const brand = "apple";
  const hashtags = await scrapeTikTokHashtags(
    "United Arab Emirates",
    "News & Entertainment",
    brand,
    20,
    30,
    "./country-codes.json"
  );

  console.log(hashtags);

  // const res = (await getInstagramHashtagPosts(brand)).posts.splice(0, 10);

  // for (let i = 0; i < res.length; i++) {
  //   const post = res[i];

  //   const dataType = post.has_image ? "image" : post.has_video ? "video" : null;

  //   console.log({
  //     text: post.text,
  //     type: dataType,
  //   });
  // }

  // const news = await getGoogleNewsRSSData(brand);
  // const aiRes = await analyzeTop5Articles(news, brand, "./openai_prompts.json");

  // console.log(aiRes);
})();
