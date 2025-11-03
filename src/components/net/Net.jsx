import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function NavButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`nav-button ${active ? "active" : ""}`}
    >
      {children}
    </button>
  );
}

export default function NetworkPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("network");
  const [loggedIn, setLoggedIn] = useState(true);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState("all"); // "all" or "saved"
  const [notification, setNotification] = useState(null);
  const canvasRef = useRef(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

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
      setLikedPosts(new Set());
      setSavedPosts(new Set());
    }
  };

  // Like/Unlike Post
  const toggleLikePost = (postId) => {
    if (!loggedIn) {
      alert("Please login to like posts!");
      return;
    }
    
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  // Save/Unsave Post
  const toggleSavePost = (postId) => {
    if (!loggedIn) {
      alert("Please login to save posts!");
      return;
    }
    
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  // Professional posts data
  const allPosts = [
    {
      id: 1,
      author: "Sarah Chen",
      role: "Senior Software Engineer @ TechCorp",
      avatar: "👩‍💻",
      timestamp: "2 hours ago",
      content: "Excited to announce that our team just launched a revolutionary AI-powered code review tool! After 8 months of development, we're helping developers catch bugs 40% faster. Looking for beta testers - DM me if interested! 🚀",
      likes: 342,
      comments: 45,
      type: "project",
      tags: ["AI", "DevTools", "Innovation"],
      category: "tech"
    },
    {
      id: 2,
      author: "Marcus Johnson",
      role: "Data Science Lead @ Analytics Pro",
      avatar: "👨‍🔬",
      timestamp: "5 hours ago",
      content: "Just published our quarterly insights report on consumer behavior trends. Key finding: 73% shift towards sustainable products in Q4. Our ML models predicted this trend 6 months ago. Data never lies! 📊 Full report in comments.",
      likes: 567,
      comments: 89,
      type: "insight",
      tags: ["DataScience", "ML", "Analytics"],
      category: "tech"
    },
    {
      id: 3,
      author: "Emily Rodriguez",
      role: "UX Design Director @ CreativeFlow",
      avatar: "🎨",
      timestamp: "1 day ago",
      content: "Thrilled to share that our redesign of the HealthTrack app won the UX Design Excellence Award! Our user research showed 92% improvement in task completion rates. Grateful to my amazing team who made this possible. 🏆",
      likes: 891,
      comments: 123,
      type: "achievement",
      tags: ["UXDesign", "Awards", "Healthcare"],
      category: "design"
    },
    {
      id: 4,
      author: "David Park",
      role: "Product Manager @ InnovateLabs",
      avatar: "📱",
      timestamp: "3 hours ago",
      content: "Launching our new collaborative workspace platform next month! We've integrated real-time sync, AI meeting notes, and seamless video conferencing. Beta signups are now open. Let's revolutionize remote work together! 💼",
      likes: 445,
      comments: 67,
      type: "project",
      tags: ["ProductLaunch", "RemoteWork", "SaaS"],
      category: "business"
    },
    {
      id: 5,
      author: "Lisa Thompson",
      role: "Digital Marketing Strategist @ GrowthHub",
      avatar: "📈",
      timestamp: "6 hours ago",
      content: "Case study alert! 📣 Our latest campaign achieved 340% ROI using a multi-channel approach. Key strategies: personalized email sequences, targeted social ads, and influencer partnerships. Happy to share our playbook with fellow marketers!",
      likes: 723,
      comments: 156,
      type: "insight",
      tags: ["Marketing", "ROI", "CaseStudy"],
      category: "business"
    },
    {
      id: 6,
      author: "Dr. Alex Kumar",
      role: "AI Research Scientist @ DeepMind Labs",
      avatar: "🤖",
      timestamp: "4 hours ago",
      content: "Our paper on transformer efficiency just got accepted to NeurIPS 2025! We achieved 60% faster inference with minimal accuracy loss. This could change how we deploy large language models. Preprint available now! 🧠",
      likes: 1234,
      comments: 234,
      type: "achievement",
      tags: ["AI", "Research", "NeurIPS"],
      category: "tech"
    },
    {
      id: 7,
      author: "Rachel Foster",
      role: "Cybersecurity Lead @ SecureNet",
      avatar: "🔒",
      timestamp: "8 hours ago",
      content: "PSA: We detected a new phishing campaign targeting tech companies. Sharing our threat intelligence report to help the community stay protected. Remember: always verify sender authenticity and use MFA! Stay safe out there. 🛡️",
      likes: 891,
      comments: 145,
      type: "insight",
      tags: ["Cybersecurity", "ThreatIntel", "InfoSec"],
      category: "tech"
    },
    {
      id: 8,
      author: "James Mitchell",
      role: "Business Analyst @ ConsultCo",
      avatar: "💼",
      timestamp: "12 hours ago",
      content: "Just wrapped up a 6-month digital transformation project for a Fortune 500 client. Results: 45% process efficiency gain, $2M cost savings, and happier employees. Proud of what we accomplished! 📊",
      likes: 534,
      comments: 78,
      type: "project",
      tags: ["BusinessAnalysis", "Transformation", "Consulting"],
      category: "business"
    },
    {
      id: 9,
      author: "Nina Patel",
      role: "DevOps Engineer @ CloudScale",
      avatar: "⚙️",
      timestamp: "10 hours ago",
      content: "Excited to open source our Kubernetes auto-scaling framework! We've been using it internally for 2 years and it's saved us thousands in cloud costs. GitHub link in comments. Contributions welcome! 🌐",
      likes: 678,
      comments: 92,
      type: "project",
      tags: ["DevOps", "Kubernetes", "OpenSource"],
      category: "tech"
    },
    {
      id: 10,
      author: "Tom Richards",
      role: "Blockchain Developer @ CryptoVentures",
      avatar: "⛓️",
      timestamp: "1 day ago",
      content: "Our DeFi protocol just crossed $100M in total value locked! 🎉 Building in Web3 is challenging but rewarding. Massive thanks to our community for the trust. Next milestone: cross-chain compatibility. LFG! 🚀",
      likes: 1567,
      comments: 289,
      type: "achievement",
      tags: ["Blockchain", "DeFi", "Web3"],
      category: "tech"
    },
    {
      id: 11,
      author: "Sophie Martinez",
      role: "Graphic Designer @ PixelPerfect Studio",
      avatar: "🖌️",
      timestamp: "7 hours ago",
      content: "Creating brand identity for sustainable fashion startups has been incredibly fulfilling. Just completed my 10th project this year! Every logo tells a story. Sharing some of my favorite concepts - what do you think? 🎨",
      likes: 945,
      comments: 112,
      type: "project",
      tags: ["GraphicDesign", "Branding", "Sustainability"],
      category: "design"
    },
    {
      id: 12,
      author: "Dr. Jennifer Lee",
      role: "Healthcare Innovation Lead @ MedTech Solutions",
      avatar: "🏥",
      timestamp: "9 hours ago",
      content: "Proud to announce our telemedicine platform now serves 50,000+ patients! We're making healthcare more accessible, especially in rural areas. Our AI triage system reduces wait times by 60%. Healthcare + tech = better outcomes! 💙",
      likes: 1123,
      comments: 187,
      type: "achievement",
      tags: ["HealthTech", "Telemedicine", "Innovation"],
      category: "healthcare"
    }
  ];

  // Filter posts based on search and category
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === "all" || post.category === filterCategory;
    const matchesView = viewMode === "all" || (viewMode === "saved" && savedPosts.has(post.id));
    return matchesSearch && matchesCategory && matchesView;
  });

  useEffect(() => {
    setPosts(filteredPosts);
  }, [searchQuery, filterCategory, viewMode, savedPosts]);

  return (
    <div>
      {/* Notification Toast */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#667eea',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 2000,
          animation: 'slideIn 0.3s ease'
        }}>
          {notification}
        </div>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: #f3f2ef;
        }

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

        .nav-links button.active {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .auth-button {
          background: linear-gradient(135deg, #ef4444, #dc2626);
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
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
        }

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

        .search-filter-section {
          max-width: 752px;
          margin: -2rem auto 2rem;
          padding: 0 2rem;
          position: relative;
          z-index: 10;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .search-filter-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          width: 100%;
          max-width: 752px;
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

        .view-toggle {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .toggle-btn {
          padding: 0.7rem 1.3rem;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .toggle-btn:hover {
          border-color: #667eea;
        }

        .toggle-btn.active {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-color: transparent;
        }

        .main-content {
          max-width: 752px;
          margin: 2rem auto;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          width: 100%;
        }

        .section-header h2 {
          font-size: 2rem;
          color: #1f2937;
        }

        .results-count {
          color: #6b7280;
          font-size: 1rem;
          font-weight: 500;
          width: 100%;
          text-align: left;
        }

        .posts-feed {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-top: 2rem;
          width: 100%;
        }

        .post-card {
          background: white;
          border-radius: 8px;
          padding: 0;
          border: 1px solid #e0e0e0;
          box-shadow: 0 0 0 1px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.08);
          transition: box-shadow 0.2s ease;
          margin-bottom: 8px;
        }

        .post-card:hover {
          box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 8px rgba(0,0,0,.2);
        }

        .post-header {
          display: flex;
          padding: 12px 16px 8px;
          align-items: flex-start;
          position: relative;
        }

        .author-avatar {
          font-size: 2rem;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e9ecef;
          border-radius: 50%;
          flex-shrink: 0;
          margin-right: 8px;
          border: 2px solid #fff;
          box-shadow: 0 0 0 1px rgba(0,0,0,.1);
        }

        .author-info {
          flex: 1;
          min-width: 0;
        }

        .author-name-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 2px;
        }

        .author-name {
          font-size: 14px;
          font-weight: 600;
          color: rgba(0,0,0,.9);
          line-height: 1.5;
          text-decoration: none;
        }

        .author-name:hover {
          color: #0a66c2;
          text-decoration: underline;
        }

        .author-role {
          font-size: 14px;
          color: rgba(0,0,0,.6);
          line-height: 1.5;
          font-weight: 400;
        }

        .post-timestamp-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 2px;
        }

        .post-timestamp {
          font-size: 12px;
          color: rgba(0,0,0,.6);
          line-height: 1.33;
        }

        .post-type-badge {
          padding: 2px 8px;
          border-radius: 16px;
          font-size: 11px;
          font-weight: 600;
          display: inline-block;
          white-space: nowrap;
          line-height: 1.33;
        }

        .post-type-badge.project {
          background: #057642;
          color: white;
        }

        .post-type-badge.achievement {
          background: #e67e22;
          color: white;
        }

        .post-type-badge.insight {
          background: #0a66c2;
          color: white;
        }

        .post-menu-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          color: rgba(0,0,0,.6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          transition: background-color 0.2s ease;
          width: 32px;
          height: 32px;
        }

        .post-menu-btn:hover {
          background-color: rgba(0,0,0,.05);
          color: rgba(0,0,0,.9);
        }

        .post-content {
          color: rgba(0,0,0,.9);
          font-size: 14px;
          line-height: 1.5;
          margin: 8px 16px;
          padding: 0;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .post-tags {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
          margin: 8px 16px;
          padding: 0;
        }

        .tag {
          background: #f3f2ef;
          color: #0a66c2;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: background-color 0.2s ease;
        }

        .tag:hover {
          background: #e7f3ff;
          text-decoration: underline;
        }

        .post-stats {
          padding: 8px 16px;
          border-top: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: rgba(0,0,0,.6);
          min-height: 32px;
        }

        .post-stats-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .post-stats-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .post-actions {
          display: flex;
          padding: 0;
          border-top: 1px solid #e0e0e0;
        }

        .action-btn {
          flex: 1;
          background: none;
          border: none;
          padding: 8px 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: rgba(0,0,0,.6);
          border-radius: 0;
          position: relative;
        }

        .action-btn:first-child {
          border-radius: 0 0 0 8px;
        }

        .action-btn:last-child {
          border-radius: 0 0 8px 0;
        }

        .action-btn:hover {
          background-color: rgba(0,0,0,.05);
          color: rgba(0,0,0,.9);
        }

        .action-btn.liked {
          color: #0a66c2;
        }

        .action-btn.liked:hover {
          background-color: #e7f3ff;
          color: #0a66c2;
        }

        .action-btn.saved {
          color: #0a66c2;
        }

        .action-btn.saved:hover {
          background-color: #e7f3ff;
          color: #0a66c2;
        }

        .action-btn-icon {
          font-size: 20px;
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

        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

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

          .main-content {
            padding: 0 1rem;
          }

          .post-header {
            padding: 10px 12px 6px;
          }

          .author-avatar {
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
            margin-right: 8px;
          }

          .post-content {
            margin: 8px 12px;
            font-size: 14px;
          }

          .post-tags {
            margin: 8px 12px;
          }

          .post-stats {
            padding: 6px 12px;
            font-size: 12px;
          }

          .post-actions {
            flex-wrap: wrap;
          }

          .action-btn {
            flex: 1 1 calc(50% - 1px);
            min-width: 0;
            padding: 6px 8px;
            font-size: 12px;
          }

          .action-btn-icon {
            font-size: 18px;
          }

          .action-btn:nth-child(odd) {
            border-right: 1px solid #e0e0e0;
          }
        }
      `}</style>

      <nav className="top-nav">
        <div className="nav-container">
          <div className="nav-brand">🚀 Wayvian</div>
          <ul className="nav-links">
            <li><NavButton active={false} onClick={() => navigate("/dashboard")}>Dashboard</NavButton></li>
            <li><NavButton active={true} onClick={() => showNotification("You're already on the Network page!")}>Network</NavButton></li>
            <li><NavButton active={false} onClick={() => navigate("/careerchat")}>My Plan</NavButton></li>
            <li><NavButton active={false} onClick={() => navigate("/settings")}>Settings</NavButton></li>
            <li>
              <button 
                onClick={toggleAuth}
                className="auth-button"
              >
                👋 Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <section className="hero">
        <canvas ref={canvasRef} className="hero-canvas"></canvas>
        <div className="hero-content">
          <h1>Professional Network</h1>
          <p>Stay connected with industry leaders and trending projects</p>
        </div>
      </section>

      <div className="search-filter-section">
        <div className="search-filter-card fade-in">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search posts, people, or tags..."
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

      <main className="main-content fade-in">
        <div className="section-header">
          <h2>📰 Network Feed</h2>
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'all' ? 'active' : ''}`}
              onClick={() => setViewMode('all')}
            >
              All Posts
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'saved' ? 'active' : ''}`}
              onClick={() => setViewMode('saved')}
            >
              🔖 Saved ({savedPosts.size})
            </button>
          </div>
        </div>

        <div className="results-count" style={{marginBottom: '1.5rem'}}>
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
        </div>

        {posts.length > 0 ? (
          <div className="posts-feed">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="author-avatar">{post.avatar}</div>
                  <div className="author-info">
                    <div className="author-name-row">
                      <div className="author-name">{post.author}</div>
                      <span className={`post-type-badge ${post.type}`}>
                        {post.type === 'project' && '🚀'}
                        {post.type === 'achievement' && '🏆'}
                        {post.type === 'insight' && '💡'}
                      </span>
                    </div>
                    <div className="author-role">{post.role}</div>
                    <div className="post-timestamp-row">
                      <span className="post-timestamp">{post.timestamp}</span>
                    </div>
                  </div>
                  <button className="post-menu-btn" title="More actions">
                    ⋯
                  </button>
                </div>
                
                <div className="post-content">{post.content}</div>
                
                {post.tags.length > 0 && (
                  <div className="post-tags">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="tag">#{tag}</span>
                    ))}
                  </div>
                )}
                
                <div className="post-stats">
                  <div className="post-stats-left">
                    {post.likes > 0 && (
                      <span>
                        {likedPosts.has(post.id) ? '👍' : '👍'} {post.likes}
                        {post.comments > 0 && ` • ${post.comments} comments`}
                      </span>
                    )}
                    {post.likes === 0 && post.comments === 0 && (
                      <span>Be the first to react</span>
                    )}
                  </div>
                  <div className="post-stats-right">
                    {savedPosts.has(post.id) && <span>🔖</span>}
                  </div>
                </div>
                
                <div className="post-actions">
                  <button 
                    className={`action-btn ${likedPosts.has(post.id) ? 'liked' : ''}`}
                    onClick={() => toggleLikePost(post.id)}
                  >
                    <span className="action-btn-icon">👍</span>
                    <span>{likedPosts.has(post.id) ? 'Liked' : 'Like'}</span>
                  </button>
                  <button 
                    className="action-btn"
                    onClick={() => {}}
                  >
                    <span className="action-btn-icon">💬</span>
                    <span>Comment</span>
                  </button>
                  <button 
                    className="action-btn"
                    onClick={() => {}}
                  >
                    <span className="action-btn-icon">🔄</span>
                    <span>Repost</span>
                  </button>
                  <button 
                    className={`action-btn ${savedPosts.has(post.id) ? 'saved' : ''}`}
                    onClick={() => toggleSavePost(post.id)}
                  >
                    <span className="action-btn-icon">
                      {savedPosts.has(post.id) ? '🔖' : '📤'}
                    </span>
                    <span>{savedPosts.has(post.id) ? 'Saved' : 'Send'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No posts found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      <footer>
        <p>© 2025 Wayvian — Empowering Your Career Journey</p>
      </footer>
    </div>
  );
}