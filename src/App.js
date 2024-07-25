import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import LoginPage from "./components/Login";
import ViewResearch from "./components/ViewResearch";
import ViewAnalysis from "./components/ViewAnalysis";
import Plans from "./components/Plans";
import Logout from "./components/Logout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/viewResearch" element={<ViewResearch />} />
        <Route path="/viewAnalysis" element={<ViewAnalysis />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default App;
