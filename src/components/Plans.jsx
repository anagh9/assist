import React from "react";
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

  const { data: result } = useSelector((state) => state.getPlans);

  const extractSteps = (input) => {
    const stepsArray = (input || []).map((step) => step.trim());

    return stepsArray.map((step) => step.replace(/^Step \d+:\s*/, ""));
  };

  const handleSubmit = () => {
    dispatch(postPlans({ result }));
    navigate("/home");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-end p-4 bg-gray-800 text-white">
        <div className="pr-8">
          <button
            className="flex items-center bg-yellow-400 text-gray-800 font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            onClick={handleHome}
          >
            <FaHome className="mr-2" />
            Home
          </button>
        </div>
        <FaUserCircle className="h-8 w-8" />
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
          />
        ))}
      </main>
      <footer className="bg-gray-200 p-4">
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Submit
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Plans;
