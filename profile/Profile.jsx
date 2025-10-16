import React, { useEffect, useState, useMemo } from "react";
import "./profile.css"; // Keep your CSS

export default function ProfilePage() {
  // -------------------------------
  // 🔹 State
  // -------------------------------
  const [contentData, setContentData] = useState([]);
  const [currentTab, setCurrentTab] = useState("all");
  const [likedContent, setLikedContent] = useState(new Set(["react-hooks", "microservices"]));
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);

  // -------------------------------
  // 🔹 Load content on mount
  // -------------------------------
  useEffect(() => {
    setContentData([
      {
        id: "react-hooks",
        type: "code",
        title: "Custom React Hooks for API Calls",
        description:
          "A reusable custom hook for handling API requests with loading states, error handling, and caching.",
        content: `const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading };
};`,
        language: "JavaScript",
        likes: 45,
        comments: 12,
        shares: 8,
        timestamp: "2 hours ago",
        tags: ["React", "JavaScript", "Hooks"],
      },
      {
        id: "docker-tutorial",
        type: "video",
        title: "Docker Fundamentals: From Zero to Production",
        description:
          "Complete Docker tutorial covering containers, images, volumes, and deployment strategies.",
        thumbnail:
          "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=200&fit=crop",
        duration: "28:45",
        views: 1250,
        likes: 89,
        comments: 23,
        shares: 15,
        timestamp: "1 day ago",
        tags: ["Docker", "DevOps", "Tutorial"],
      },
      {
        id: "tech-meetup",
        type: "event",
        title: "Philadelphia Tech Meetup - November",
        description:
          "Monthly meetup for Philadelphia tech professionals featuring talks on AI, blockchain, and career development.",
        date: "2025-11-28",
        time: "6:00 PM",
        location: "WeWork Center City",
        attendees: 87,
        likes: 34,
        comments: 18,
        shares: 22,
        timestamp: "3 days ago",
        tags: ["Networking", "Philadelphia", "Tech"],
      },
      {
        id: "microservices",
        type: "article",
        title: "Building Scalable Microservices with Node.js",
        description:
          "Deep dive into microservices architecture, covering service discovery, API gateways, and data consistency patterns.",
        readTime: "12 min read",
        likes: 156,
        comments: 34,
        shares: 67,
        timestamp: "5 days ago",
        tags: ["Node.js", "Architecture", "Microservices"],
      },
      {
        id: "portfolio",
        type: "project",
        title: "Personal Portfolio Website Redesign",
        description:
          "Complete redesign using React, Next.js, and Tailwind CSS. Features dark mode, animations, and responsive design.",
        technologies: ["React", "Next.js", "Tailwind CSS"],
        likes: 78,
        comments: 19,
        shares: 25,
        timestamp: "1 week ago",
        tags: ["React", "Portfolio", "Web Design"],
      },
      {
        id: "python-automation",
        type: "code",
        title: "Python Script for Automated Data Processing",
        description:
          "Automated script for reading CSV files, cleaning data, and generating reports with visualizations.",
        content: `import pandas as pd

df = pd.read_csv("data.csv")
df = df.dropna()
stats = df.groupby("month").agg({
  "revenue": "sum",
  "users": "count"
})
print(stats)`,
        language: "Python",
        likes: 92,
        comments: 27,
        shares: 18,
        timestamp: "1 week ago",
        tags: ["Python", "Data Science"],
      },
    ]);
  }, []);

  // -------------------------------
  // 🔹 Filter logic
  // -------------------------------
  const filteredContent = useMemo(() => {
    let filtered = [...contentData];
    if (currentTab !== "all") filtered = filtered.filter((i) => i.type === currentTab);
    if (searchQuery)
      filtered = filtered.filter(
        (i) =>
          i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    return filtered;
  }, [contentData, currentTab, searchQuery]);

  // -------------------------------
  // 🔹 Notification system
  // -------------------------------
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 3000);
    return () => clearTimeout(timer);
  }, [notification]);

  const showNotification = (msg, type = "info") =>
    setNotification({ msg, type });

  // -------------------------------
  // 🔹 Like handler
  // -------------------------------
  const handleLike = (itemId) => {
    setContentData((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const liked = likedContent.has(itemId);
          const updatedLikes = liked ? item.likes - 1 : item.likes + 1;
          return { ...item, likes: updatedLikes };
        }
        return item;
      })
    );

    setLikedContent((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
        showNotification("Removed from liked content", "info");
      } else {
        newSet.add(itemId);
        showNotification("Liked!", "success");
      }
      return newSet;
    });
  };

  // -------------------------------
  // 🔹 Helpers for rendering cards
  // -------------------------------
  const typeIcons = { code: "💻", video: "🎥", event: "📅", article: "📝", project: "🚀" };

  const renderPreview = (item) => {
    switch (item.type) {
      case "code":
        return (
          <div className="code-preview">
            <div className="code-language">{item.language}</div>
            <pre>
              <code>{item.content.substring(0, 150)}...</code>
            </pre>
          </div>
        );
      case "video":
        return (
          <div className="video-preview">
            <img src={item.thumbnail} className="video-thumbnail" alt="Video" />
            <button className="play-button">▶</button>
            <div className="video-duration">{item.duration}</div>
          </div>
        );
      case "event":
        const date = new Date(item.date);
        const formatted = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        return (
          <div className="event-preview">
            <div className="event-date">{formatted}</div>
            <div className="event-time">{item.time}</div>
            <div className="event-location">📍 {item.location}</div>
          </div>
        );
      case "article":
        return (
          <div className="article-preview">
            <div>📖</div>
            <div>{item.readTime}</div>
          </div>
        );
      case "project":
        return (
          <div className="project-preview">
            <div>🚀</div>
            <div className="tech-list">
              {item.technologies.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // -------------------------------
  // 🔹 UI rendering
  // -------------------------------
  return (
    <div className="profile-page">
      <header>
        <nav className="container">
          <div className="logo">🚀 Find Me Career Navigator</div>
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ul className="nav-links">
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Explore</a></li>
            <li><a href="#">Network</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#" className="active">Profile</a></li>
          </ul>
        </nav>
      </header>

      <main className="main-content container">
        <aside className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">AS</div>
            <h2>Alex Smith</h2>
            <p className="profile-title">Senior Full Stack Developer</p>
            <p className="profile-bio">
              Passionate developer building innovative web applications. Love
              sharing knowledge and contributing to open source.
            </p>
            <button onClick={() => showNotification("Edit profile coming soon!")}>
              Edit Profile
            </button>
            <button onClick={() => showNotification("Profile link copied!")}>
              Share
            </button>
          </div>
        </aside>

        <div className="content-area">
          <div className="content-header">
            <h1>My Content</h1>
            <p>Share your knowledge, projects, and experiences with the community</p>
          </div>

          <div className="content-tabs">
            {["all", "code", "video", "event", "article", "project"].map((tab) => (
              <button
                key={tab}
                className={`tab-button ${currentTab === tab ? "active" : ""}`}
                onClick={() => setCurrentTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="content-grid">
            {filteredContent.length === 0 ? (
              <div className="empty-state">📝 No content yet</div>
            ) : (
              filteredContent.map((item) => (
                <div key={item.id} className="content-card fade-in">
                  <div className="content-header-bar">
                    <div className="content-type-icon">{typeIcons[item.type]}</div>
                    <div>
                      <h3>{item.title}</h3>
                      <div className="content-meta">
                        {item.timestamp} • {item.tags.join(", ")}
                      </div>
                    </div>
                  </div>

                  <div className="content-body">
                    {renderPreview(item)}
                    <p>{item.description}</p>
                    <div className="content-actions">
                      <button onClick={() => handleLike(item.id)}>
                        {likedContent.has(item.id) ? "❤️ Liked" : "🤍 Like"} ({item.likes})
                      </button>
                      <button onClick={() => showNotification("Comments coming soon!")}>
                        💬 Comment
                      </button>
                      <button onClick={() => showNotification("Link copied to clipboard!")}>
                        🔄 Share
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <button
        className="create-content-btn"
        onClick={() => showNotification("Create content coming soon!")}
      >
        +
      </button>

      {notification && (
        <div
          className={`notification ${notification.type}`}
          style={{
            position: "fixed",
            top: 100,
            right: 20,
            padding: "1rem 1.5rem",
            background:
              notification.type === "success" ? "#10b981" : "#667eea",
            color: "white",
            borderRadius: 8,
          }}
        >
          {notification.msg}
        </div>
      )}
    </div>
  );
}

