import RSSParser from "rss-parser";

export default async function handler(req, res) {
  try {
    const parser = new RSSParser();

    const feeds = [
      "https://ec.europa.eu/newsroom/jrc/rss.cfm?type=all&language=EN&theme=0",
      "https://www.oecd.org/ai/rss.xml"
    ];

    let allNews = [];

    for (const url of feeds) {
      const feed = await parser.parseURL(url);
      const items = feed.items.map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        source: feed.title
      }));
      allNews = [...allNews, ...items];
    }

    res.status(200).json(allNews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch news" });
  }

