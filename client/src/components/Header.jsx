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
      .then(res => (res.ok ? res.json() : null))
      .then(data => setUser(data?.user || null))
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
      .then(res => res.json())
      .then(data => setResults(data));
  };

  const goToProfile = () => {
    navigate(`/author/${user._id}`);
    setResults([]);
  };

  if (loading) return null;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* LEFT */}
        <div className="flex items-center gap-4 flex-1 relative">
          {/* HOME */}
          <Link to="/" className="text-gray-800 hover:text-black">
            <Home size={22} />
          </Link>

          {/* SEARCH */}
          <div className="relative hidden sm:block w-full max-w-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (query.trim()) navigate(`/search?q=${query}`);
              }}
              className="flex items-center border border-gray-300 rounded-full px-4 py-1.5 focus-within:border-black"
            >
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                value={query}
                onChange={handleInput}
                placeholder="Search authors"
                className="ml-2 w-full bg-transparent outline-none text-sm placeholder-gray-400"
              />
            </form>

            {/* LIVE RESULTS */}
            {results.length > 0 && (
              <div className="absolute top-11 left-0 w-full bg-white border rounded-xl shadow-md overflow-hidden">
                {results.map(author => (
                  <Link
                    key={author._id}
                    to={`/author/${author._id}`}
                    onClick={() => setResults([])}
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    {author.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
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
              {/* AVATAR → PROFILE */}
              <button
                onClick={goToProfile}
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
              </button>

              {/* CREATE POST */}
              <Link
                to="/create"
                className="p-2 rounded-full hover:bg-gray-100"
                title="Create Post"
              >
                <Plus size={20} />
              </Link>

              {/* LOGOUT */}
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
