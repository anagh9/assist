import React, { useState, useEffect } from 'react';
import { fetchLogs } from '../apiCalls';
import axios from 'axios';
import { fetchLogsApi } from '../Api';

const Navbar = ({setViewResearch}) => {

  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ilc5QnNWbDZWM1NlSm9QN3kwel9MUCJ9.eyJpc3MiOiJodHRwczovL2Fpc3Npc3QudWsuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY1MTU5ODIyZjI3Y2EyY2ZiMzc5MGVhNSIsImF1ZCI6WyJhcGkuYWlzc2lzdC5jb20iLCJodHRwczovL2Fpc3Npc3QudWsuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcxNzQ5NzIzNSwiZXhwIjoxNzE3NTgzNjM1LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiRkNXZ2dmV3h2cjdCdDRnM2pEZloyYkFYN3N2U3FUN1MiLCJwZXJtaXNzaW9ucyI6W119.BfHGHf3xDJnKue9dKZyqNjleEjMxIfpHFHXbFjMMjWA8H6VU3RuawO_0yF9SG-iYwauVbSt08gtXxym5oFE2cTNEP7tiTfzEDJ-hhoEmt_W3eFrHiwcjhHFAEmqwZJH7Kutj9eO9GpoUJ7XWhS7ZmQleUhlx0qblV2Cg8-vCJfOqgjFdWfar-vuoLiEu92G2oEgW28omDc2dF4y2fy6JLZ26blRMscd29FcymYwOEFxN68qq-2dc5WN0ZjhJzpWjXzlS7JWJDPtt7XdVZtI6mWvMV6yjeKYekaH9osc06hpeEZVH_RURU32ih1A7emh8hX5hW92QtB8TeBNmWYdfyg'

  const [selectedItem, setSelectedItem] = useState(null);

  const [logResponse, setLogResponse] = useState([])
  useEffect(() => {


   


    const fetchLogs = async () => {

      // try {
      //   axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

      //   const response = await axios.get(fetchLogsApi, {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       'Content-Type': 'application/json',
      //       'Access-Control-Allow-Origin': '*'
      //     }
      //   });
      //   return response
      // } catch (error) {
      //   console.error('Error fetching data:', error);
      // }

    };
      const response = [
        {
            "active": false,
            "name": "South America Lithium",
            "path": "56b2f61c.txt"
        },
        {
            "active": false,
            "name": "Boeing vs Airbus",
            "path": "546a1dea.txt"
        },
        {
            "active": false,
            "name": "Apple AI",
            "path": "a5e45ed4.txt"
        },
        {
            "active": false,
            "name": "Real Estate London ",
            "path": "45cd2318.txt"
        },
        {
            "active": false,
            "name": "space mining",
            "path": "2bc4508c.txt"
        },
        {
            "active": false,
            "name": "Aviation",
            "path": "8cbb33bd.txt"
        },
        {
            "active": false,
            "name": "crypto mining",
            "path": "5e14c481.txt"
        },
        {
            "active": false,
            "name": "iipr ",
            "path": "ae4ba342.txt"
        },
        {
            "active": false,
            "name": "Netflix ",
            "path": "0df37dc8.txt"
        },
        {
            "active": false,
            "name": "Netflix ",
            "path": "f0a23984.txt"
        },
        {
            "active": false,
            "name": "Tesla",
            "path": "d1981066.txt"
        },
        {
            "active": false,
            "name": "space tourism ",
            "path": "ed4394d0.txt"
        },
        {
            "active": false,
            "name": "Apple stock",
            "path": "5ee3d558.txt"
        },
        {
            "active": false,
            "name": "Lockheed martin",
            "path": "c48a51f2.txt"
        },
        {
            "active": false,
            "name": "Africa renewables",
            "path": "bae9f488.txt"
        },
        {
            "active": false,
            "name": "Boeing ratios",
            "path": "cbc46d66.txt"
        },
        {
            "active": false,
            "name": "Tesla financials",
            "path": "e83d8cbe.txt"
        },
        {
            "active": false,
            "name": "Summary - Tesla financials",
            "path": "summary_e83d8cbe.txt"
        },
        {
            "active": false,
            "name": "Interest rate changes",
            "path": "2f35b628.txt"
        },
        {
            "active": false,
            "name": "Media UK",
            "path": "fd8fc122.txt"
        },
        {
            "active": false,
            "name": "Summary - Summary - Tesla financials",
            "path": "summary_summary_e83d8cbe.txt"
        },
        {
            "active": false,
            "name": "Summary - Summary - Tesla financials",
            "path": "summary_summary_e83d8cbe.txt"
        },
        {
            "active": false,
            "name": "Summary - Summary - Tesla financials",
            "path": "summary_summary_e83d8cbe.txt"
        },
        {
            "active": false,
            "name": "Summary - Summary - Tesla financials",
            "path": "summary_summary_e83d8cbe.txt"
        },
        {
            "active": true,
            "name": "Curry’s plc",
            "path": "599aa4d8.txt"
        },
        {
            "active": false,
            "name": "Summary - Curry’s plc",
            "path": "summary_599aa4d8.txt"
        }
    ]

    setLogResponse(response)
    
    console.log(response)
    return () => {
      // Cancel Axios request (if using axios cancel tokens)
    };
  }, []); 

  const handleItemClick = (item) => {
    setSelectedItem(selectedItem === item ? null : item);
  };

  const handleSetAsActive=(path)=>{
    //Set as Active
  }

  return (
    <div className="relative h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold text-center">ASSIST</div>
      <nav className="flex-grow overflow-y-auto">
      <ul className="space-y-2 p-4">
        {(logResponse || []).filter(log => !log.name.toLowerCase().includes('summary')).map(log => (
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
                    <button className="block" onClick={()=>setViewResearch(log.path)}>View Research</button>
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
