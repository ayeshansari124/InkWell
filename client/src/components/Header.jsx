import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Plus, Search } from "lucide-react";

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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* LEFT */}
        <Link to="/" className="p-2 rounded-lg hover:bg-gray-100">
          <Home size={20} />
        </Link>

        {/* CENTER */}
        <div className="relative flex-1 mx-2 sm:mx-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) navigate(`/search?q=${query}`);
            }}
            className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 focus-within:ring-1 focus-within:ring-black/20"
          >
            <Search size={16} className="text-gray-500" />
            <input
              value={query}
              onChange={handleInput}
              placeholder="Search authors"
              className="w-full bg-transparent outline-none text-sm"
            />
          </form>

          {results.length > 0 && (
            <div className="absolute top-12 w-full bg-white border rounded-lg shadow-lg">
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

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Link to="/login" className="px-3 py-1.5 border rounded-lg text-sm">
                Login
              </Link>
              <Link to="/register" className="px-3 py-1.5 bg-black text-white rounded-lg text-sm">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/create" className="hidden sm:inline-flex p-2 hover:bg-gray-100 rounded-lg">
                <Plus size={20} />
              </Link>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 border rounded-lg text-sm"
              >
                Logout
              </button>

              <Link
                to={`/author/${user._id}`}
                className="w-9 h-9 rounded-full overflow-hidden border"
              >
                <img
                  src={
                    user.avatar
                      ? `${import.meta.env.VITE_API_URL}/${user.avatar}`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
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
