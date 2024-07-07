import React, { useState, useEffect, useRef } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { fetchData } from '../features/logSlice';
import { setLogActive } from '../features/logSetActiveSlice';
import { viewResearch } from '../features/viewResearchSlice';
import { viewAnalysis } from '../features/viewAnalysisSlice';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogNewResearch } from '../features/logNewResearchSlice';

import { setNamePathSlice } from '../features/namePathSlice';
import { logDelete } from '../features/logDeleteSlice';

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('authToken');

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [researchTitle, setResearchTitle] = useState('');
  const [editingLog, setEditingLog] = useState(null);
  const [newLogName, setNewLogName] = useState('');

  const [deleteLog, setDeleteLog] = useState('')

  const { loading, data: logResponse } = useSelector((state) => state.logs) || {};

  const isQuestion = useSelector(state => state.isQuestion);

  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch, token, isQuestion]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSelectedItem(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(selectedItem === item ? null : item);
  };

  const handleSetAsActive = (path, active) => {
    dispatch(setLogActive({ path, active }));
    setSelectedItem(null); 
  };

  const handleViewResearch = (name, path) => {
    dispatch(setNamePathSlice({name, path}))
    dispatch(viewResearch({ viewResearchPath: path }));
    navigate('/viewResearch');
  };

  const handleViewAnalysis = (path) => {
    dispatch(viewAnalysis({ viewAnalysisPath: path }));
    navigate('/viewAnalysis');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleNewResearch = (event) => {
    event.preventDefault();
    dispatch(setLogNewResearch(researchTitle));
    setIsModalOpen(false);
    setResearchTitle('');
  };

  const handleEditClick = (log) => {
    setEditingLog(log.path);
    setNewLogName(log.name);
  };

  const handleEditChange = (event) => {
    setNewLogName(event.target.value);
  };

  const handleDeleteLog = (log) => {
    openDeleteModal()
    setDeleteLog(log)
  };

  const handleDeletedLog = (event) => {
    event.preventDefault();
    dispatch(logDelete(deleteLog.path))
    closeDeleteModal()
  };

  const handleEditSubmit = (log) => {
    dispatch(setLogActive({ name: newLogName, path: log.path }));
    setEditingLog(null);
  };

  const uniqueNames = new Set();

  return (
    <div className="relative h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold text-center">ALICE</div>
      <nav className="flex-grow overflow-y-auto" style={{ height: 'calc(75vh)' }}>
        <ul className="space-y-2 p-4">
          <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600" key={'newResearch'} onClick={openModal}>
            <button className="block">{'New Research'}</button>
          </li>
          {loading ? (
            <div className="spinner" />
          ) : (
            (logResponse || [])
              .filter((log) => !log.name.toLowerCase().includes('summary'))
              .filter((log) => {
                if (uniqueNames.has(log.name)) {
                  return false;
                }
                uniqueNames.add(log.name);
                return true;
              })
              .map((log) => (
                <li className={`px-4 py-2 ${log.active ? 'bg-green-600 hover:bg-green-500' : 'bg-gray-700 hover:bg-gray-600'} rounded-lg flex flex-col relative`} key={log.path}>
                  <div className="flex items-center justify-between">
                    {editingLog === log.path ? (
                      <div className="block flex-1 text-left relative">
                        <input
                          type="text"
                          value={newLogName}
                          onChange={handleEditChange}
                          className="flex-1 bg-gray-600 text-white px-2 py-1 rounded-lg mr-2"
                        />
                        <FaCheck
                          onClick={() => handleEditSubmit(log)}
                          className="text-green-500 cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2"
                        />
                      </div>
                    ) : (
                      <button className="block flex-1 text-left" onClick={() => handleItemClick(log.name)}>
                        {log.name}
                      </button>
                    )}
                    {editingLog !== log.path &&
                    <>
                      <FiEdit2 onClick={() => handleEditClick(log)} className="ml-2 cursor-pointer" />
                      <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteLog(log)} className="ml-2 cursor-pointer" />
                    </>
                    }
                  </div>
                  {selectedItem === log.name && (
                    <div className="absolute left-0 right-0 mt-8 bg-blue-200 text-gray-800 rounded-lg shadow-lg z-10" ref={dropdownRef}>
                      <ul className="space-y-2 p-4">
                        <li className="px-4 py-2 bg-blue-300 rounded-lg hover:bg-blue-400">
                          {
                            log.active && isQuestion ? 
                            <button className="block" onClick={() => handleSetAsActive(log.path, false)}><AiOutlineHeart className='inline-block mr-1'/>Set as DeActive</button> :
                            <button className="block" onClick={() => handleSetAsActive(log.path, true)}><AiFillHeart className='inline-block mr-1'/>Set as Active</button>
                          }
                        </li>
                        <li className="px-4 py-2 bg-blue-300 rounded-lg hover:bg-blue-400">
                          <button className="block" onClick={() => handleViewResearch(log.name, log.path)}>View Research</button>
                        </li>
                        <li className="px-4 py-2 bg-blue-300 rounded-lg hover:bg-blue-400">
                          <button className="block" onClick={() => handleViewAnalysis(log.path)}>View Analysis</button>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              ))
          )}
        </ul>
      </nav>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg text-black w-96">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2 className="text-2xl font-bold mb-4">New Research</h2>
            <form onSubmit={handleNewResearch}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="researchTitle">
                  Research Title
                </label>
                <input
                  type="text"
                  id="researchTitle"
                  name="researchTitle"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter title"
                  value={researchTitle}
                  onChange={(event) => setResearchTitle(event.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg text-black w-96">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeDeleteModal}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3 className="text-2xl font-bold mb-4">Confirm Deletion</h3>
            <form onSubmit={handleDeletedLog}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chatTitle">
                  Are you sure you want to delete {deleteLog.name}
                </label>
              </div>
              <div className="flex justify-center">
                <button type="submit" className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
