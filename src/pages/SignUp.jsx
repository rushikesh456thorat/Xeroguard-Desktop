import React, { useState } from "react";
import { FaEnvelope, FaLock, FaPhone } from "react-icons/fa";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!phoneNo) {
      newErrors.phoneNo = "Phone number is required";
    } else if (!/^\d{10}$/.test(phoneNo)) {
      newErrors.phoneNo = "Phone number must be 10 digits";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Signup successful", { email, phoneNo, password });
    }
  };

  return (
    <div className="flex items-center justify-center ml-auto mr-auto w-[400px] min-h-screen bg-gray-100 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">XeroxGuard Sign Up</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="relative">
              <span className="absolute left-3 top-4 text-gray-500">
                <FaEnvelope />
              </span>
              <input
                className={`w-full text-gray-800 h-12 border rounded-xl pl-10 pr-4 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition ${
                  errors.email ? "border-red-500" : ""
                }`}
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <div className="relative">
              <span className="absolute left-3 top-4 text-gray-500">
                <FaPhone />
              </span>
              <input
                className={`w-full text-gray-800 h-12 border rounded-xl pl-10 pr-4 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition ${
                  errors.phoneNo ? "border-red-500" : ""
                }`}
                value={phoneNo}
                placeholder="Phone No"
                onChange={(e) => setPhoneNo(e.target.value.replace(/\D/g, ""))}
              />
            </div>
            {errors.phoneNo && <p className="text-red-500 text-sm mt-1">{errors.phoneNo}</p>}
          </div>

          <div>
            <div className="relative">
              <span className="absolute left-3 top-4 text-gray-500">
                <FaLock />
              </span>
              <input
                type="password"
                className={`w-full text-gray-800 h-12 border rounded-xl pl-10 pr-4 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <div className="relative">
              <span className="absolute left-3 top-4 text-gray-500">
                <FaLock />
              </span>
              <input
                type="password"
                className={`w-full text-gray-800 h-12 border rounded-xl pl-10 pr-4 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-gray-800 rounded-xl text-white font-medium hover:bg-gray-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center">
          <span className="text-gray-700">Already have an account? </span>
          <a
            href="/login"
            className="text-gray-800 font-medium hover:text-gray-900 transition duration-300"
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
