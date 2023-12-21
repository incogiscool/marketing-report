import { getGoogleNewsRoute } from "./fn/getGoogleNewsRoute";
import axios from "axios";
import { parseGoogleNewsRSSResponse } from "./fn/parseGoogleNewsRSSResponse";

export const getGoogleNewsRSSData = async (query: string) => {
  const url = getGoogleNewsRoute(query);

  const res = await axios.get<string>(url);
  const data = res.data;

  const parsed = await parseGoogleNewsRSSResponse(data);

  return parsed;
};
