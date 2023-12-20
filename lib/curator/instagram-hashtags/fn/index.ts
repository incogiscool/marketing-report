import { createInstagramHashtagSource } from "./createInstagramHashtagSource";
import { getFeeds } from "../../general/getFeeds";
import { getFeedPosts } from "../../general/getFeedPosts";
import { deleteSource } from "../../general/deleteSource";

export const getInstagramHashtagPosts = async (hashtag: string) => {
  const feeds = await getFeeds();
  const feedId = feeds[0].id;
  const sourceRes = await createInstagramHashtagSource(feedId, hashtag);
  const posts = await getFeedPosts(feedId);

  const deleteRes = await deleteSource(sourceRes.id);

  if (!deleteRes.success) throw new Error(deleteRes.message);

  return posts;
};
