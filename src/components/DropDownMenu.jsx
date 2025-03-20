import React, { useState } from 'react';

const DropdownMenu = () => {
  const [selectedOption, setSelectedOption] = useState('Off');
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the menu after selection
  };

  const options = ['Off', '15 minutes', '30 minutes', '1 hour', '24 hours'];

  return (
    <div className="relative inline-block text-left items-center  gap-5 m-5 pl-2 ">
      <button
        onClick={toggleMenu}
        className="inline-flex justify-between border-2 items-center px-4 py-2 text-sm font-medium text-gray-700 bg-transparent  border-gray-300 rounded-md shadow-sm w-48 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        {selectedOption}
        <svg
          className="ml-2 -mr-1 h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06 0L10 10.14l3.71-2.93a.75.75 0 111.01 1.11l-4.25 3.31a.75.75 0 01-1.02 0L5.23 8.32a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div className="py-1">
            {options.map((option) => (
              <a
                key={option}
                onClick={() => handleSelect(option)}
                className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
