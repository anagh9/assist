import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const ProgressDropdown = ({
  steps,
  maxStep,
  onMaxStepChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (step) => {
    onMaxStepChange(step);
    setIsOpen(false); 
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <span className="flex-1 text-left">Step {maxStep}</span>
        {isOpen ? (
          <FaCaretUp className="ml-2" />
        ) : (
          <FaCaretDown className="ml-2" />
        )}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md w-24 border border-gray-200 z-50">
          <div className="py-1">
            {(steps || []).map((_, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(index + 1)}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                  index + 1 === maxStep ? "bg-gray-200" : ""
                }`}
              >
                Step {index + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressDropdown;
