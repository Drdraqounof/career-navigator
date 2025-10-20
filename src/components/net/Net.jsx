import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Net.css";
import CareerChat from "../../CareerChat";

export default function NetworkPage() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
  const [groups, setGroups] = useState([]);
  const [showCareerChat, setShowCareerChat] = useState(false);

  const heroRef = useRef(null);
  const ctaRef = useRef(null);

  // --- Intersection Observer: fade-in elements ---
  useEffect(() => {
    const options = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, options);

    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // --- Smooth scrolling for internal links ---
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    const handleClick = (e) => {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    links.forEach((a) => a.addEventListener("click", handleClick));
    return () => links.forEach((a) => a.removeEventListener("click", handleClick));
  }, []);

  // --- Parallax hero ---
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (heroRef.current) heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- CTA hide/show on scroll ---
  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (ctaRef.current) {
        if (currentScroll > lastScroll) ctaRef.current.classList.add("hidden");
        else ctaRef.current.classList.remove("hidden");
      }
      lastScroll = Math.max(currentScroll, 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Login/Logout logic ---
  const loginUser = () => {
    localStorage.setItem("loggedIn", "true");
    setLoggedIn(true);
  };

  const logoutUser = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
  };

  // --- Navigation handlers ---
  const handleDashboardClick = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleExploreClick = (e) => {
    e.preventDefault();
    navigate("/network"); // or wherever your Explore page is
  };

  const handleMyPlanClick = (e) => {
    e.preventDefault();
    setShowCareerChat(true);
  };

  const handleSettingsClick = (e) => {
    e.preventDefault();
    alert("Settings clicked"); // Replace with your settings page
  };

  // --- Generate random career groups ---
  const generateGroups = () => {
    const careers = [
      "Software Engineers",
      "Data Scientists",
      "UX Designers",
      "Product Managers",
      "Marketing Specialists",
      "AI Researchers",
      "Cybersecurity Analysts",
      "Business Analysts",
      "DevOps Engineers",
      "Blockchain Developers",
    ];
    const shuffled = careers.sort(() => 0.5 - Math.random());
    setGroups(shuffled.slice(0, 5)); // pick 5 random groups
  };

  useEffect(() => {
    generateGroups();
  }, []);

  return (
    <div>
      {/* Top Navigation */}
      <nav className="top-nav">
        <ul className="nav-links">
          <li><a href="#" onClick={handleDashboardClick}>Dashboard</a></li>
          <li><a href="#" onClick={handleExploreClick}>Explore</a></li>
          <li><a href="#" onClick={handleMyPlanClick}>My Plan</a></li>
          <li><a href="#" onClick={handleSettingsClick}>Settings</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="hero fade-in">
        <h1>Welcome to Find Me</h1>
        <p>Your AI-powered Career Navigator</p>
        <button ref={ctaRef} className="cta-button">
          Get Started
        </button>
      </section>

      {/* CareerChat Modal */}
      {showCareerChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full relative">
            <button
              onClick={() => setShowCareerChat(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <CareerChat />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="main-content fade-in">
        <h2>Random Career Groups</h2>
        <div style={{ marginTop: "2rem" }}>
          {groups.map((group, idx) => (
            <div key={idx} className="group-card">
              <strong>{group}</strong>
              <p>
                Explore opportunities, connect with professionals, and discover new paths in the {group} field.
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Auth Buttons */}
      <div className="text-center mt-8">
        {loggedIn ? (
          <button onClick={logoutUser} className="auth-btn auth-btn-logout">Logout</button>
        ) : (
          <button onClick={loginUser} className="auth-btn auth-btn-login">Login</button>
        )}
      </div>

      {/* Footer */}
      <footer>
        <p>© 2025 Find Me — All rights reserved.</p>
      </footer>
    </div>
  );
}
