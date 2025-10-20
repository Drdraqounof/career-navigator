import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Import your pages/components
import Home from "./components/pages/Home";
import Profile from "./components/profile/Profile";
import Net from "./components/net/Net";
import Login from "./components/login/Login";
import Groupsheet from "./components/groupsheet/Groupsheet";
import Dashboard from "./components/dashboard/Dashboard";
import ProfessionalEvents from "./components/pages/ProfessionalEvents";
import EventCard from "./components/pages/EventCard";
import CareerChat from "./CareerChat"; // ✅ ADD THIS IMPORT


function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/groupsheet" element={<Groupsheet />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/net" element={<Net />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<ProfessionalEvents />} />
          <Route path="/eventcard" element={<EventCard />} /> {/* ✅ optional direct route */}
          <Route path="/careerchat" element={<CareerChat />} /> {/* ✅ fixed import & casing */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

