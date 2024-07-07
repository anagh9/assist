import React, { useState, useRef, useEffect } from 'react';
import { FaPause, FaChevronLeft, FaFileAlt, FaEdit, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { kill } from '../features/killSlice';
import { summary } from '../features/summarySlice';
import { viewResearch } from '../features/viewResearchSlice';
import { logEdit } from '../features/logEditSlice';



const ViewResearch = () => {
  const { loading, data: viewResearchResponse } = useSelector(state => state.viewResearch) || {};
  const dispatch = useDispatch();

  const [aliceBusy, setAliceBusy] = useState(false);
  const [killDone, setKillDone] = useState(false);
  const [summaryDone, setSummaryDone] = useState(false);
  const [researchText, setResearchText] = useState('');
  const [editable, setEditable] = useState(false);
  const textContainerRef = useRef(null);
  const navigate = useNavigate();

  const { name = '', path = '' } = useSelector(state => state.namePath);
  const { data: viewResearchPath } = useSelector(state => state.createQuestion) || {};
  const { data: chatMessagesResponse } = useSelector(state => state.chatMessages) || {};
  const { data: questionMessagesResponse } = useSelector(state => state.questionMessages) || {};
  const isQuestion = useSelector(state => state.isQuestion);

  useEffect(() => {
    setAliceBusy(isQuestion ? questionMessagesResponse?.status?.busy : chatMessagesResponse?.status?.busy);
  }, [questionMessagesResponse?.status?.busy, chatMessagesResponse?.status?.busy]);

  useEffect(() => {
    setResearchText(viewResearchResponse);
  }, [viewResearchResponse]);

  const handleKill = () => {
    dispatch(kill());
    setKillDone(true);
  };

  const handleScrollLeft = () => {
    navigate('/home');
  };

  const handleSummarize = () => {
    dispatch(summary({ name, path }));
    setSummaryDone(true);
    const researchPath = viewResearchPath || path;
    dispatch(viewResearch({ viewResearchPath: researchPath }));
  };

  const toggleEdit = () => {
    setEditable(!editable);
    if(editable){
      dispatch(logEdit({path: viewResearchPath || path, content:researchText}))
    }
  };

  const handleTextChange = (e) => {
    setResearchText(e.target.value);
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
        <button
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${editable ? 'hover:bg-blue-600' : 'hover:bg-blue-700'}`}
        onClick={toggleEdit}
      >
        {editable ? 
        (
          <>
            <FaSave className="inline-block mr-1"/> Save
          </>
        ):
        (
          <>
            <FaEdit className="inline-block mr-1"/> Edit
          </>
        )}
      </button>
      </div>
      <div>
      </div>
      <div
        className="w-full max-w-4xl border border-gray-300 p-4 mb-4 overflow-x-auto"
        style={{ maxHeight: '600px' }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : editable ? (
          <textarea
            ref={textContainerRef}
            className="whitespace-pre-line text-lg outline-none w-full h-full"
            style={{ height: '600px' }}
            value={researchText}
            onChange={handleTextChange}
          />
        ) : (
          <p ref={textContainerRef} className="whitespace-pre-line text-lg">
            {researchText}
          </p>
        )}
      </div>
      <div className="flex justify-between w-full max-w-4xl">
        <button
          className={`${
            (killDone || !aliceBusy) ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
          } text-white font-bold py-2 px-4 rounded flex items-center`}
          onClick={handleKill}
        >
          <FaPause className="mr-2" />
          Kill
        </button>
        <button
          className={`${
            (summaryDone || aliceBusy) ? 'bg-gray-200 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'
          } text-white font-bold py-2 px-4 rounded flex items-center`}
          onClick={handleSummarize}
        >
          <FaFileAlt className="mr-2" />
          Produce Report
        </button>
      </div>
     
    </div>
  );
};

export default ViewResearch;
