import { getInstagramHashtagPosts } from "./lib/curator/instagram-hashtags";
import { scrapeTikTokHashtags } from "./lib/tiktok-hashtags";
import { openai } from "./lib/openai";
import { getGoogleNewsRSSData } from "./lib/news/google-news-rss";
import { analyzeTop5Articles } from "./lib/openai/fn/analyzeTop5Articles";
import natural from "natural";
import { analyzeTop5CuratorPosts } from "./lib/openai/fn/analyzeTop5CuratorPosts";

(async () => {
  const brand = "starbucks";
  // const hashtags = await scrapeTikTokHashtags(
  //   "United Arab Emirates",
  //   "News & Entertainment",
  //   brand,
  //   20,
  //   30,
  //   "./country-codes.json"
  // );
  // console.log(hashtags);

  const res = await getInstagramHashtagPosts(brand);

  const analyzePostsRes = await analyzeTop5CuratorPosts(
    res.posts,
    "./openai_prompts.json",
    brand
  );

  console.log(analyzePostsRes);

  // const aiRes = await analyzeTop5Articles(news, brand, "./openai_prompts.json");
  // console.log(aiRes);
})();
