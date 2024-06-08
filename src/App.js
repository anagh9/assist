import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import LoginPage from './components/Login';
import ViewResearch from './components/ViewResearch'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/viewResearch" element={<ViewResearch />} />
      </Routes>
    </Router>
  );
};

export default App;
