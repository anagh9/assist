import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import { FaUserCircle } from 'react-icons/fa';
import Chat from "./Chat";


const Home = () => {

  const [viewResearch, setViewResearch] = useState('')

  useEffect(()=>{

    //Call the text 

  }, [viewResearch])

  console.log({viewResearch})

    return (
        <div className="flex">
      <Navbar setViewResearch={setViewResearch}/>
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