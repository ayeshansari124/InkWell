import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Home, Plus, Search, LogOut } from "lucide-react";

import { UserContext } from "../context/UserContext";

import { logoutUser } from "../services/auth.service";
import { searchAuthors } from "../services/author.service";

const Header = () => {
  const { user, loading, setUser } = useContext(UserContext);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/");
  };

  const handleInput = async (e) => {
    const value = e.target.value;

    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const data = await searchAuthors(value);

    setResults(data);
  };

  if (loading) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition"
          >
            <Home size={20} />
          </Link>
        </div>

        <div className="relative flex-1 max-w-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (query.trim()) {
                navigate(`/search?q=${query}`);
                setResults([]);
              }
            }}
            className="flex items-center gap-2 bg-gray-100 border border-transparent focus-within:border-gray-300 rounded-2xl px-4 py-2.5 transition"
          >
            <Search size={18} className="text-gray-500" />

            <input
              value={query}
              onChange={handleInput}
              placeholder="Search authors..."
              className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
            />
          </form>

          {results.length > 0 && (
            <div className="absolute top-14 left-0 w-full bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
              {results.map((author) => (
                <Link
                  key={author._id}
                  to={`/author/${author._id}`}
                  onClick={() => setResults([])}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={
                        author.avatar
                          ? `${import.meta.env.VITE_API_URL}/${author.avatar}`
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}`
                      }
                      alt={author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {author.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium rounded-xl hover:bg-gray-100 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/create"
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition shrink-0"
              >
                <Plus size={20} />
              </Link>

              {user?._id && (
                <Link
                  to={`/author/${user._id}`}
                  className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200 hover:ring-black transition"
                >
                  <img
                    src={
                      user?.avatar
                        ? `{user.avatar}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
                    }
                    alt={user?.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-red-50 transition"
              >
                <LogOut size={18} className="text-red-500" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
