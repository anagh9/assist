import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Navbar'; // Assuming you have a Navbar component
import Chat from './Chat'; // Assuming you have a Chat component
import { FaUserCircle } from 'react-icons/fa'; // Assuming you are using react-icons for the user icon

const LoginPage = () => {
  // const navigate = useNavigate();

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return !isAuthenticated ? (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center"> 
        <h1 className="text-3xl text-blue-600 font-bold mb-6">ASSIST</h1>
        <h2 className="text-2xl font-bold mb-6">Login to Alliance Platform</h2>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={loginWithRedirect}
          >
            SignIn with Auth0
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex">
      <Navbar />
      <div className="flex-grow flex flex-col">
        <header className="flex justify-end p-4 bg-gray-800 text-white">
          <FaUserCircle className="h-8 w-8" />
        </header>
        <main className="flex-grow p-4">
          <div className="overflow-y-auto">
            <Chat />
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;
