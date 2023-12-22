import puppeteer, { Browser } from "puppeteer";
import { waitForInterceptedRequest } from "./fn/waitForInterceptedRequest";
import { createRequestInterceptionEvent } from "./fn/createRequestInterceptionEvent";
import { getReigonCode } from "./fn/getReigonCode";
import { getIndustryCode } from "./fn/getIndustryCode";
import { Industry, Period, ResultAmount } from "../types";
import { getTiktokPageLink } from "./fn/getTiktokPageLink";

//Period of time for the results (days)
//Amount of results - 3 or 20
//Keyword for searching up hashtags with a certain keyword
//Reigon of the results (Any reigon on the TikTok hashtag search website)
//Industry - Null for all industries
export const scrapeTikTokHashtags = async (
  reigon: string,
  industry: Industry | null,
  keyword: string | null,
  resultAmount: ResultAmount,
  period: Period,
  pathToCountryCodes: string
) => {
  let browser: Browser | null = null;
  const tiktokPageLink = getTiktokPageLink(reigon, pathToCountryCodes);

  try {
    browser = await puppeteer.launch({
      headless: true,
    });

    const reigonCode = getReigonCode(reigon, "./country-codes.json");
    const industryCode = getIndustryCode(industry, "./industry-codes.json");

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(30 * 1000);
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
    );

    await page.goto(tiktokPageLink);
    await page.setRequestInterception(true);

    console.log("intercepting request");
    createRequestInterceptionEvent(
      page,
      reigonCode,
      period,
      resultAmount,
      keyword,
      industryCode
    );
    console.log("intercepted request");

    console.log("waiting for response");
    const res = await waitForInterceptedRequest(page);
    console.log("recieved response");

    const data = (await res.json()).data.list;

    return data;
  } catch (e) {
    console.log("scraping failed");
    console.log(e);
  } finally {
    if (!browser) throw new Error("Browser undefined.");
    await browser.close();
  }
};
