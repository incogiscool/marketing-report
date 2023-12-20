import dotnev from "dotenv";
dotnev.config();

export const supportedIndustries = [
  "Apparel & Accessories",
  "Baby, Kids & Maternity",
  "Beauty & Personal Care",
  "Business Services",
  "Education",
  "Financial Services",
  "Food & Beverage",
  "Games",
  "Health",
  "Home Improvement",
  "Household Products",
  "Life Services",
  "News & Entertainment",
  "Pets",
  "Sports & Outdoor",
  "Tech & Electronics",
  "Travel",
  "Vehicle & Transportation",
] as const;

export const curatorFunctions = [
  "create-source",
  "fetch-source",
  "fetch-feeds",
  "fetch-feed-posts",
  "delete-source",
] as const;
export const curatorBaseAPIRoute = "https://api.curator.io/v1";

export const curatorAPIKey = process.env.CURATOR_API_KEY;
export const openaiApiKey = process.env.OPENAI_API_KEY;
