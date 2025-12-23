 import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and Password are required");
      return;
    }

    setError("");
    navigate("/offers");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full h-[90vh] flex flex-col justify-center max-w-lg p-6 sm:p-8">

        <h1 className="text-2xl sm:text-[34px] font-medium text-gray-900 text-center">
          WELCOME
        </h1>
        <p className="text-sm text-[#636364] text-center mt-2">
          Welcome back! Please enter your details.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 space-y-6">

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-[#BFBFBF] rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
              className="w-full px-4 py-2 border border-[#BFBFBF] rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-sm"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-red-500" />
              Remember me
            </label>
            <button type="button" className="hover:underline">
              Forgot password
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#EA454C] text-white py-2.5 rounded-xl font-semibold hover:bg-red-600 transition"
          >
            Sign in
          </button>
        </form>
      </div>

      <p className="text-xs text-[#A5A5A5] text-center h-[10vh]">
        Terms & Conditions Apply
      </p>
    </div>
  );
};

export default Login;
