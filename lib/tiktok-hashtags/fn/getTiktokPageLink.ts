import { getReigonCode } from "./getReigonCode";

export const getTiktokPageLink = (
  reigon: string,
  pathToCountryCodesJSON: string
) => {
  //Link of TikTok hashtag search (as of 19/12/2023) - DO NOT CHANGE UNLESS TIKTOK WEB PAGE LINK HAS CHANGED
  return `https://ads.tiktok.com/business/creativecenter/inspiration/popular/hashtag/pc/en?deviceType=pc&locale=en&region=${getReigonCode(
    reigon,
    pathToCountryCodesJSON
  )}`;
};
