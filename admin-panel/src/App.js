import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Page/Landing";
import AnalyticsPage from "./Page/Analytics";
import Users from "./Page/Users";
import PremiumPage from "./Page/Premium";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"; // Import the CSS file
import PremiumMembers from "./Page/PremiumMembers";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/premiumMembers" element={<PremiumMembers />} />
      </Routes>
    </Router>
  );
};

export default App;
