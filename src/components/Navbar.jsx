import React, { useState } from 'react';

const Navbar = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(selectedItem === item ? null : item);
  };

  return (
    <div className="relative h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold text-center">ASSIST</div>
      <nav className="flex-grow">
        <ul className="space-y-2 p-4">
          <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            <a href="#home" className="block">New Research</a>
          </li>
          <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            <a href="#about" className="block">Military VS Macro</a>
          </li>
          <li
            className="relative px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
            onClick={() => handleItemClick('Tokenisation')}
          >
            <a href="#services" className="block">Tokenisation</a>
            {selectedItem === 'Tokenisation' && (
              <div className="absolute left-full top-0 ml-2 w-64 bg-gray-800 bg-opacity-75 text-white rounded-lg shadow-lg z-10">
                <ul className="space-y-2 p-4">
                  <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                    <a href="#subitem1" className="block">Set as Active</a>
                  </li>
                  <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                    <a href="#subitem2" className="block">View Research</a>
                  </li>
                  <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                    <a href="#subitem3" className="block">View Analysis</a>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            <a href="#contact" className="block">Elections VS Market</a>
          </li>
          <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            <a href="#profile" className="block">General Electric</a>
          </li>
          <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            <a href="#profile" className="block">NEOM</a>
          </li>
          <li className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            <a href="#profile" className="block">TSMC</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
