// const puppeteer = require("puppeteer-core");
const puppeteer = require("puppeteer");
const fs = require("fs");
require("dotenv").config();

async function interceptRequest(page, industryCode, reigonCode) {
  const interceptLink = `https://ads.tiktok.com/creative_radar_api/v1/popular_trend/hashtag/list?page=1&limit=20&hperiod=7&industry_id=${industryCode}&country_code=${reigonCode}&sort_by=popular`;
  await page.setRequestInterception(true);

  page.on("request", (request) => {
    if (
      request.url().includes(
        // "https://ads.tiktok.com/creative_radar_api/v1/popular_trend/hashtag/list"
        "https://ads.tiktok.com/creative_radar_api/v1/popular_trend/hashtag/"
      )
    ) {
      request.continue({
        // url: `https://ads.tiktok.com/creative_radar_api/v1/popular_trend/hashtag/list?page=1&limit=20&period=7&industry_id=25000000000&country_code=AE&sort_by=popular`,
        url: interceptLink,
      });
    } else request.continue();
  });

  await page.waitForResponse(
    (response) =>
      response
        .request()
        .url()
        .includes(
          "https://ads.tiktok.com/creative_radar_api/v1/popular_trend/hashtag/list"
        ) && response.ok()
  );
}

const scrape = async () => {
  let browser;

  const proxyAuth = `${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}`;
  const proxyLink = `wss://${proxyAuth}@${process.env.PROXY_HOST}`;

  const proxy2Link = `wss://chrome.browserless.io?token=${process.env.PROXY_TWO_HOST}`;

  const reigon = "United Arab Emirates";
  const industry = "Baby, Kids & Maternity";

  const reigonCodesJSON = fs.readFileSync("./country-codes.json", "utf-8");
  const industryCodesJSON = fs.readFileSync("./industry-codes.json", "utf-8");

  const reigonCode = JSON.parse(reigonCodesJSON).find(
    (obj) => obj.Name === reigon
  ).Code;

  const tiktokPageLink = `https://ads.tiktok.com/business/creativecenter/inspiration/popular/hashtag/pc/en?deviceType=pc&locale=en&region=${reigonCode}`;
  const industryCode = JSON.parse(industryCodesJSON).find(
    (obj) => obj.value === industry
  ).id;

  console.log({
    reigonCode,
    industryCode,
  });

  /*
  
    ADD CAN SEARCH HASHTAG AND SEE POSTS/VIEWS
    ADD CAN SEARCH BY INDUSTRY - done
    ADD CAN DO LAST 7 OR 30 OR 120 DAYS

  */

  try {
    console.log("connecting to proxy");
    // browser = await puppeteer.connect({
    //   browserWSEndpoint: proxy2Link,
    //   // browserWSEndpoint: proxyLink,
    // });

    browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    //30 seconds
    page.setDefaultNavigationTimeout(30 * 1000);

    console.log("connecting to " + tiktokPageLink);

    await page.goto(tiktokPageLink);

    await page.click("#hashtagIndustrySelect");

    const industrySelector = ".creative-component-single-line";
    await page.waitForSelector(industrySelector);

    const industryData = await page.$$(industrySelector);

    const allIndustryData = await Promise.all(
      industryData
        .map(async (data) => {
          return await data.evaluate((data) => {
            return data.innerHTML.replace("&amp;", "&");
          });
        })
        .splice(0, 18)
    );

    const selectedIndustryIndex = allIndustryData.indexOf(industry);

    console.log(selectedIndustryIndex);

    //Removed the await because it seems to be holding back the request interception
    industryData[selectedIndustryIndex].click();

    await interceptRequest(page, industryCode, reigonCode);

    const hashtagItemSelector = "#hashtagItemContainer";

    await page.waitForSelector(hashtagItemSelector);

    const allData = await page.$$(hashtagItemSelector);

    const data = await Promise.all(
      allData.map(async (data) => {
        return await data.evaluate(async (e) => {
          const href = e.getAttribute("href");
          const hashtag = e
            .querySelector(".CardPc_titleText__RYOWo")
            .innerHTML.split(" ")
            .join("");

          const posts = e.querySelector(
            "#hashtagItemContainer > div.CardPc_pavWrapper__uYi97 > div:nth-child(1) > span.CardPc_itemValue__XGDmG"
          ).innerHTML;

          const views = e.querySelector(
            "#hashtagItemContainer > div.CardPc_pavWrapper__uYi97 > div:nth-child(2) > span.CardPc_itemValue__XGDmG"
          ).innerHTML;

          return {
            hashtag,
            href,
            views,
            posts,
          };
        });
      })
    );
    console.log(data);

    // console.log(allData);
  } catch (e) {
    console.log("scraping failed");
    console.log(e);
  } finally {
    await browser.close();
  }
};

scrape();
