import { queryVideos } from "./lib/tiktok-api";
import { scrapeTikTokHashtags } from "./lib/tiktok-hashtags";

(async () => {
  //Sensitive, can't interact with popup so an headless browser would be best
  const hashtags = await scrapeTikTokHashtags();
  console.log(hashtags);

  // const res = await queryVideos("starbucks");

  // console.log(res);
})();
