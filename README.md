# TikTok Popular Hashtag Scraper

## How it works

This program first navigates to the [TikTok popular hashtags web page](https://ads.tiktok.com/business/creativecenter/inspiration/popular/hashtag/), intercepts the request between the TikTok API and the client, modifies the request with the parameters in the `config.ts file`, and sends the request back to the TikTok API endpoint. This gives us full control over the response of the TikTok API, and makes it much more maintainable than using CSS selectors.

## Setup

First, clone the repository to your local macine.

`git clone https://github.com/incogiscool/TikTok-Popular-Hashtag-Scraper`

Then, install all dependancies

`npm install`

Lastly, run the script using

`ts-node index.ts`

or

`npm run main`

## Configuration

You can configure the response of the API using the variables in the `config.ts` file.

`./config.ts`

```
//Reigon of the results (Any reigon on the TikTok hashtag search website)
export const reigon = "United Arab Emirates";
//Industry - Null for all industries
export const industry: Industry | null = null;


//Period of time for the results (days)
export const period: Period = 120;

//Amount of results - 3 or 20
export const resultAmount: ResultAmount = 20;

//Keyword for searching up hashtags with a certain keyword
export const keyword: string | null = null;
```

**IMPORTANT:** When running the script, do not interact with the chromium popup while it is open as it will adjust the request details and possibly break the script.
