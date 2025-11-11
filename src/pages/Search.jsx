import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "../utils/api";

function Search() {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");


  const { data: articles, isLoading, isError } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => fetchNews(searchTerm),
    enabled: !!searchTerm,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    setSearchTerm(query.trim());
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Search News Articles
      </h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex mb-8">
        <input
          type="text"
          placeholder="Search for topics like AI, robots, business..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Loading */}
      {isLoading && (
        <p className="text-center text-gray-500 mt-6">Fetching news...</p>
      )}

      {/* Error */}
      {isError && (
        <p className="text-center text-red-500 mt-6">
          Error fetching news. Please try again.
        </p>
      )}

      {/* Results */}
      {articles?.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={
                  article.image ||
                  "https://picsum.photos/400/200?random=1"
                }
                alt={article.title}
                className="w-full h-44 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://picsum.photos/400/200?random=2";
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-3 mb-3">
                  {article.description}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm font-medium"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {searchTerm && !isLoading && articles?.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No articles found for "{searchTerm}".
        </p>
      )}
    </div>
  );
}

export default Search;
