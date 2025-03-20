import React from "react";

const ToggleSwitch = ({ isOn, onToggle }) => {
  return (
    <label className="relative flex items-center cursor-pointer">
      {/* Hidden Checkbox */}
      <input type="checkbox" className="sr-only" checked={isOn} onChange={onToggle} />

      {/* Switch Container */}
      <div
        className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition-all duration-300 ${
          isOn ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {/* Toggle Knob */}
        <div
          className="w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300"
          style={{ transform: isOn ? "translateX(18px)" : "translateX(0)" }}
        ></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
