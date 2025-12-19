import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [params] = useSearchParams();
  const query = params.get("q");
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    if (!query) return;

    fetch(`http://localhost:4000/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => setAuthors(data));
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">
          Search results
        </h1>
        <p className="text-gray-500">
          Authors matching “{query}”
        </p>
      </div>

      {/* EMPTY STATE */}
      {authors.length === 0 && (
        <p className="text-gray-500">
          No authors found.
        </p>
      )}

      {/* RESULTS */}
      <ul className="grid gap-4 sm:grid-cols-2">
        {authors.map((author) => (
          <li key={author._id}>
            <Link
              to={`/author/${author._id}`}
              className="
                group block
                border border-gray-200
                rounded-xl
                p-5
                bg-white
                transition-all duration-200
                hover:-translate-y-[2px]
                hover:shadow-md
              "
            >
              <div className="flex gap-4 items-start">
                
                {/* AVATAR */}
                <img
                  src={
                    author.avatar
                      ? `http://localhost:4000/${author.avatar}`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          author.name
                        )}&background=000000&color=ffffff`
                  }
                  alt={author.name}
                  className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                />

                {/* INFO */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold group-hover:underline">
                    {author.name}
                  </h2>

                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                    {author.bio || "No bio available."}
                  </p>

                  <div className="flex gap-4 text-xs text-gray-500 mt-2">
                    <span>
                      {author.postCount ?? 0} posts
                    </span>
                    <span>
                      {author.followerCount ?? 0} followers
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
