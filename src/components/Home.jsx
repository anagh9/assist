import React from "react";
import Navbar from "./Navbar";
import { FaUserCircle } from 'react-icons/fa';
import Chat from "./Chat";


const Home = () => {

    return (
        <div className="flex">
      <Navbar />
      <div className="flex-grow flex flex-col">
        <header className="flex justify-end p-4 bg-gray-800 text-white">
          <FaUserCircle className="h-8 w-8" />
        </header>
        <main className="flex-grow p-4">
          <Chat/>
        </main>
      </div>    
    </div>
    )
}

export default Home