import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth/register.jsx";
import Login from "./components/auth/login.jsx";
import Landing from "./components/landing.jsx";
import Home from "./components/home.jsx";
import Profile from "./components/profile.jsx";
import Dashboard from "./components/dashboard.jsx";
import Folders from "./components/folders.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/folders/:folderName" element={<Folders />} />
      </Routes>
    </Router>
  );
};

export default App;
