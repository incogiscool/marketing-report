import axios from "axios";
import { getCuratorAPIRoute } from "../utils/getCuratorAPIRoute";
import { CuratorPostResponse } from "../../types";

export const getFeedPosts = async (feedId: string) => {
  const { method, route } = getCuratorAPIRoute("fetch-feed-posts", {
    method: "GET",
    path: `/feeds/${feedId}/posts`,
  });

  const res = await axios.request<CuratorPostResponse>({
    method,
    url: route,
  });

  if (!res.data.success) throw new Error("Error occured when getting posts.");

  return res.data;
};
