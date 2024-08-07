import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Navbar'; // Assuming you have a Navbar component
import Chat from './Chat'; // Assuming you have a Chat component
import { FaUserCircle } from 'react-icons/fa'; // Assuming you are using react-icons for the user icon

const LoginPage = () => {
  const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          localStorage.setItem('authToken', token); // Store token in localStorage
        }
      } catch (error) {
        console.error("Error getting token: ", error);
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    localStorage.removeItem('authToken'); // Remove token from localStorage
    window.location.reload();
  };

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  return !isAuthenticated ? (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-3xl text-blue-600 font-bold mb-6">ALICE</h1>
        <h2 className="text-2xl font-bold mb-6">Login to Alice Platform</h2>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={loginWithRedirect}
          >
            SignIn
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex">
      <Navbar />
      <div className="flex-grow flex flex-col">
        <header className="flex justify-end items-center p-4 bg-gray-800 text-white relative">
          <FaUserCircle className="h-8 w-8 cursor-pointer" onClick={toggleLogout} />
          {showLogout && (
            <button
              onClick={handleLogout}
              className="absolute top-12 right-0 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none"
            >
              Logout
            </button>
          )}
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
