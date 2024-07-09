// src/pages/PremiumPage.js
import React from "react";
import { Link } from "react-router-dom";
import "./Premium.css";

const PremiumPage = () => {
  return (
    <div className="premium-container">
      <Link to="/" className="back-button">Back to Landing Page</Link>
      <h2>Premium Page</h2>
      {/* Add your premium content here */}
    </div>
  );
};

export default PremiumPage;
