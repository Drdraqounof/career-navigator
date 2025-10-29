import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function NetworkPage() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [groups, setGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const canvasRef = useRef(null);

  // Canvas Wave Animation for Hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 300;
    };
    resizeCanvas();

    const waves = [
      { color: 'rgba(59, 130, 246, 0.7)', speed: 0.03, amplitude: 60, frequency: 0.003, offset: -50 },
      { color: 'rgba(37, 99, 235, 0.6)', speed: 0.035, amplitude: 80, frequency: 0.0055, offset: 20 },
      { color: 'rgba(147, 51, 234, 0.5)', speed: 0.025, amplitude: 55, frequency: 0.004, offset: 50 }
    ];

    function drawWave(wave, time) {
      ctx.beginPath();
      
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
      ctx.quadraticCurveTo(canvas.width / 2, canvas.height, 0, canvas.height);
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

  // Fade-in animation
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

  // Login/Logout
  const toggleAuth = () => {
    setLoggedIn(!loggedIn);
    if (loggedIn) {
      setJoinedGroups(new Set());
    }
  };

  // Navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Join/Leave Group
  const toggleJoinGroup = (groupId) => {
    if (!loggedIn) {
      alert("Please login to join groups!");
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

  // Career groups data
  const allGroups = [
    {
      id: 1,
      name: "Software Engineers",
      description: "Connect with developers building the future of technology. Share code, discuss best practices, and collaborate on innovative projects.",
      members: 12500,
      isHot: true,
      icon: "💻",
      category: "tech"
    },
    {
      id: 2,
      name: "Data Scientists",
      description: "Join data professionals analyzing trends and making data-driven decisions. Learn ML, AI, and statistical modeling techniques.",
      members: 8900,
      isHot: true,
      icon: "📊",
      category: "tech"
    },
    {
      id: 3,
      name: "UX Designers",
      description: "A creative community focused on user experience and interface design. Share portfolios and get feedback from peers.",
      members: 6700,
      isHot: false,
      icon: "🎨",
      category: "design"
    },
    {
      id: 4,
      name: "Product Managers",
      description: "Strategic thinkers driving product vision and roadmaps. Discuss frameworks, methodologies, and leadership strategies.",
      members: 5400,
      isHot: false,
      icon: "📱",
      category: "business"
    },
    {
      id: 5,
      name: "Marketing Specialists",
      description: "Digital marketers sharing campaigns, strategies, and growth hacks. From SEO to social media, we cover it all.",
      members: 9200,
      isHot: false,
      icon: "📈",
      category: "business"
    },
    {
      id: 6,
      name: "AI Researchers",
      description: "Cutting-edge AI and machine learning research community. Discuss papers, models, and breakthrough innovations.",
      members: 4800,
      isHot: true,
      icon: "🤖",
      category: "tech"
    },
    {
      id: 7,
      name: "Cybersecurity Analysts",
      description: "Security professionals protecting digital assets. Share threat intelligence, tools, and defense strategies.",
      members: 7100,
      isHot: true,
      icon: "🔒",
      category: "tech"
    },
    {
      id: 8,
      name: "Business Analysts",
      description: "Bridge the gap between business and technology. Discuss requirements gathering, process improvement, and analytics.",
      members: 5900,
      isHot: false,
      icon: "💼",
      category: "business"
    },
    {
      id: 9,
      name: "DevOps Engineers",
      description: "Infrastructure and automation experts. Share CI/CD pipelines, cloud architectures, and deployment strategies.",
      members: 6300,
      isHot: true,
      icon: "⚙️",
      category: "tech"
    },
    {
      id: 10,
      name: "Blockchain Developers",
      description: "Pioneers of decentralized technology. Explore Web3, smart contracts, DeFi, and blockchain innovations.",
      members: 3200,
      isHot: true,
      icon: "⛓️",
      category: "tech"
    },
    {
      id: 11,
      name: "Graphic Designers",
      description: "Visual artists creating stunning designs. Share your work, get inspiration, and learn new design techniques.",
      members: 8500,
      isHot: false,
      icon: "🖌️",
      category: "design"
    },
    {
      id: 12,
      name: "Healthcare Professionals",
      description: "Medical professionals discussing patient care, innovations, and healthcare technology advancements.",
      members: 11200,
      isHot: false,
      icon: "🏥",
      category: "healthcare"
    },
  ];

  // Filter groups based on search and category
  const filteredGroups = allGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || group.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    setGroups(filteredGroups);
  }, [searchQuery, filterCategory]);

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
          background: #f5f7fa;
        }

        /* Top Navigation Bar */
        .top-nav {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          border-bottom: 1px solid #e5e7eb;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-brand {
          font-size: 1.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 0.5rem;
          margin: 0;
          padding: 0;
          align-items: center;
        }

        .nav-links li {
          display: inline-block;
        }

        .nav-links button {
          text-decoration: none;
          font-weight: 600;
          color: #4b5563;
          padding: 0.6rem 1.2rem;
          transition: all 0.3s ease;
          border-radius: 8px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
        }

        .nav-links button:hover {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          transform: translateY(-2px);
        }

        .auth-button {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-left: 1rem;
        }

        .auth-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .auth-button.logout {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }

        /* Hero Section */
        .hero {
          position: relative;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          text-align: center;
          padding: 4rem 2rem;
          overflow: hidden;
          height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .hero-canvas {
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
        }

        .hero h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          font-weight: 800;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .hero p {
          font-size: 1.3rem;
          opacity: 0.95;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        /* Search and Filter Section */
        .search-filter-section {
          max-width: 1200px;
          margin: -2rem auto 2rem;
          padding: 0 2rem;
          position: relative;
          z-index: 10;
        }

        .search-filter-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .search-input {
          flex: 1;
          min-width: 250px;
          padding: 0.9rem 1.2rem;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .filter-buttons {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.9rem 1.5rem;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .filter-btn:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-color: transparent;
        }

        /* Main Content */
        .main-content {
          max-width: 1200px;
          margin: 4rem auto;
          padding: 0 2rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .section-header h2 {
          font-size: 2rem;
          color: #1f2937;
        }

        .results-count {
          color: #6b7280;
          font-size: 1rem;
          font-weight: 500;
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
          padding: 1.75rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          border: 2px solid transparent;
        }

        .group-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
          border-color: #667eea;
        }

        .group-card.joined {
          border-color: #48bb78;
          background: linear-gradient(to bottom, #f0fdf4, white);
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
          font-size: 2.5rem;
        }

        .group-title h3 {
          font-size: 1.4rem;
          color: #1f2937;
          margin: 0;
          font-weight: 700;
        }

        .hot-badge {
          background: linear-gradient(135deg, #ff6b6b, #ff8787);
          color: white;
          padding: 0.4rem 0.9rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
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
          color: #6b7280;
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 1.25rem;
        }

        .group-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          padding-top: 1rem;
          border-top: 2px solid #f3f4f6;
        }

        .members-count {
          color: #9ca3af;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        .join-button {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 0.8rem 1.8rem;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          width: 100%;
        }

        .join-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
        }

        .join-button.joined {
          background: linear-gradient(135deg, #48bb78, #38a169);
        }

        .join-button.joined:hover {
          background: linear-gradient(135deg, #38a169, #2f855a);
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: #6b7280;
        }

        .empty-state-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        /* Footer */
        footer {
          background: #1f2937;
          color: white;
          text-align: center;
          padding: 2.5rem 1rem;
          margin-top: 4rem;
        }

        footer p {
          opacity: 0.8;
        }

        /* Fade-in Animation */
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
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

          .nav-container {
            flex-direction: column;
            gap: 1rem;
          }

          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
          }

          .search-filter-card {
            flex-direction: column;
          }

          .filter-buttons {
            width: 100%;
            justify-content: center;
          }

          .groups-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .main-content {
            padding: 0 1rem;
          }
        }
      `}</style>

      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-container">
          <div className="nav-brand">🚀 Wayvian</div>
          <ul className="nav-links">
            <li><button onClick={() => handleNavigation("/dashboard")}>Dashboard</button></li>
            <li><button onClick={() => handleNavigation("/net")}>Network</button></li>
            <li><button onClick={() => handleNavigation("/careerchat")}>My Plan</button></li>
            <li><button onClick={() => handleNavigation("/settings")}>Settings</button></li>
            <li>
              <button 
                onClick={toggleAuth}
                className={`auth-button ${loggedIn ? 'logout' : ''}`}
              >
                {loggedIn ? '👋 Logout' : '🔐 Login'}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section with Waves */}
      <section className="hero">
        <canvas ref={canvasRef} className="hero-canvas"></canvas>
        <div className="hero-content">
          <h1>Discover Career Communities</h1>
          <p>Connect, learn, and grow with professionals worldwide</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-filter-card fade-in">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filterCategory === 'all' ? 'active' : ''}`}
              onClick={() => setFilterCategory('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filterCategory === 'tech' ? 'active' : ''}`}
              onClick={() => setFilterCategory('tech')}
            >
              Tech
            </button>
            <button 
              className={`filter-btn ${filterCategory === 'design' ? 'active' : ''}`}
              onClick={() => setFilterCategory('design')}
            >
              Design
            </button>
            <button 
              className={`filter-btn ${filterCategory === 'business' ? 'active' : ''}`}
              onClick={() => setFilterCategory('business')}
            >
              Business
            </button>
            <button 
              className={`filter-btn ${filterCategory === 'healthcare' ? 'active' : ''}`}
              onClick={() => setFilterCategory('healthcare')}
            >
              Healthcare
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content fade-in">
        <div className="section-header">
          <h2>🌟 Career Groups</h2>
          <span className="results-count">
            {groups.length} {groups.length === 1 ? 'group' : 'groups'} found
          </span>
        </div>

        {groups.length > 0 ? (
          <div className="groups-grid">
            {groups.map((group) => (
              <div 
                key={group.id} 
                className={`group-card ${joinedGroups.has(group.id) ? 'joined' : ''}`}
              >
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
                    👥 {group.members.toLocaleString()}
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
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No groups found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer>
        <p>© 2025 Wayvian — Empowering Your Career Journey</p>
      </footer>
    </div>
  );
}