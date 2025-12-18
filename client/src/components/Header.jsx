import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Plus, Search } from "lucide-react";

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${query}`);
  };

  if (loading) return null;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4 flex-1">
          {/* HOME */}
          <Link to="/" className="text-gray-800 hover:text-black">
            <Home size={22} />
          </Link>

          {/* SEARCH */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex items-center w-full max-w-sm 
                       border border-gray-300 rounded-full px-4 py-1.5
                       focus-within:border-black transition"
          >
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search authors"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="ml-2 w-full text-sm bg-transparent outline-none placeholder-gray-400"
            />
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login" className="text-sm text-gray-700 hover:text-black">
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm bg-black text-white px-4 py-1.5 rounded-full"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/create"
                className="p-2 rounded-full hover:bg-gray-100"
                title="Create Post"
              >
                <Plus size={20} />
              </Link>

              <button
                onClick={logout}
                className="text-sm text-gray-600 hover:text-black"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
