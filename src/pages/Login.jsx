import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhone = (value) => /^\d{10}$/.test(value);

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setInput(value);

    if (isEmail(value)) {
      setEmail(value);
      setPhoneNo("");
    } else if (isPhone(value)) {
      setPhoneNo(value);
      setEmail("");
    } else {
      setEmail("");
      setPhoneNo("");
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!email && !phoneNo) {
      newErrors.input = "Enter a valid email or phone number";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Logging in with:", email || phoneNo, password, rememberMe);
      // Add your login API logic here
    }
  };

  return (
    <div className="flex items-center justify-center ml-auto mr-auto w-[400px] min-h-screen bg-gray-100 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">XeroxGuard Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="relative">
              <span className="absolute left-3 top-4 text-gray-500">
                <FaUser />
              </span>
              <input
                className={`w-full text-gray-800 h-12 border rounded-xl pl-10 pr-4 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition ${
                  errors.input ? "border-red-500" : ""
                }`}
                value={input}
                placeholder="Phone No or Email"
                onChange={handleInputChange}
              />
            </div>
            {errors.input && (
              <p className="text-red-500 text-sm mt-1">{errors.input}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <span className="absolute left-3 top-4 text-gray-500">
                <FaLock />
              </span>
              <input
                type="password"
                value={password}
                className={`w-full text-gray-800 h-12 border rounded-xl pl-10 pr-4 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-gray-800 rounded focus:ring-gray-500"
              />
              <span className="text-gray-700">Remember Me</span>
            </label>

            <a
              href="/password/reset"
              className="text-gray-700 hover:text-gray-900 transition duration-300"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-gray-800 rounded-xl text-white font-medium hover:bg-gray-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center">
          <span className="text-gray-700">Don't have an account? </span>
          <a
            href="/signup"
            className="text-gray-800 font-medium hover:text-gray-900 transition duration-300"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
