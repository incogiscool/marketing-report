import puppeteer from "puppeteer";
import {
  tiktokPageLink,
  industryCode,
  reigonCode,
  period,
  resultAmount,
  keyword,
} from "../../config.js";
import { waitForInterceptedRequest } from "./fn/waitForInterceptedRequest.js";
import { createRequestInterceptionEvent } from "./fn/createRequestInterceptionEvent.js";

export const scrapeTikTokHashtags = async () => {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(30 * 1000);

    await page.goto(tiktokPageLink);
    await page.setRequestInterception(true);

    createRequestInterceptionEvent(
      page,
      industryCode,
      reigonCode,
      period,
      resultAmount,
      keyword
    );

    const res = await waitForInterceptedRequest(page);
    const data = (await res.json()).data.list;

    return data;
  } catch (e) {
    console.log("scraping failed");
    console.log(e);
  } finally {
    await browser.close();
  }
};
