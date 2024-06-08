import React, { useState, useEffect } from 'react';
import { fetchData } from '../features/logSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(null);

  const { loading, data:logResponse, error } = useSelector(state => state.logs) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch, selectedItem]);

  const handleItemClick = (item) => {
    setSelectedItem(selectedItem === item ? null : item);
    // dispatch(setActive());
  };

  const handleSetAsActive=(path)=>{
    //Set as Active
  }

  return (
    <div className="relative h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold text-center">ASSIST</div>
      <nav className="flex-grow overflow-y-auto">
      <ul className="space-y-2 p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (logResponse || []).filter(log => !log.name.toLowerCase().includes('summary')).map(log => (
          <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600" 
            key={log.id} onClick={() => handleItemClick(log.name)}>
            <button className="block">{log.name}</button>
            {selectedItem === log.name && (
              <div className="absolute left-full ml-2 w-64 bg-gray-800 bg-opacity-75 text-white rounded-lg shadow-lg z-10">
                <ul className="space-y-2 p-4">
                  <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                    <button className="block" onClick={()=>handleSetAsActive(log.path)}>Set as Active</button>
                  </li>
                  <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                    <button className="block" onClick={()=>{ navigate('/viewResearch')}}>View Research</button>
                  </li>
                  <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                    <button className="block">View Analysis</button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
      </nav>
    </div>
  );
};

export default Navbar;


