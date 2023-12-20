import { getInstagramHashtagPosts } from "./lib/curator";
import { scrapeTikTokHashtags } from "./lib/tiktok-hashtags";

(async () => {
  // const hashtags = await scrapeTikTokHashtags();
  // console.log(hashtags);

  const res = (await getInstagramHashtagPosts("mcdonalds")).posts;
  const res2 = (await getInstagramHashtagPosts("starbucks")).posts;

  console.log(res.concat(res2));
})();
