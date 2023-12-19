import { Page } from "puppeteer";

export function createRequestInterceptionEvent(
  page: Page,
  reigonCode: number,
  period: number,
  resultAmount: number,
  keyword?: string | null,
  industryCode?: number | null
) {
  const interceptLink = `https://ads.tiktok.com/creative_radar_api/v1/popular_trend/hashtag/list?page=1&limit=${resultAmount}&period=${period}${
    industryCode ? `&industry=${industryCode}` : ""
  }&country_code=${reigonCode}&sort_by=popular${
    keyword ? `&keyword=${keyword}` : ""
  }`;

  page.on("request", (request) => {
    if (
      request
        .url()
        .includes(
          "https://ads.tiktok.com/creative_radar_api/v1/popular_trend/hashtag/"
        )
    ) {
      console.log("intercepting request");
      request.continue({
        url: interceptLink,
      });
    } else request.continue();
  });
}
