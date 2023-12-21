import { getInstagramHashtagPosts } from "./lib/curator/instagram-hashtags";
import { scrapeTikTokHashtags } from "./lib/tiktok-hashtags";
import { openai } from "./lib/openai";
import { getGoogleNewsRSSData } from "./lib/news/google-news-rss";

(async () => {
  // const hashtags = await scrapeTikTokHashtags();
  // console.log(hashtags);

  // const res = (await getInstagramHashtagPosts("mcdonalds")).posts.splice(0, 10);
  // const res2 = (await getInstagramHashtagPosts("starbucks")).posts.splice(
  //   0,
  //   10
  // );

  // const data = res.concat(res2);

  // for (let i = 0; i < data.length; i++) {
  //   const post = data[i];

  //   const dataType = post.has_image ? "image" : post.has_video ? "video" : null;

  //   console.log(post.text);
  // }

  const news = await getGoogleNewsRSSData("starbucks");

  console.log(news);
})();
