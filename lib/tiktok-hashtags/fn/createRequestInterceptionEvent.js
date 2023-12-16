export function createRequestInterceptionEvent(
  page,
  industryCode,
  reigonCode,
  period,
  resultAmount,
  keyword
) {
  const interceptLink = `https://ads.tiktok.com/creative_radar_api/v1/popular_trend/hashtag/list?page=1&limit=${resultAmount}&period=${period}${
    industryCode ? `&industry=${industryCode}` : ""
  }&country_code=${reigonCode}&sort_by=popular${
    keyword ? `&keyword=${keyword}` : ""
  }`;

  console.log(interceptLink);

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
