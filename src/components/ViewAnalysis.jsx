import React, { useState } from 'react';
import { FaPause, FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { kill } from '../features/killSlice';

const ViewAnalysis = () => {
  const { loading, data: viewAnalysisResponse } = useSelector(state => state.ViewAnalysis) || {};
  console.log(viewAnalysisResponse)
  const dispatch = useDispatch();
  const [killDone, setKillDone] = useState(false);

  const sampleHtmlContent = `
  <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; }
        p { font-size: 14px; line-height: 1.6; }
      </style>
    </head>
    <body>
      <h1>Research Title</h1>
      <p>This is a sample research text. It contains some <strong>bold text</strong>, <em>italic text</em>, and a list:</p>
      <ul>
        <li>Point one</li>
        <li>Point two</li>
        <li>Point three</li>
      </ul>
      <p>And here is a link to <a href="https://www.example.com" target="_blank">example.com</a>.</p>
    </body>
  </html>
`;

  const iframeContent = sampleHtmlContent;

  const navigate = useNavigate();

  const handleKill = () => {
    dispatch(kill());
    setKillDone(true);
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
        style={{ maxHeight: '700px' }} 
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <iframe
            srcDoc={iframeContent}
            className="w-full h-full"
            style={{ border: 'none', minHeight: '600px' }}
            title="Research Content"
          />
        )}
      </div>
      <div className="flex justify-between w-full max-w-4xl">
        <button
          className={`${
            killDone ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
          } text-white font-bold py-2 px-4 rounded flex items-center`}
          onClick={handleKill}
          disabled={killDone}
        >
          <FaPause className="mr-2" />
          Kill
        </button>
      </div>
    </div>
  );
};

export default ViewAnalysis;
