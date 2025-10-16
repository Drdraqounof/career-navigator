import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Case() {
  const heroRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // === Fade-in on scroll ===
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("opacity-100");
      });
    }, observerOptions);

    const fadeEls = document.querySelectorAll(".fade-in");
    fadeEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // === Smooth scroll for navigation ===
  useEffect(() => {
    const anchors = document.querySelectorAll('a[href^="#"]');
    const handleClick = (e) => {
      e.preventDefault();
      const target = document.querySelector(e.currentTarget.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    anchors.forEach((a) => a.addEventListener("click", handleClick));
    return () => anchors.forEach((a) => a.removeEventListener("click", handleClick));
  }, []);

  // === Parallax effect ===
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // === Login / Test link logic ===
  const handleTestLink = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      alert("Logged in! Would navigate to groupsheet.html");
    } else {
      alert("Not logged in. Would navigate to login.html");
    }
  };

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: system-ui, -apple-system, sans-serif;
          color: #111827;
          background-color: #ffffff;
        }

        .min-h-screen {
          min-height: 100vh;
        }

        .container {
          max-width: 1280px;
          margin-left: auto;
          margin-right: auto;
        }

        header {
          background-color: #ffffff;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
        }

        .nav-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
        }

        nav ul {
          display: flex;
          gap: 1.5rem;
          list-style: none;
        }

        nav ul li a,
        nav ul li button {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }

        nav ul li a:hover,
        nav ul li button:hover {
          color: #2563eb;
        }

        .hero-section {
          position: relative;
          background: linear-gradient(to bottom right, #3b82f6, #2563eb, #9333ea);
          color: #ffffff;
          padding: 8rem 0;
          overflow: hidden;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 1.5rem;
        }

        .hero-section h1 {
          font-size: 3.75rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1));
        }

        .hero-section p {
          font-size: 1.5rem;
          max-width: 48rem;
          margin: 0 auto;
          line-height: 1.75;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent);
        }

        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 3rem;
          }
          
          .hero-section p {
            font-size: 1.125rem;
          }
        }

        main {
          padding: 4rem 1.5rem;
        }

        section {
          margin-bottom: 5rem;
        }

        .fade-in {
          opacity: 0;
          transition: opacity 0.7s;
        }

        .fade-in.opacity-100 {
          opacity: 1;
        }

        section h2 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 2.5rem;
          text-align: center;
        }

        .grid {
          display: grid;
          gap: 2rem;
        }

        .grid-3 {
          grid-template-columns: repeat(3, 1fr);
        }

        .grid-2 {
          grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: 768px) {
          .grid-3,
          .grid-2 {
            grid-template-columns: 1fr;
          }
        }

        .card {
          padding: 2rem;
          background-color: #ffffff;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border-radius: 1rem;
          border: 1px solid #f3f4f6;
          transition: box-shadow 0.3s;
        }

        .card:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
        }

        .card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .card h4 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #2563eb;
        }

        .card p {
          color: #4b5563;
          line-height: 1.75;
        }

        .audience-item {
          padding: 1.5rem;
          background-color: #eff6ff;
          border-radius: 0.75rem;
          font-size: 1.125rem;
          font-weight: 500;
          color: #374151;
        }

        .max-w-4xl {
          max-width: 56rem;
          margin: 0 auto;
        }

        .problem-item {
          padding: 1.5rem;
          background-color: #fef2f2;
          border-radius: 0.75rem;
          border-left: 4px solid #f87171;
        }

        .problem-item strong {
          color: #b91c1c;
          font-size: 1.125rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .problem-item p {
          color: #374151;
          margin-top: 0.5rem;
        }

        .timeline-card {
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }

        .timeline-sprint1 {
          background: linear-gradient(to right, #eff6ff, #dbeafe);
          border-left: 4px solid #3b82f6;
        }

        .timeline-sprint1 h3 {
          color: #1e3a8a;
        }

        .timeline-sprint2 {
          background: linear-gradient(to right, #f0fdf4, #dcfce7);
          border-left: 4px solid #22c55e;
        }

        .timeline-sprint2 h3 {
          color: #14532d;
        }

        .timeline-sprint3 {
          background: linear-gradient(to right, #faf5ff, #f3e8ff);
          border-left: 4px solid #a855f7;
        }

        .timeline-sprint3 h3 {
          color: #581c87;
        }

        .timeline-final {
          background: linear-gradient(to right, #fff7ed, #ffedd5);
          border-left: 4px solid #f97316;
        }

        .timeline-final h3 {
          color: #9a3412;
        }

        .timeline-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .timeline-card p {
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .timeline-card strong {
          font-weight: 600;
        }

        #tech {
          padding-bottom: 4rem;
        }
      `}</style>
      
      <div className="min-h-screen">
        <header>
          <nav className="container">
            <div className="nav-title">🚀 Find Me Career Navigator</div>
            <ul>
              <li><a href="#overview">Overview</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#timeline">Timeline</a></li>
              <li><a href="#tech">Tech Stack</a></li>
              <li>
                <button onClick={toggleLogin}>
                  <a href="Login">Login</a>
                </button>
              </li>
              <li><a href="#" onClick={handleTestLink}>Test</a></li>
            </ul>
          </nav>
        </header>

        <section ref={heroRef} className="hero-section">
          <div className="container hero-content">
            <h1>Find Me</h1>
            <p>
              Empowering students, graduates, and career changers with personalized guidance based on real job market trends
            </p>
          </div>
          <div className="hero-overlay"></div>
        </section>

        <main className="container">
          
          <section id="overview" className="fade-in">
            <h2>Project Overview</h2>
            <div className="grid grid-3">
              <div className="card">
                <h3>🎯 What It Does</h3>
                <p>A web app that helps users figure out which jobs fit them, what skills they need, and what steps to take next. Provides personalized guidance based on real job market trends.</p>
              </div>
              <div className="card">
                <h3>🏗️ Development Approach</h3>
                <p>Built using Agile methodology with 3 sprints over 6 weeks. Core features first, then advanced functionality. Mock data initially, real APIs later.</p>
              </div>
              <div className="card">
                <h3>📊 Smart Insights</h3>
                <p>Helps improve resumes, identifies skills gaps, and creates actionable career plans. Adapts recommendations as the job market evolves.</p>
              </div>
            </div>
          </section>

          <section id="audience" className="fade-in">
            <h2>Who It's For</h2>
            <div className="grid grid-2 max-w-4xl">
              <div className="audience-item">🎓 High school seniors planning college or careers</div>
              <div className="audience-item">👨‍🎓 Recent graduates entering the job market</div>
              <div className="audience-item">🔄 Career changers looking for new opportunities</div>
              <div className="audience-item">🔍 Anyone wanting smarter job search methods</div>
            </div>
          </section>

          <section id="problems" className="fade-in">
            <h2>Problems We Solve</h2>
            <div className="grid grid-2 max-w-4xl">
              <div className="problem-item">
                <strong>Resume Struggles:</strong>
                <p>Don't know how to tailor resumes for specific jobs</p>
              </div>
              <div className="problem-item">
                <strong>Skills Gaps:</strong>
                <p>Unclear about what skills they're missing</p>
              </div>
              <div className="problem-item">
                <strong>Learning Direction:</strong>
                <p>Unsure what to learn next in their career</p>
              </div>
              <div className="problem-item">
                <strong>Market Trends:</strong>
                <p>Don't understand current job market dynamics</p>
              </div>
            </div>
          </section>

          <section id="features" className="fade-in">
            <h2>Key Features</h2>
            <div className="grid grid-3">
              <div className="card">
                <h3>🛤️ Onboarding Flow</h3>
                <p>Users answer personalized questions to receive tailored career advice and recommendations.</p>
              </div>
              <div className="card">
                <h3>🔍 Explore Flow</h3>
                <p>Search and filter careers with detailed information about requirements, salaries, and growth potential.</p>
              </div>
              <div className="card">
                <h3>💾 Save & Compare</h3>
                <p>Save interesting jobs or career paths and compare multiple options side by side.</p>
              </div>
              <div className="card">
                <h3>📋 My Plan Page</h3>
                <p>Comprehensive summary of skills gaps and suggested actionable next steps.</p>
              </div>
              <div className="card">
                <h3>📄 Export Feature</h3>
                <p>Download personalized career plans as PDF or Markdown files for offline reference.</p>
              </div>
            </div>
          </section>

          <section id="timeline" className="fade-in">
            <h2>Development Timeline</h2>
            <div className="max-w-4xl">
              <div className="timeline-card timeline-sprint1">
                <h3>Sprint 1: Foundation (Weeks 1-2)</h3>
                <p><strong>Week 1:</strong> Define problem, analyze competitors, create user personas, plan MVP</p>
                <p><strong>Week 2:</strong> Create wireframes, set up Trello backlog, scaffold project repository</p>
              </div>
              <div className="timeline-card timeline-sprint2">
                <h3>Sprint 2: Core Setup (Week 3)</h3>
                <p>Build onboarding flow, set up application state management, implement mock APIs, establish design system</p>
              </div>
              <div className="timeline-card timeline-sprint3">
                <h3>Sprint 3: Main Features (Weeks 4-5)</h3>
                <p><strong>Week 4:</strong> Build Explore flow, Save & Compare functionality, data persistence</p>
                <p><strong>Week 5:</strong> Implement My Plan page, export features, conduct usability testing</p>
              </div>
              <div className="timeline-card timeline-final">
                <h3>Final Phase (Week 6)</h3>
                <p>Complete documentation, create training materials, prepare demo, showcase final project</p>
              </div>
            </div>
          </section>

          <section id="tech" className="fade-in">
            <h2>Technology Stack</h2>
            <div className="grid grid-3">
              <div className="card">
                <h4>Frontend</h4>
                <p>React 18+ with TypeScript, Vite</p>
              </div>
              <div className="card">
                <h4>State Management</h4>
                <p>Zustand or React Context</p>
              </div>
              <div className="card">
                <h4>Styling</h4>
                <p>TailwindCSS</p>
              </div>
              <div className="card">
                <h4>Routing & Forms</h4>
                <p>React Router, React Hook Form + Zod</p>
              </div>
              <div className="card">
                <h4>Hosting</h4>
                <p>Vercel</p>
              </div>
              <div className="card">
                <h4>Project Management</h4>
                <p>Trello for task tracking</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}