import axios from "axios";
import { getCuratorAPIRoute } from "../../utils/getCuratorAPIRoute";
import { CuratorInstagramHashtagSourceResponse } from "../../../types";

// Parameter should not include the actual '#' character
export const createInstagramHashtagSource = async (
  feedId: string,
  hashtag: string
) => {
  const requestBody = {
    feed_id: feedId,
    tag: hashtag,
    // Check Curator.io API docs for source types - 38 = instagram tag
    source_type: 38,
  };

  const { method, route } = getCuratorAPIRoute("create-source");

  const res = await axios.request<CuratorInstagramHashtagSourceResponse>({
    method,
    url: route,
    data: requestBody,
  });

  return res.data;
};
