import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ THIS WAS MISSING

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      navigate("/"); // ✅ now works
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <form onSubmit={login} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded-lg hover:bg-black/90"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
