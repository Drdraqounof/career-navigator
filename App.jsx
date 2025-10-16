import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Import your pages/components
import Case from "./pages/Case";
import Profile from "./profile/Profile";
import Net from "./net/Net";
import Login from "./login/Login";
import Groupsheet from "./groupsheet/Groupsheet";
import Findme from "./findme/Findme";
import Dashboard from "./dashboard/Dashboard";
import ProfessionalEvents from "./pages/ProfessionalEvents";
import EventCard from "./pages/EventCard";
import CareerChat from "./CareerChat"; // ✅ ADD THIS IMPORT


function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Case />} />
          <Route path="/groupsheet" element={<Groupsheet />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/net" element={<Net />} />
          <Route path="/findme" element={<Findme />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<ProfessionalEvents />} />
          <Route path="/event-card" element={<EventCard />} /> {/* ✅ optional direct route */}
          <Route path="/careerchat" element={<CareerChat />} /> {/* ✅ fixed import & casing */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

