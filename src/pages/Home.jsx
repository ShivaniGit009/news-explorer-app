import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "../utils/api";
import aiBanner from "../assets/images/ai-banner.jpg";

function Home() {
  // 👇 Fetch AI or general news for homepage
  const { data: articles, isLoading, isError } = useQuery({
    queryKey: ["news", "home"],
    queryFn: () => fetchNews("artificial intelligence"),
  });

  const trending = [
    {
      title: "AI Revolution in Tech",
      description: "Artificial intelligence is transforming industries and shaping the future.",
      image: aiBanner,
    },
  ];

  if (isLoading)
    return <p className="text-center text-gray-500 mt-8">Loading AI news...</p>;
  if (isError)
    return <p className="text-center text-red-500 mt-8">Error fetching news.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Heading */}
      {/* <h2 className="text-2xl font-bold mb-6 text-gray-900">Trending Now</h2> */}

      {/* Featured Article */}
      {trending.map((item, index) => (
        <div key={index} className="mb-10">
          <div className="relative overflow-hidden rounded-2xl shadow-sm">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-72 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
              <h3 className="text-3xl font-bold">{item.title}</h3>
              <p className="text-sm mt-2">{item.description}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Other Articles */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {articles?.map((article, index) => (
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
              <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {article.title}
              </h2>
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
    </div>
  );
}

export default Home;
