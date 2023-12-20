# Marketing Analytics

## How it works

This program completes analysis given the competitors, hashtags, and other data.

## Setup

First, clone the repository to your local macine.

Then, install all dependancies

`npm install`

Lastly, run the script using

`ts-node index.ts`

or

`npm run main`

## Configuration

You can configure the response of the program using the variables in the `config.ts` file.

`./config.ts`

```
//Reigon of the results (Any reigon on the TikTok hashtag search website)
export const reigon = "United Arab Emirates";
//Industry - Null for all industries
export const industry: Industry | null = null;


//Period of time for the results (days)
export const period: Period = 120;

... more variables
```
