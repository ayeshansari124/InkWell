import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Not logged in');
        return res.json();
      })
      .then(data => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
  };

  if (loading) return null;

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">My Blog</Link>

        {!user ? (
          <div className="flex gap-4 text-sm">
            <Link to="/login" className="text-gray-600 hover:text-black">
              Login
            </Link>
            <Link to="/register" className="bg-black text-white px-4 py-1 rounded">
              Register
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 text-sm items-center">
            <Link to="/create" className="font-medium text-black">
              Create New Post
            </Link>
            <button
              onClick={logout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
