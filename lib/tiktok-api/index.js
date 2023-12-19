// import puppeteer, { Browser } from "puppeteer";
// // import puppeteer, { Browser } from "puppeteer-core";

// export const queryVideos = async (query: string) => {
//   let browser: Browser | null = null;

//   try {
//     browser = await puppeteer.launch({
//       headless: false,
//     });

//     const page = await browser.newPage();
//     page.setDefaultNavigationTimeout(30 * 1000);

//     await page.goto(`https://www.tiktok.com/search/video?q=${query}`);
//     await page.setRequestInterception(true);

//     // page.on("request", (request) => {
//     //   if (
//     //     request.url().includes("https://www.tiktok.com/api/search/general/full")
//     //   ) {
//     //     console.log("intercepting request");
//     //     request.continue({
//     //       url: "https://www.tiktok.com/api/search/general/preview/?WebIdLastTime=1699335924&aid=1988&app_language=en&app_name=tiktok_web&browser_language=en-US&browser_name=Mozilla&browser_online=true&browser_platform=MacIntel&browser_version=5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010_15_7%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F118.0.0.0%20Safari%2F537.36&channel=tiktok_web&cookie_enabled=true&device_id=7298592154157909512&device_platform=web_pc&focus_state=true&from_page=search&history_len=11&is_fullscreen=false&is_page_visible=true&keyword=mcdonalds&os=mac&priority_region=&referer=&region=AE&screen_height=802&screen_width=888&tz_name=Asia%2FDubai&webcast_language=en",
//     //     });
//     //   } else request.continue();
//     // });

//     // const res = await page.waitForResponse((response) =>
//     //   response
//     //     .request()
//     //     .url()
//     //     .includes("https://www.tiktok.com/api/search/general/full")
//     // );

//     // return await res.json();
//   } catch (e) {
//     console.log("scraping failed");
//     console.log(e);
//   } finally {
//     if (!browser) throw new Error("Browser undefined.");
//     await browser.close();
//   }
// };

import Signer from "tiktok-signature";
import axios from "axios";

export const queryVideos = async (query) => {
  // const queryLink =
  // "https://www.tiktok.com/api/search/general/full/?WebIdLastTime=1699335924&aid=1988&app_language=en&app_name=tiktok_web&browser_language=en-US&browser_name=Mozilla&browser_online=true&browser_platform=MacIntel&browser_version=5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010_15_7%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F118.0.0.0%20Safari%2F537.36&channel=tiktok_web&cookie_enabled=true&device_id=7298592154157909512&device_platform=web_pc&device_type=web_h264&focus_state=true&from_page=search&history_len=3&is_fullscreen=false&is_page_visible=true&keyword=mcdonalds&offset=0&os=mac&priority_region=&referer=&region=AE&screen_height=802&screen_width=888&search_source=normal_search&tz_name=Asia%2FDubai&web_search_code=%7B%22tiktok%22%3A%7B%22client_params_x%22%3A%7B%22search_engine%22%3A%7B%22ies_mt_user_live_video_card_use_libra%22%3A1%2C%22mt_search_general_user_live_card%22%3A1%7D%7D%2C%22search_server%22%3A%7B%7D%7D%7D&webcast_language=en&msToken=_KtPu6Lt3TzjVqONkebTlG7cjQVWKQQtoj74K3VhuG_g-iM_bo0D4Hh4bg1XfZ4b-Htx93sHfI2WjnhOGYjQ5DfIY8AXayniADW2O5qsQBUfLHd6RpBjJZfh62d09jNjt0Ga3IOFDTHlQj7p&X-Bogus=DFSzswVEmxkANJJvtNIt/z9WcBrj&_signature=_02B4Z6wo00001n5MhRAAAIDCfkyFEdItO35-TIGAAPoh9c";
  const queryLink = `https://www.tiktok.com/api/search/general/preview/?WebIdLastTime=1699335924&aid=1988&app_language=en&app_name=tiktok_web&browser_language=en-US&browser_name=Mozilla&browser_online=true&browser_platform=MacIntel&browser_version=5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010_15_7%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F118.0.0.0%20Safari%2F537.36&channel=tiktok_web&cookie_enabled=true&device_id=7298592154157909512&device_platform=web_pc&focus_state=true&from_page=search&history_len=3&is_fullscreen=false&is_page_visible=true&keyword=${query}&os=mac&priority_region=&referer=&region=AE&screen_height=802&screen_width=888&tz_name=Asia%2FDubai&webcast_language=en`;

  async function testApiReq({ userAgent, xTtParams }) {
    const options = {
      method: "GET",
      headers: {
        "user-agent": userAgent,
        "x-tt-params": xTtParams,
      },
      url: queryLink,
    };
    return axios(options);
  }
  const signer = new Signer(); // Create new signer
  await signer.init(); // Create page with. Returns promise

  const signature = await signer.sign(queryLink); // Get sign for your url. Returns promise
  const navigator = await signer.navigator(); // Retrieve navigator data used when signature was generated

  // console.log(signature);
  // console.log(navigator);

  await signer.close(); // Close browser. Returns promise

  const { "x-tt-params": xTtParams } = signature;
  const { user_agent: userAgent } = navigator;
  const res = await testApiReq({ userAgent, xTtParams });
  const { data } = res;
  console.log(data);

  // const parsed = data.sug_list;

  // parsed.forEach((obj) => {
  //   console.log(obj);
  // });
};
