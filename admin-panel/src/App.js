import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Page/Landing";
import AnalyticsPage from "./Page/Analytics";
import Users from "./Page/Users";
import Applicants from "./Page/Applicants";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"; // Import the CSS file
import PremiumMembers from "./Page/Premium";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/premium" element={<Applicants />} />
        <Route path="/premiumMembers" element={<PremiumMembers />} />
      </Routes>
    </Router>
  );
};

export default App;
