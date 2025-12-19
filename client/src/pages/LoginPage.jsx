import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        
        {/* CARD */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            Welcome back
          </h1>
          <p className="text-gray-500 mb-6">
            Sign in to your account
          </p>

          <form onSubmit={login} className="space-y-4">
            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full
                border border-gray-300
                rounded-lg
                px-4 py-2
                focus:outline-none
                focus:ring-2 focus:ring-black/20
              "
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                w-full
                border border-gray-300
                rounded-lg
                px-4 py-2
                focus:outline-none
                focus:ring-2 focus:ring-black/20
              "
            />

            {/* ACTION */}
            <button
              type="submit"
              className="
                w-full
                bg-black text-white
                py-2
                rounded-lg
                text-sm font-medium
                hover:bg-black/90
                transition
              "
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
