import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { kill } from '../features/killSlice'


const ViewResearch = () => {

  const { loading, data:viewResearchResponse, error } = useSelector(state => state.viewResearch) || {};

  const dispatch = useDispatch();

  const [killDone, setKillDone] = useState(false)


  console.log({viewResearchResponse})


  const [researchText, setResearchText] = useState('');

  const textContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setResearchText(viewResearchResponse)
  },[viewResearchResponse])

  const handleKill = () => {
    dispatch(kill())
    setKillDone(true)
  };

  const handleScrollLeft = () => {
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex justify-between w-full max-w-4xl mt-4">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={handleScrollLeft}
        >
          <FaChevronLeft />
        </button>
      </div>
      <div
        className="w-full max-w-4xl border border-gray-300 p-4 mb-4 overflow-x-auto"
        style={{ maxHeight: '700px' }} // Adjust the max height as needed
      >
        {loading ? (
        <p>Loading...</p>
      ) : (
        <p ref={textContainerRef} className="whitespace-pre-line text-lg">
          {researchText}
        </p>
      )}
      </div>
      <div className="flex justify-between w-full max-w-4xl">
        <button
          className={`${
            killDone ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
          } text-white font-bold py-2 px-4 rounded flex items-center`}
          onClick={handleKill}
        >
          <FaPause className="mr-2" />
          Kill
        </button>
      </div>
    </div>
  );
};

export default ViewResearch;


