import { CuratorFeed } from "../../types";
import { getCuratorAPIRoute } from "../utils/getCuratorAPIRoute";
import axios from "axios";

export const getFeeds = async () => {
  const { method, route } = getCuratorAPIRoute("fetch-feeds");

  const res = await axios.request<CuratorFeed[]>({
    method,
    url: route,
  });

  return res.data;
};
