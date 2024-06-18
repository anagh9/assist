import React, { useState, useEffect } from 'react';
import { fetchData } from '../features/logSlice';
import { setLogActive } from '../features/logSetActiveSlice';
import { viewResearch } from '../features/viewResearchSlice';
import { viewAnalysis } from '../features/viewAnalysisSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogNewResearch } from '../features/logNewResearchSlice';

const Navbar = () => {
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [researchTitle, setResearchTitle] = useState('')

  const { loading, data: logResponse } = useSelector(state => state.logs) || {};

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleItemClick = (item) => {
    setSelectedItem(selectedItem === item ? null : item);
  };

  const handleSetAsActive = (path) => {
    dispatch(setLogActive({ path, active: true }));
  };

  const handleViewResearch = (path) => {
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

  const handleNewResearch = (event) => {
    event.preventDefault();
    dispatch(setLogNewResearch(researchTitle))
    setIsModalOpen(false);
    setResearchTitle('');
  };

  return (
    <div className="relative h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold text-center">ASSIST</div>
      <nav className="flex-grow overflow-y-auto">
        <ul className="space-y-2 p-4">
          <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600" key={'newResearch'} onClick={openModal}>
            <button className="block">{'New Research'}</button>
          </li>
          {loading ? (
            <p>Loading...</p>
          ) : (
            (logResponse || []).filter(log => !log.name.toLowerCase().includes('summary')).map(log => (
              <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600" key={log.id} onClick={() => handleItemClick(log.name)}>
                <button className="block">{log.name}</button>
                {selectedItem === log.name && (
                  <div className="absolute left-full ml-2 w-64 bg-gray-800 bg-opacity-75 text-white rounded-lg shadow-lg z-10">
                    <ul className="space-y-2 p-4">
                      <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                        <button className="block" onClick={() => handleSetAsActive(log.path)}>Set as Active</button>
                      </li>
                      <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                        <button className="block" onClick={() => handleViewResearch(log.path)}>View Research</button>
                      </li>
                      <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
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
      </div>
  );
};

export default Navbar;
