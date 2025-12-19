import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      console.error("Registration failed");
      return;
    }

    navigate("/");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2">
            Create your account
          </h1>
          <p className="text-sm text-gray-500">
            Join the community and start publishing
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full
                border border-gray-300
                rounded-lg
                px-4 py-2.5
                text-sm
                focus:outline-none
                focus:ring-1 focus:ring-black
              "
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                border border-gray-300
                rounded-lg
                px-4 py-2.5
                text-sm
                focus:outline-none
                focus:ring-1 focus:ring-black
              "
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                border border-gray-300
                rounded-lg
                px-4 py-2.5
                text-sm
                focus:outline-none
                focus:ring-1 focus:ring-black
              "
              required
            />
          </div>

          <button
            type="submit"
            className="
              w-full
              bg-black text-white
              py-2.5
              rounded-lg
              font-medium
              hover:bg-black/90
              transition
            "
          >
            Create Account
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-black font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
