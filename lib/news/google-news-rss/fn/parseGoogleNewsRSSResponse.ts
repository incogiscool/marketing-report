import Parser from "rss-parser";
import { JSDOM } from "jsdom";
import { NewsArticle } from "../../../types";

export const parseGoogleNewsRSSResponse = async (response: string) => {
  const parser = new Parser();

  const feed = await parser.parseString(response);
  const articles = feed.items;

  const obj = articles.map((article) => {
    const { content } = article;

    const doc = new JSDOM(content).window.document;
    const source = doc.querySelector("font")?.innerHTML;
    const title = doc.querySelector("a")?.innerHTML;

    return {
      title,
      articleLink: article.link,
      guid: article.guid,
      publishedDate: article.pubDate,
      source,
    } as NewsArticle;
  });

  return obj;
};
