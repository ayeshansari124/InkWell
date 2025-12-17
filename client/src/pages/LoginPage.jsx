import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await res.json();

      if(res.ok){
        setRedirect(true);
      }
      else{
        alert(data.error || 'Login failed');
        return;
      }

      alert(data.message); // "Login successful"
    } catch (err) {
      console.error(err);
      alert('Server not responding');
    }
  };
  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md border border-gray-200 rounded-xl p-8 shadow-sm">       
        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-6">
          Login to your account
        </p>
        <form className="space-y-4" onSubmit={login}>
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-6 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="font-medium text-black underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
