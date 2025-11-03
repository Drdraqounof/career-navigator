// ✅ All imports at the very top
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  // === Canvas Wave Animation ===
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

      const waves = [
      { color: 'rgba(59, 130, 246, 0.7)', speed: 0.03, amplitude: 60, frequency: 0.003, offset: -50 },
      { color: 'rgba(37, 99, 235, 0.6)', speed: 0.035, amplitude: 80, frequency: 0.0055, offset: 20 },
      { color: 'rgba(147, 51, 234, 0.5)', speed: 0.025, amplitude: 55, frequency: 0.004, offset: 50 }
    ];


    function drawWave(wave, time) {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + 
          Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.7) * wave.amplitude * 0.5 +
          wave.offset;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = wave.color;
      ctx.fill();
    }

    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      waves.forEach(wave => drawWave(wave, time));

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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

  // === Parallax effect (disabled for hero section) ===
  // Removed parallax effect to prevent hero section from moving on scroll

  // === Login / Test link logic ===
  const handleTestLink = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      alert("Logged in! Navigating to Test page.");
    } else {
      alert("Not logged in. Redirecting to Login page.");
    }
  };

 function toggleLogin() {
    navigate("/login");
  }

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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
          padding: 8rem 0;
          overflow: hidden;
        }

        .wave-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
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
          filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.3));
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .hero-section p {
          font-size: 1.5rem;
          max-width: 48rem;
          margin: 0 auto;
          line-height: 1.75;
          filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent);
          z-index: 5;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }

        .floating-shape {
          position: absolute;
          z-index: 2;
          animation: float 6s ease-in-out infinite;
        }

        .shape-1 {
          top: 10%;
          left: 10%;
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          animation-delay: 0s;
        }

        .shape-2 {
          top: 60%;
          right: 15%;
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          animation: pulse 5s ease-in-out infinite;
          animation-delay: 1s;
        }

        .shape-3 {
          bottom: 15%;
          left: 20%;
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.1);
          clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
          animation-delay: 2s;
          animation-duration: 8s;
        }

        .shape-4 {
          top: 30%;
          right: 30%;
          width: 70px;
          height: 70px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          animation-delay: 1.5s;
          animation-duration: 6.5s;
        }

        .shape-5 {
          bottom: 30%;
          right: 10%;
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.25);
          border-radius: 8px;
          animation: pulse 7s ease-in-out infinite;
          animation-delay: 0.5s;
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
            <div className="nav-title">🚀 Wayvian your Career Navigator</div>
            <ul>
              <li><a href="#overview">Overview</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#timeline">Timeline</a></li>
              <li><a href="#tech">Tech Stack</a></li>
              <li>
                <button onClick={() => navigate("/settings")} className="login-btn">
                  Settings
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/login")} className="login-btn">
                  Login
                </button>
              </li>
              <li><a href="#" onClick={handleTestLink}>Test</a></li>
            </ul>
          </nav>
        </header>

        <section ref={heroRef} className="hero-section">
          <canvas ref={canvasRef} className="wave-canvas"></canvas>
          
          {/* Floating 2D shapes */}
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div className="floating-shape shape-4"></div>
          <div className="floating-shape shape-5"></div>
          
          <div className="hero-overlay"></div>
          
          <div className="container hero-content">
            <h1>Wayvian</h1>
            <p>
              Empowering students, graduates, and career changers with personalized guidance based on real job market trends
            </p>
          </div>
        </section>

        <main className="container">
          
<section id="overview" className="fade-in">
  <h2>Project Overview</h2>
  <div className="grid grid-3">
    <div className="card">
      <h3>🎯 What It Does</h3>
      <p>Wayvian helps users discover which careers suit them best, what skills they need, and the actionable steps to reach their goals, all based on real job market trends.</p>
    </div>
    <div className="card">
      <h3>🏗️ Development Approach</h3>
      <p>Built with Agile methodology over 6 weeks in 3 sprints. We prioritized core features first, then layered in advanced functionality. Started with mock data, integrated real APIs later.</p>
    </div>
    <div className="card">
      <h3>📊 Smart Insights</h3>
      <p>Improves resumes, identifies skill gaps, and generates actionable career plans. Recommendations adapt dynamically to evolving job market trends.</p>
    </div>
  </div>
</section>

<section id="audience" className="fade-in">
  <h2>Who It's For</h2>
  <div className="grid grid-2 max-w-4xl">
    <div className="audience-item">🎓 High school seniors planning college or careers</div>
    <div className="audience-item">👨‍🎓 Recent graduates entering the job market</div>
    <div className="audience-item">🔄 Career changers exploring new opportunities</div>
    <div className="audience-item">🔍 Anyone seeking smarter job search strategies</div>
  </div>
</section>

<section id="problems" className="fade-in">
  <h2>Problems We Solve</h2>
  <div className="grid grid-2 max-w-4xl">
    <div className="problem-item">
      <strong>Resume Challenges:</strong>
      <p>Helps users tailor resumes for specific roles effectively.</p>
    </div>
    <div className="problem-item">
      <strong>Skills Gaps:</strong>
      <p>Identifies missing skills to guide learning and growth.</p>
    </div>
    <div className="problem-item">
      <strong>Learning Direction:</strong>
      <p>Provides clarity on what to learn next for career advancement.</p>
    </div>
    <div className="problem-item">
      <strong>Market Trends:</strong>
      <p>Informs users about current industry demands and opportunities.</p>
    </div>
  </div>
</section>

<section id="features" className="fade-in">
  <h2>Key Features</h2>
  <div className="grid grid-3">
    <div className="card">
      <h3>🛤️ Onboarding Flow</h3>
      <p>Answer personalized questions to receive tailored career guidance and recommendations.</p>
    </div>
    <div className="card">
      <h3>🔍 Explore Flow</h3>
      <p>Search and filter careers with detailed info on requirements, salaries, and growth potential.</p>
    </div>
    <div className="card">
      <h3>💾 Save & Compare</h3>
      <p>Bookmark careers and compare multiple paths side by side for better decision-making.</p>
    </div>
    <div className="card">
      <h3>📋 My Plan Page</h3>
      <p>View a summary of skill gaps and actionable next steps personalized to your profile.</p>
    </div>
    <div className="card">
      <h3>📄 Export Feature</h3>
      <p>Download your personalized career plan as PDF or Markdown for offline access.</p>
    </div>
    <div className="card">
      <h3>Career Testing</h3>
      <p>After completing the login page, the user is directed to take a quiz that assesses skills and interests for better career alignment.</p>
    </div>
  </div>
</section>

<section id="career-assessment" className="fade-in">
  <h2>Career Assessment Test</h2>
  <div className="max-w-4xl">
    <div className="card">
      <p>
        After logging in, users are guided through a comprehensive career assessment test. 
        This test evaluates skills, interests, and values to provide personalized career recommendations. 
        It includes multiple-choice questions, situational judgment tests, and interest inventories 
        to ensure a holistic understanding of each user's profile.
      </p>
    </div>
  </div>
</section>

<section id="development-approach" className="fade-in">
  <h2>Development Approach</h2>
  <div className="max-w-4xl">
    <div className="timeline-card timeline-sprint1">
      <h3>Sprint 1: Foundation (Weeks 1-2)</h3>
      <p><strong>Week 1:</strong> Define the problem, analyze competitors, create user personas, plan MVP</p>
      <p><strong>Week 2:</strong> Design wireframes, set up Trello backlog, scaffold project repository</p>
    </div>
    <div className="timeline-card timeline-sprint2">
      <h3>Sprint 2: Core Setup (Week 3)</h3>
      <p>Develop onboarding flow, set up state management, implement mock APIs, and establish design system</p>
    </div>
    <div className="timeline-card timeline-sprint3">
      <h3>Sprint 3: Main Features (Weeks 4-5)</h3>
      <p><strong>Week 4:</strong> Build Explore flow, Save & Compare functionality, and data persistence</p>
      <p><strong>Week 5:</strong> Implement My Plan page, export features, and conduct usability testing</p>
    </div>
    <div className="timeline-card timeline-final">
      <h3>Final Phase (Week 6)</h3>
      <p>Complete documentation, create training materials, prepare demo, and showcase final project</p>
    </div>
  </div>
</section>

<section id="tech">
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