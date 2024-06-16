import React from 'react';

const Logout = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-6">You have successfully logged out</h1>
        <p className="text-xl">Thank you for using the Alliance Platform. We hope to see you again soon!</p>
      </div>
    </div>
  );
};

export default Logout;
