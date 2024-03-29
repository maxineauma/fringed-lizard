import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Signout from "./pages/Signout";

import Projects from "./pages/Projects";
import Timers from "./pages/Timers";

import Manage from "./pages/Manage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />

        <Route path="/login" element={<Login />} exact />
        <Route path="/signup" element={<Signup />} exact />
        <Route path="/signout" element={<Signout />} exact />

        <Route path="/projects" element={<Projects />} exact />
        <Route path="/timers" element={<Timers />} exact />

        <Route path="/manage" element={<Manage />} exact />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;