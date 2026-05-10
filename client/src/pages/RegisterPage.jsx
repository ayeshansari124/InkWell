import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { UserContext } from "../context/UserContext";

import { registerUser } from "../services/auth.service";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const user = await registerUser({
      name,
      email,
      password,
    });

    if (user) {
      setUser(user);

      navigate("/");
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-[#0f172a]">
              Create Account
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              Join the community and start sharing your stories
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black focus:bg-white transition"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black focus:bg-white transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black focus:bg-white transition"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-2xl text-sm font-semibold hover:bg-gray-800 transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;