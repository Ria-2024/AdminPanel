// src/pages/LandingPage.js
import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Admin Panel</h1>
      <div className="button-container">
        <Link to="/users" className="nav-button">Users</Link>
        <Link to="/analytics" className="nav-button">Analytics</Link>
        <Link to="/premium" className="nav-button">Premium</Link>
      </div>
    </div>
  );
};

export default LandingPage;
