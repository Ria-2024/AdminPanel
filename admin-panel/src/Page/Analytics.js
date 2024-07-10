// src/pages/AnalyticsPage.js
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const AnalyticsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="premium-page">
      <Button onClick={() => navigate("/")} style={{backgroundColor:"rgb(72, 39, 110)"}}>Back</Button>
      <h2>Analytics Page</h2>
      {/* Add your premium content here */}
    </div>
  );
};

export default AnalyticsPage;
