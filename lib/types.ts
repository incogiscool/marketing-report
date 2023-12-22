import { ChatCompletionTool } from "openai/resources";
import { curatorFunctions, supportedIndustries } from "./constants";

export type Period = 7 | 30 | 120;
export type ResultAmount = 3 | 20;
export type Industry = (typeof supportedIndustries)[number];
export type CuratorFunctions = (typeof curatorFunctions)[number];
export type CuratorFeed = {
  id: string;
  public_key: string;
  api_id: string;
  name: string;
  type: string;
  widget_type: string;
  widget_theme: string;
  slug: string;
  moderation: string;
  post_status: number;
  widget_options: string;
  widget_styles: string;
  widget_colours: string;
  widget_advanced_styles: number;
  colour_options: null | any; // Replace 'any' with the appropriate type if you know it
  meta: { hasTiktokEmbed: boolean };
  default_image: null | string; // Replace 'string' with the appropriate type if you know it
  default_user_image: null | string; // Replace 'string' with the appropriate type if you know it
  widget_endpoint: null | string; // Replace 'string' with the appropriate type if you know it
  debug: number;
  widget_version: string;
  js_loader_version: string;
  html_before: null | string; // Replace 'string' with the appropriate type if you know it
  html_after: null | string; // Replace 'string' with the appropriate type if you know it
  cache: number;
  cache_time: number;
  default_feed_layout_id: number;
  post_count: number;
  is_installed: number;
  is_latest_version: boolean;
};

export type CuratorInstagramHashtagSourceResponse = {
  id: string;
  feed_id: string;
  source_type: {
    id: number;
    network_id: number;
    network_connection_id: number;
    name: string;
    minimum_interval: number;
    app_status: string;
    worker_status: string;
    tag_label: string;
    example_image: string;
    vuejs_component: string;
    order: number;
  };
  network_id: number;
  company_connection_id: string;
  status: string;
  tag: string;
  name: string;
  interval: number;
  first_post_date: string;
  error_count: number;
  post_count: number;
  default_user_image: string;
  post_field_overrides: null | any; // Replace 'any' with the appropriate type if you know it
  response: {
    success: boolean;
    message: string;
  };
};

export type CuratorPost = {
  id: number;
  network_id: number;
  status: number;
  flagged: number;
  has_media: number;
  source_type: number;
  source_identifier: string;
  source_created_at: string;
  post_user_id: number;
  user_screen_name: string;
  user_full_name: string;
  user_image: string;
  text: string;
  is_html: number;
  image: string;
  video: string;
  url: string;
  user_url: string;
  thumbnail: string;
  video_width: number;
  video_height: number;
  comments: number;
  views: number;
  is_repost: number;
  is_reply: number;
  is_edited: number;
  is_embed: number;
  likes: number;
  originator_user_screenname: string;
  originator_user_url: string;
  originator_post_url: string;
  pinned: number;
  pinned_at: string | null;
  longitude: string;
  latitude: string;
  location_name: string;
  image_width: number;
  image_height: number;
  image_processed: number;
  has_image: number;
  has_video: number;
  image_large: string;
  image_large_width: number;
  image_large_height: number;
  deleted_at: string | null;
  network_name: string;
  post_status: string;
  data: any[]; // Replace 'any' with the appropriate type if you know it
  images: any[]; // Replace 'any' with the appropriate type if you know it
  media: any[]; // Replace 'any' with the appropriate type if you know it
  spots: any[]; // Replace 'any' with the appropriate type if you know it
  source_id: string;
  feed_id: string;
  last_modified: string;
};

export type CuratorDeleteSourceResponse = {
  success: boolean;
  message: string;
};

export type CuratorCacheObjectType = {
  status: string;
  key: string;
  time: number;
};

export type CuratorPaginationObjectType = {
  after: string;
  before: string;
};

export type CuratorSourceObjectType = {
  name: string;
  id: number;
  network_id: number;
};

export type CuratorPostResponse = {
  cache: CuratorCacheObjectType;
  success: boolean;
  pagination: CuratorPaginationObjectType;
  networks: number[];
  sources: CuratorSourceObjectType[];
  postCount: number;
  posts: CuratorPost[];
};

export type News = {
  source: string;
  title: string;
  articleLink: string;
  guid: string;
  publishedDate: string;
};

export type OpenaiAnalyzeNewsResponse = {
  evaluated_news: EvaluatedNews[];
};

export type EvaluatedNews = {
  sentiment: number;
  summary: string;
};

export type OpenaiJSONPrompt = {
  function_id: string;
  system_message: string;
  function_object: ChatCompletionTool | null;
};
