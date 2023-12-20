import axios from "axios";
import { getCuratorAPIRoute } from "../utils/getCuratorAPIRoute";
import { CuratorDeleteSourceResponse } from "../../types";

export const deleteSource = async (sourceId: string) => {
  const { method, route } = getCuratorAPIRoute("delete-source", {
    method: "DELETE",
    path: `/sources/${sourceId}`,
  });

  const res = await axios.request<CuratorDeleteSourceResponse>({
    method,
    url: route,
  });

  return res.data;
};
