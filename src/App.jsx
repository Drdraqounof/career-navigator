import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Import your pages/components
import Home from "./components/pages/Home";
import Profile from "./components/profile/Profile";
import Net from "./components/net/Net";
import Login from "./components/login/Login";
import Test from "./components/Test/Test";
import Dashboard from "./components/dashboard/Dashboard";
import ProfessionalEvents from "./components/pages/ProfessionalEvents";
import EventCard from "./components/pages/EventCard";
import Settings from "./components/pages/Settings";
import LessonPlan from "./components/pages/LessonPlan";
import CareerChat from "./CareerChat"; // ✅ ADD THIS IMPORT
import PaywallPopup from "./components/PaywallPopup"; // ✅ Add this


function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/net" element={<Net />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<ProfessionalEvents />} />
          <Route path="/eventcard" element={<EventCard />} /> {/* ✅ optional direct route */}
          <Route path="/careerchat" element={<CareerChat />} /> {/* ✅ fixed import & casing */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/lessonplan" element={<LessonPlan />} />
          <Route path="/paywall" element={<PaywallPopup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;