import React, { useState } from "react";
import ProgressDropdown from "./ProgressDropdown";
import {
  FaChevronRight,
  FaChevronDown,
  FaCheckCircle,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

const AnalysisCard = ({ title, news, steps, progress, timestamp, 
  setUpdatedSteps, setUpdatedProgress, setUpdatedTitle }) => {
  const regex = /Step (\d+)/;

  const date = new Date(timestamp);

  const [progressStep, setProgressStep] = useState(typeof(progress) === 'string' ?
   progress.match(regex)[1]: progress);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(progressStep);
  const [currentSteps, setCurrentSteps] = useState(steps);
  const [editingStepIndex, setEditingStepIndex] = useState(null);
  const [editedStep, setEditedStep] = useState("");

  const handleMaxStepChange = (newMaxStep) => {
    setCurrentProgress(newMaxStep);
    setProgressStep(newMaxStep);
  };

  const handleStepChange = (index, newStep) => {
    const updatedSteps = [...currentSteps];
    updatedSteps[index] = newStep;
    setCurrentSteps(updatedSteps);
  };

  const handleEditClick = (index) => {
    setEditingStepIndex(index);
    setEditedStep(currentSteps[index]);
  };

  const handleSaveClick = (index) => {
    const updatedSteps = [...currentSteps];
    updatedSteps[index] = editedStep;
    setCurrentSteps(updatedSteps);
    setUpdatedSteps(updatedSteps);
    setUpdatedTitle(title);
    setEditingStepIndex(null);
  };

  const handleCancelClick = () => {
    setEditingStepIndex(null);
    setEditedStep("");
  };

  return (
    <div className="border rounded-lg shadow-lg p-4 mb-4 bg-white">
      <div className="pb-5">
        <h2 className="text-xl font-semibold mb-1 flex items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700 transition flex items-center"
          >
            {isExpanded ? (
              <FaChevronDown className="text-gray-500 mr-2 mt-4" />
            ) : (
              <FaChevronRight className="text-gray-500 mr-2 mt-4" />
            )}
            {title}
          </button>
        </h2>
        {news && <p className="text-sm text-gray-500 mt-1 pl-8">{news}</p>}
      </div>
      <div className="flex justify-between mb-4">
        <ProgressDropdown
          steps={currentSteps}
          maxStep={currentProgress}
          onMaxStepChange={handleMaxStepChange}
          onStepChange={handleStepChange}
          setUpdatedProgress={setUpdatedProgress}
        />
        <span className="text-gray-600">{date.toLocaleDateString()}</span>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {(currentSteps || []).map((step, index) => (
            <div
              key={index}
              className="flex items-start p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              {index + 1 <= Number(parseInt(progressStep, 10)) ? (
                <FaCheckCircle className="text-green-500 mr-4 mt-1" />
              ) : (
                <FaCheckCircle className="text-gray-500 mr-4 mt-1" />
              )}
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                  {`Step ${index + 1}`}
                </h4>
                {editingStepIndex === index ? (
                  <div>
                    <textarea
                      value={editedStep}
                      onChange={(e) => setEditedStep(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => handleSaveClick(index)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaSave className="inline mr-1" />
                        Save
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes className="inline mr-1" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700">{step}</p>
                )}
              </div>
              {editingStepIndex === index ? null : (
                <FaEdit
                  onClick={() => handleEditClick(index)}
                  className="ml-2 text-gray-500 cursor-pointer"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalysisCard;
