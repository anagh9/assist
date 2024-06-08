import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home');
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center"> {/* Center the content */}
        <h1 className="text-3xl text-blue-600 font-bold mb-6">ASSIST</h1>
        <h2 className="text-2xl font-bold mb-6">Login to Alliance Platform</h2>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={handleLogin}
          >
            SignIn with Auth0
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
