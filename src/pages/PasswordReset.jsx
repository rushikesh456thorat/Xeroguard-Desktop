import React, { useState } from "react";

const PasswordReset = () => {
  const [step, setStep] = useState(1);
  const [phoneNo, setPhoneNo] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validatePhone = () => {
    if (!/^[0-9]{10}$/.test(phoneNo)) {
      setErrors({ phoneNo: "Enter a valid 10-digit phone number" });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateOtp = () => {
    if (!/^[0-9]{6}$/.test(otp)) {
      setErrors({ otp: "Enter a valid 6-digit OTP" });
      return false;
    }
    setErrors({});
    return true;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validatePhone()) {
      setStep(2);
    } else if (step === 2 && validateOtp()) {
      setStep(3);
    } else if (step === 3 && validatePassword()) {
      console.log("Password reset successful");
    }
  };

  return (
    <div className="flex items-center w-[400px] justify-center ml-auto mr-auto min-h-screen bg-gray-100 p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Reset Password
        </h1>
        {step === 1 && (
          <div>
            <input
              type="text"
              className="w-full text-gray-800 h-12 border rounded-xl px-4 border-gray-300 focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your phone number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
            {errors.phoneNo && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNo}</p>
            )}
            
          </div>
        )}
        {step === 2 && (
          <div>
            <input
              type="text"
              className="w-full text-gray-800 h-12 border rounded-xl px-4 border-gray-300 focus:ring-2 focus:ring-gray-500"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
            )}
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <input
              type="password"
              className="w-full text-gray-800 h-12 border rounded-xl px-4 border-gray-300 focus:ring-2 focus:ring-gray-500"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
            <input
              type="password"
              className="w-full text-gray-800 h-12 border rounded-xl px-4 border-gray-300 focus:ring-2 focus:ring-gray-500"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        )}
        <button
          className="w-full h-12 bg-gray-800 rounded-xl text-white font-medium hover:bg-gray-700"
          onClick={handleNext}
        >
          {step === 3 ? "Set Password" : "Next"}
        </button>
        <div className="flex justify-center mt-4">
              <a
                href="/login"
                className="text-gray-700 hover:text-gray-900 transition duration-300"
              >
                Back to Login
              </a>
            </div>
      </div>
    </div>
  );
};

export default PasswordReset;
