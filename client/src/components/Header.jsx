import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Plus, Search } from "lucide-react";

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data?.user || null))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    navigate("/");
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    fetch(`http://localhost:4000/search?q=${value}`)
      .then((res) => res.json())
      .then((data) => setResults(data));
  };

  if (loading) return null;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* LEFT — HOME */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Home size={20} />
          </Link>
        </div>

        {/* CENTER — SEARCH */}
        <div className="relative flex-1 mx-2 sm:mx-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) navigate(`/search?q=${query}`);
            }}
            className="
              flex items-center gap-2
              bg-gray-100
              rounded-lg
              px-3 py-2
              focus-within:bg-white
              focus-within:ring-1
              focus-within:ring-black/20
              transition
            "
          >
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={handleInput}
              placeholder="Search authors"
              className="w-full bg-transparent outline-none text-sm"
            />
          </form>

          {results.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {results.map((author) => (
                <Link
                  key={author._id}
                  to={`/author/${author._id}`}
                  onClick={() => setResults([])}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {author.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — ACTIONS */}
        <div className="flex items-center gap-2">

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-3 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-black/90"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* CREATE — DESKTOP ONLY */}
              <Link
                to="/create"
                className="hidden sm:inline-flex p-2 rounded-lg hover:bg-gray-100"
                title="Create Post"
              >
                <Plus size={20} />
              </Link>

              {/* LOGOUT — ALWAYS VISIBLE (MOBILE + DESKTOP) */}
              <button
                onClick={logout}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Logout
              </button>

              {/* PROFILE ICON */}
              <Link
                to={`/author/${user._id}`}
                className="w-9 h-9 rounded-full overflow-hidden border hover:ring-2 hover:ring-black transition"
                title="My Profile"
              >
                <img
                  src={
                    user.avatar
                      ? `http://localhost:4000/${user.avatar}`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name
                        )}&background=000000&color=ffffff`
                  }
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </Link>
            </>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;
