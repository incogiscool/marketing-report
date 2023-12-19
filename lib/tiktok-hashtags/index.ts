import puppeteer, { Browser } from "puppeteer";
import {
  tiktokPageLink,
  industryCode,
  reigonCode,
  period,
  resultAmount,
  keyword,
} from "../../config";
import { waitForInterceptedRequest } from "./fn/waitForInterceptedRequest";
import { createRequestInterceptionEvent } from "./fn/createRequestInterceptionEvent";

export const scrapeTikTokHashtags = async () => {
  let browser: Browser | null = null;

  try {
    browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(30 * 1000);

    await page.goto(tiktokPageLink);
    await page.setRequestInterception(true);

    console.log("intercepting");
    createRequestInterceptionEvent(
      page,
      reigonCode,
      period,
      resultAmount,
      keyword,
      industryCode
    );

    console.log("waiting for response");
    const res = await waitForInterceptedRequest(page);
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
