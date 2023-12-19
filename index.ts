import { scrapeTikTokHashtags } from "./lib/tiktok-hashtags";

(async () => {
  const hashtags = await scrapeTikTokHashtags();
  console.log(hashtags);
})();
