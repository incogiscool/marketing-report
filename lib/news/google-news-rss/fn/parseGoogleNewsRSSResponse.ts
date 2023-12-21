import Parser from "rss-parser";

export const parseGoogleNewsRSSResponse = async (response: string) => {
  const parser = new Parser();

  const feed = await parser.parseString(response);
  const articles = feed.items;

  const obj = articles.map((article) => {
    return {
      title: article.title,
      articleLink: article.link,
      guid: article.guid,
      publishedDate: article.pubDate,
    };
  });

  return obj;
};
