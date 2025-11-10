import { useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Article Details (ID: {id})</h1>
      <p className="text-gray-600">
        Detailed article content will appear here.
      </p>
    </div>
  );
}
