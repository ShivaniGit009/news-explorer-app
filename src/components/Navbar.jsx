import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, X, Menu } from "lucide-react";
import { fetchNews } from "../utils/api";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Technology", path: "/category/technology" },
    { name: "Business", path: "/category/business" },
    { name: "Health", path: "/category/health" },
  ];

  // Search code
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const data = await fetchNews(query);
      setResults(data);
    } catch (err) {
      setError("Failed to fetch news. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };


  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setError("");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">

        <Link to="/" className="text-2xl font-bold text-gray-900">
          News Explorer
        </Link>

        {/* Desktop nav links (hidden on small screens) */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-1 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop search (hidden on small screens) */}
        <div className="relative w-64 hidden md:block">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search news..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10 py-2 w-full rounded-full bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-500"
              size={18}
            />
            {query && (
              <X
                className="absolute right-3 top-2.5 text-gray-400 cursor-pointer hover:text-gray-600"
                size={18}
                onClick={clearSearch}
              />
            )}
          </form>

          {/* Desktop dropdown results (absolute) */}
          {/* absolute span left-0 right-0 so it fits within container on small but on md it will be right aligned */}
          {query && results.length > 0 && (
            <div className="absolute left-0 right-0 md:right-0 md:w-96 mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              {results.map((article, i) => (
                <a
                  key={i}
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 transition"
                >
                  <img
                    src={
                      article.image ||
                      "https://via.placeholder.com/60x60?text=No+Image"
                    }
                    alt={article.title}
                    className="w-14 h-14 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {article.source?.name || "Unknown Source"}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Loading or error states (desktop) */}
          {loading && (
            <div className="absolute left-0 right-0 md:right-0 md:w-96 mt-2 bg-white border rounded-lg shadow-lg z-50 p-3 text-sm text-gray-500">
              Searching...
            </div>
          )}
          {error && (
            <div className="absolute left-0 right-0 md:right-0 md:w-96 mt-2 bg-white border rounded-lg shadow-lg z-50 p-3 text-sm text-red-500">
              {error}
            </div>
          )}
        </div>

        {/* Mobile menu button (visible on small screens) */}
        <button
          className="md:hidden text-gray-700 hover:text-blue-600 p-2 rounded-md"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile panel (links + search) */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4">
          <div className="flex flex-col space-y-3">
            {/* Nav items vertical */}
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* Mobile search form */}
            <form onSubmit={(e) => { setMobileOpen(true); handleSearch(e); }} className="mt-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search news..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-grow px-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Mobile results (render in-flow, not absolute) */}
            <div>
              {loading && (
                <p className="text-center text-gray-500 mt-3">Searching...</p>
              )}
              {error && (
                <p className="text-center text-red-500 mt-3">{error}</p>
              )}
              {!loading && results.length > 0 && (
                <div className="mt-3 space-y-3">
                  {results.map((article, i) => (
                    <a
                      key={i}
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md"
                    >
                      <img
                        src={
                          article.image ||
                          "https://via.placeholder.com/60x60?text=No+Image"
                        }
                        alt={article.title}
                        className="w-14 h-14 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {article.source?.name || "Unknown Source"}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
