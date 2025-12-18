import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [params] = useSearchParams();
  const query = params.get("q");
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    if (!query) return;

    fetch(`http://localhost:4000/search?q=${query}`)
      .then(res => res.json())
      .then(data => setAuthors(data));
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Search results for “{query}”
      </h1>

      {authors.length === 0 && (
        <p className="text-gray-500">No authors found.</p>
      )}

      <ul className="space-y-4">
        {authors.map(author => (
          <li key={author._id}>
            <Link
              to={`/author/${author._id}`}
              className="
                block
                border border-gray-200 rounded-lg p-4
                transition
                hover:bg-gray-50
                hover:-translate-y-[1px]
                hover:shadow-sm
              "
            >
              <p className="text-lg font-medium">
                {author.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
