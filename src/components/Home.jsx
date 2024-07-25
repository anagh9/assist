import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { FaClipboardList, FaUserCircle, FaCopy } from "react-icons/fa";
import Chat from "./Chat";
import { tokens } from "../features/tokenSlice";
import { getPlans } from "../features/getPlanSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const { data } = useSelector((state) => state.tokens);
  const { error: errorForPlans } = useSelector((state) => state.getPlans);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlePlans = () => {
    dispatch(getPlans());
    if (!errorForPlans) {
      navigate("/plans");
    }
  };

  useEffect(() => {
    dispatch(tokens());
  }, [dispatch]);

  const copyToken = (token) => {
    navigator.clipboard.writeText(token).then(
      () => alert("Token copied to clipboard!"),
      (err) => alert("Failed to copy token:", err)
    );
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="flex-grow flex flex-col">
        <header className="flex justify-end p-4 bg-gray-800 text-white">
          <div className="pr-8">
            <button
              className="flex items-center bg-yellow-400 text-gray-800 font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              onClick={handlePlans}
            >
              <FaClipboardList className="mr-2" />
              Plans
            </button>
          </div>
          {data?.theaissist && (
            <div className="pr-8 flex items-center space-x-2">
              <div className="bg-gray-700 text-white font-medium px-4 py-2 rounded-lg shadow-md flex items-center">
                <span>
                  {data?.theaissist ? `Token - ${data?.theaissist}` : ""}
                </span>
                {data?.theaissist && (
                  <button
                    className="ml-2 bg-blue-500 text-white p-1 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={() => copyToken(data?.theaissist)}
                    aria-label="Copy token"
                  >
                    <FaCopy />
                  </button>
                )}
              </div>
            </div>
          )}
          <FaUserCircle className="h-8 w-8" />
        </header>
        <main className="flex-grow p-4">
          <div className="overflow-y-auto">
            <Chat />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
