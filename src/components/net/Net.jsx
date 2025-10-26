import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function NetworkPage() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [groups, setGroups] = useState([]);
  const [showCareerChat, setShowCareerChat] = useState(false);
  const [joinedGroups, setJoinedGroups] = useState(new Set());

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
      const href = e.target.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    links.forEach((link) => link.addEventListener("click", handleClick));
    return () => links.forEach((link) => link.removeEventListener("click", handleClick));
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
    setLoggedIn(true);
  };

  const logoutUser = () => {
    setLoggedIn(false);
    setJoinedGroups(new Set());
  };

  // --- Navigation handlers ---
  const handleDashboardClick = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleExploreClick = (e) => {
    e.preventDefault();
    alert("Already on Explore page");
  };

  const handleMyPlanClick = (e) => {
    e.preventDefault();
    navigate("/careerchat");
  };

  const handleSettingsClick = (e) => {
    e.preventDefault();
    alert("Settings clicked");
  };

  // --- Join/Leave Group ---
  const toggleJoinGroup = (groupId) => {
    if (!loggedIn) {
      alert("Group joined!");
      return;
    }
    
    setJoinedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  // --- Generate random career groups with descriptions ---
  const generateGroups = () => {
    const careerData = [
      {
        id: 1,
        name: "Software Engineers",
        description: "Connect with developers building the future of technology. Share code, discuss best practices, and collaborate on innovative projects.",
        members: 12500,
        isHot: true,
        icon: "💻"
      },
      {
        id: 2,
        name: "Data Scientists",
        description: "Join data professionals analyzing trends and making data-driven decisions. Learn ML, AI, and statistical modeling techniques.",
        members: 8900,
        isHot: true,
        icon: "📊"
      },
      {
        id: 3,
        name: "UX Designers",
        description: "A creative community focused on user experience and interface design. Share portfolios and get feedback from peers.",
        members: 6700,
        isHot: false,
        icon: "🎨"
      },
      {
        id: 4,
        name: "Product Managers",
        description: "Strategic thinkers driving product vision and roadmaps. Discuss frameworks, methodologies, and leadership strategies.",
        members: 5400,
        isHot: false,
        icon: "📱"
      },
      {
        id: 5,
        name: "Marketing Specialists",
        description: "Digital marketers sharing campaigns, strategies, and growth hacks. From SEO to social media, we cover it all.",
        members: 9200,
        isHot: false,
        icon: "📈"
      },
      {
        id: 6,
        name: "AI Researchers",
        description: "Cutting-edge AI and machine learning research community. Discuss papers, models, and breakthrough innovations.",
        members: 4800,
        isHot: true,
        icon: "🤖"
      },
      {
        id: 7,
        name: "Cybersecurity Analysts",
        description: "Security professionals protecting digital assets. Share threat intelligence, tools, and defense strategies.",
        members: 7100,
        isHot: true,
        icon: "🔒"
      },
      {
        id: 8,
        name: "Business Analysts",
        description: "Bridge the gap between business and technology. Discuss requirements gathering, process improvement, and analytics.",
        members: 5900,
        isHot: false,
        icon: "💼"
      },
      {
        id: 9,
        name: "DevOps Engineers",
        description: "Infrastructure and automation experts. Share CI/CD pipelines, cloud architectures, and deployment strategies.",
        members: 6300,
        isHot: true,
        icon: "⚙️"
      },
      {
        id: 10,
        name: "Blockchain Developers",
        description: "Pioneers of decentralized technology. Explore Web3, smart contracts, DeFi, and blockchain innovations.",
        members: 3200,
        isHot: true,
        icon: "⛓️"
      },
    ];

    // Shuffle and select random groups
    const shuffled = careerData.sort(() => 0.5 - Math.random());
    setGroups(shuffled.slice(0, 6));
  };

  useEffect(() => {
    generateGroups();
  }, []);

  return (
    <div>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        /* Hero Section */
        .hero {
          position: relative;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          text-align: center;
          padding: 6rem 2rem 4rem;
          overflow: hidden;
        }

        .hero h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .hero p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .cta-button {
          background: white;
          color: #667eea;
          border: none;
          padding: 0.8rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .cta-button:hover {
          background: #f0f0f0;
        }

        .cta-button.hidden {
          opacity: 0;
          transform: translateY(-20px);
          transition: all 0.3s ease;
        }

        /* Top Navigation Bar */
        .top-nav {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .nav-links {
          list-style: none;
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }

        .nav-links li {
          display: inline-block;
        }

        .nav-links a {
          text-decoration: none;
          font-weight: 600;
          color: #333;
          padding: 0.5rem 1rem;
          transition: 0.3s ease;
          border-radius: 6px;
        }

        .nav-links a:hover {
          background: #667eea;
          color: white;
        }

        /* Main Content */
        .main-content {
          max-width: 1200px;
          margin: 4rem auto;
          padding: 0 2rem;
        }

        .main-content h2 {
          font-size: 2rem;
          margin-bottom: 2rem;
          text-align: center;
          color: #333;
        }

        .groups-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .group-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
          overflow: hidden;
        }

        .group-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        }

        .group-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .group-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .group-icon {
          font-size: 2rem;
        }

        .group-title h3 {
          font-size: 1.3rem;
          color: #333;
          margin: 0;
        }

        .hot-badge {
          background: linear-gradient(135deg, #ff6b6b, #ff8787);
          color: white;
          padding: 0.3rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .group-description {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .group-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #f0f0f0;
        }

        .members-count {
          color: #888;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .join-button {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 0.7rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .join-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .join-button.joined {
          background: #48bb78;
        }

        .join-button.joined:hover {
          background: #38a169;
        }

        /* Auth Buttons */
        .auth-btn {
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          margin: 0.5rem;
        }

        .auth-btn-login {
          background: #667eea;
          color: white;
        }

        .auth-btn-login:hover {
          opacity: 0.9;
        }

        .auth-btn-logout {
          background: #e74c3c;
          color: white;
        }

        .auth-btn-logout:hover {
          opacity: 0.9;
        }

        /* Footer */
        footer {
          background: #f1f1f1;
          text-align: center;
          padding: 2rem 1rem;
          color: #555;
          margin-top: 4rem;
        }

        /* Fade-in Animation */
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2rem;
          }

          .hero p {
            font-size: 1rem;
          }

          .nav-links {
            flex-direction: column;
            gap: 1rem;
          }

          .groups-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .group-card {
            padding: 1rem;
          }

          .main-content {
            padding: 0 1rem;
          }
        }

        .text-center {
          text-align: center;
        }

        .mt-8 {
          margin-top: 2rem;
        }
      `}</style>

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
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50
        }}>
          <div style={{
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            padding: '2rem',
            maxWidth: '48rem',
            width: '90%',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowCareerChat(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ✖
            </button>
            <h2 style={{ marginBottom: '1rem' }}>Career Chat</h2>
            <p style={{ color: '#666' }}>
              This is where your CareerChat component would appear. 
              Connect with mentors, explore career paths, and get personalized guidance.
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="main-content fade-in">
        <h2>🌟 Discover Career Communities</h2>
        <div className="groups-grid">
          {groups.map((group) => (
            <div key={group.id} className="group-card">
              <div className="group-header">
                <div className="group-title">
                  <span className="group-icon">{group.icon}</span>
                  <h3>{group.name}</h3>
                </div>
                {group.isHot && (
                  <div className="hot-badge">
                    🔥 Hot
                  </div>
                )}
              </div>
              
              <p className="group-description">
                {group.description}
              </p>
              
              <div className="group-meta">
                <span className="members-count">
                  👥 {group.members.toLocaleString()} members
                </span>
              </div>
              
              <button 
                className={`join-button ${joinedGroups.has(group.id) ? 'joined' : ''}`}
                onClick={() => toggleJoinGroup(group.id)}
              >
                {joinedGroups.has(group.id) ? '✓ Joined' : 'Join Group'}
              </button>
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