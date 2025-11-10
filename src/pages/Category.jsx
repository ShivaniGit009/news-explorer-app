import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react"; // ✅ add this
import { fetchNews } from "../utils/api";

function Category() {
  const { category } = useParams();

  const topicMap = {
    technology: "technology OR gadgets OR AI OR innovation",
    business: "business OR finance OR economy OR startups",
    health: "health OR medicine OR fitness OR wellness",
  };

  const topic = topicMap[category?.toLowerCase()] || "general";

  // ✅ React Query fetch
  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["news", category],
    queryFn: () => fetchNews(topic),
  });

  // ✅ ADD THIS BLOCK RIGHT BELOW useQuery
  const hasLogged = useRef(false);

  useEffect(() => {
    if (!hasLogged.current && articles?.length) {
      console.log("✅ API fetched once for:", category, "→ topic:", topic);
      hasLogged.current = true;
    }
  }, [articles, category, topic]);

  // Optional reset when category changes (so it logs again for new category)
  useEffect(() => {
    hasLogged.current = false;
  }, [category]);
  // ✅ END OF NEW LOGIC

  if (isLoading)
    return <p className="text-center mt-8">Loading {category} news...</p>;
  if (isError)
    return <p className="text-center text-red-500 mt-8">
      Error fetching {category} news.
    </p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold capitalize mb3">{category} News</h1>
      <p className="text-gray-600 mb-8">
        Display articles related to {category} here.
      </p>

      {articles.length === 0 ? (
        <p className="text-center text-gray-500">No articles found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img
  src={article.image ? article.image : "https://picsum.photos/400/200?random=1"}
  alt={article.title || "No image available"}
  className="w-full h-44 object-cover"
  onError={(e) => {
    e.target.onerror = null; // Prevents infinite loop
    e.target.src = "https://picsum.photos/400/200?random=2";
  }}
/>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-3 mb-3">
                  {article.description}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 text-sm"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;
