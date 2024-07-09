// src/pages/AnalyticsPage.js
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AnalyticsPage = () => {
    const nav = useNavigate();
  return (
    <div className="analytics-container">
      <Link to="/" className="back-button">Back to Landing Page</Link>
      <h2>Analytics Page</h2>
      {/* Add your analytics content here */}
    </div>
  );
};

export default AnalyticsPage;
