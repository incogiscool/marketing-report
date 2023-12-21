import { googleNewsRSSBaseRoute } from "../../../constants";

export const getGoogleNewsRoute = (query: string) => {
  return `${googleNewsRSSBaseRoute}?q=${query}`;
};
