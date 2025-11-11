import axios from "axios";

const API_KEY = "34e57d96c48c04abde2ba483e0fe18e2";
const BASE_URL = "https://gnews.io/api/v4/search";

export const fetchNews = async (query = "general") => {
  const response = await axios.get(BASE_URL, {
    params: {
      q: query,
      lang: "en",
      country: "us",
      max: 9,
      apikey: API_KEY,
    },
  });

  const uniqueArticles = response.data.articles.filter(
    (a, i, self) => i === self.findIndex((b) => b.title === a.title)
  );

  return uniqueArticles;
};
