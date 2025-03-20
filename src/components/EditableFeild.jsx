/* eslint-disable no-unused-vars */
import { useState } from "react";
import {  FaSave } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

const EditableField = ({ label, value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    onSave(inputValue);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-5 m-5 pl-2 w-[700px] ">
      {isEditing ? (
        <input
          className="shadow-sm text-sm font-medium text-gray-700 border-2 outline-none content-center pl-5 border-gray-700 w-full h-10 rounded-[10px]"
          type="text"
          value={inputValue}
          autoFocus
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <span className= "shadow-sm text-sm font-medium text-gray-700 border-2 outline-none content-center pl-5 border-gray-300 w-full h-10 rounded-[10px]">
          {inputValue}
        </span>
      )}
      <button
        className="p-2 border-2 shadow-sm bg-white border-gray-300 rounded-[5px] cursor-pointer"
        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
      >
        {isEditing ? <FaSave /> : <FaPencil />}
      </button>
    </div>
  );
};

export default EditableField;
