import React, { useState } from "react";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AnalysisCard from "./AnalysisCard";
import { postPlans } from "../features/postPlanSlice";

const Plans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/home");
  };

  const getCurrentTimestamp = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const { data: result } = useSelector((state) => state.getPlans);

  const extractSteps = (input) => {
    const stepsArray = (input || []).map((step) => step.trim());

    return stepsArray.map((step) => step.replace(/^Step \d+:\s*/, ""));
  };

  const [updatedSteps, setUpdatedSteps] = useState([]);
  const [updatedProgress, setUpdatedProgress] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");

  const handleSubmit = () => {
    if (updatedSteps?.length && updatedProgress) {
      const updatedStepsWithStep = (updatedSteps || []).map(
        (step, index) => `Step ${index + 1}: ${step}`
      );

      dispatch(
        postPlans({
          res: {
            plan: {
              progress: `Step ${updatedProgress}`,
              steps: updatedStepsWithStep,
              title: updatedTitle,
              timestamp: getCurrentTimestamp(),
            },
          },
        })
      );
    }
    navigate("/home");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <button
          className="flex items-center bg-yellow-400 text-gray-800 font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          onClick={handleHome}
        >
          <FaHome className="mr-2" />
          Home
        </button>
        <div className="flex items-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mr-4"
          >
            Submit
          </button>
          <FaUserCircle className="h-8 w-8" />
        </div>
      </header>
      <main className="flex-grow p-8 bg-gray-100">
        {(result || []).map((item, index) => (
          <AnalysisCard
            key={index}
            title={item.title}
            news={item.news}
            steps={extractSteps(item?.steps)}
            progress={item.progress}
            timestamp={item.timestamp}
            setUpdatedSteps={setUpdatedSteps}
            setUpdatedProgress={setUpdatedProgress}
            setUpdatedTitle={setUpdatedTitle}
          />
        ))}
      </main>
    </div>
  );
};

export default Plans;
