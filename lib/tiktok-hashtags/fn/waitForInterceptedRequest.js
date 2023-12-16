export async function waitForInterceptedRequest(page) {
  return await page.waitForResponse(
    (response) =>
      response
        .request()
        .url()
        .includes(
          "https://ads.tiktok.com/creative_radar_api/v1/popular_trend/hashtag/list"
        ) && response.ok()
  );
}
