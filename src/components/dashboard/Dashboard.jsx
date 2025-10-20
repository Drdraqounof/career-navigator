import React, { useState } from "react";
import "./dash.css";
import CareerChat from "../../CareerChat";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("student");
  const [showCareerChat, setShowCareerChat] = useState(false);
  const [overallProgress] = useState(45);

  const handleExploreClick = (e) => {
    e.preventDefault();
    navigate("/net");
  };

  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

  const showMyPlan = () => setShowCareerChat(true);
  const closeCareerChat = () => setShowCareerChat(false);

  const showSettings = () => console.log("Settings clicked");
  const editProfile = () => console.log("Edit Profile clicked");
  const viewProgress = () => console.log("View Progress clicked");
  const exportData = () => console.log("Export Data clicked");
  const logoutUser = () => console.log("Logging out...");

  const selectUserType = (type) => setSelectedUserType(type);
  const openModal = (title, body) => {
    setModalTitle(title);
    setModalBody(body);
    setModalVisible(true);
  };
  const closeModal = () => setModalVisible(false);

  const userTypes = [
    {
      key: "student",
      label: "High School Student",
      icon: "🎓",
      description:
        "Planning your college path and exploring future career options",
    },
    {
      key: "graduate",
      label: "Recent Graduate",
      icon: "👨‍🎓",
      description: "Ready to enter the job market with your new degree",
    },
    {
      key: "changer",
      label: "Career Changer",
      icon: "🔄",
      description: "Looking to transition to a new field or industry",
    },
    {
      key: "professional",
      label: "Working Professional",
      icon: "💼",
      description: "Advancing your career and developing new skills",
    },
  ];

  return (
    <div>
      {/* ===== TOP NAV ===== */}
      <header className="top-nav">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="logo">🚀 Find Me Career Navigator</div>
          <ul className="nav-links">
            <li><button onClick={(e) => e.preventDefault()}>Dashboard</button></li>
            <li><button onClick={handleExploreClick}>Explore</button></li>
            <li><button onClick={showMyPlan}>My Plan</button></li>
            <li><button onClick={showSettings}>Settings</button></li>
            <li>
              <div className="user-profile" onClick={toggleUserMenu}>
                <span id="userIcon">👤</span>
                <span id="userName">John Doe</span>
                {userMenuOpen && (
                  <div className="user-menu" id="userMenu">
                    <button onClick={editProfile}>Edit Profile</button>
                    <button onClick={viewProgress}>View Progress</button>
                    <button onClick={exportData}>Export Data</button>
                    <button onClick={logoutUser} className="auth-btn auth-btn-logout">Logout</button>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </header>

      {/* ===== HERO / WELCOME ===== */}
      <section className="hero fade-in visible">
        <h1>Welcome to Your Career Journey</h1>
        <p>Choose your profile to get personalized guidance and actionable next steps.</p>
        <button className="cta-button" onClick={handleExploreClick}>Explore Careers</button>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <main className="main-content">
        <section className="overall-progress fade-in visible">
          <h2>📈 Your Overall Career Progress</h2>
          <p>You’re currently {overallProgress}% through your roadmap!</p>
          <div className="progress-bar" style={{ background: "#e0e0e0", borderRadius: "12px", overflow: "hidden", height: "20px", margin: "1rem 0" }}>
            <div className="progress-fill" style={{ width: `${overallProgress}%`, background: "#667eea", height: "100%" }}></div>
          </div>
        </section>

        <section className="user-type-selector fade-in visible">
          {userTypes.map((type) => (
            <button
              key={type.key}
              className="group-card"
              onClick={() => selectUserType(type.key)}
              style={{
                border: selectedUserType === type.key ? "2px solid #667eea" : "1px solid #ccc",
              }}
            >
              <div className="icon" style={{ fontSize: "2rem" }}>{type.icon}</div>
              <h3>{type.label}</h3>
              <p>{type.description}</p>
            </button>
          ))}
        </section>

        {selectedUserType === "student" && (
          <section className="dashboard-content fade-in visible">
            <div className="group-card">
              <h3>🎯 Career Exploration Progress</h3>
              <p>You’ve explored <strong>3</strong> out of 10 recommended career paths.</p>
              <div className="progress-bar" style={{ background: "#e0e0e0", borderRadius: "12px", overflow: "hidden", height: "16px", margin: "1rem 0" }}>
                <div className="progress-fill" style={{ width: "30%", background: "#667eea", height: "100%" }}></div>
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
                <div className="stat-item" onClick={() => openModal("Careers Saved", "Details about careers saved")}>
                  <strong>5</strong> Careers Saved
                </div>
                <div className="stat-item" onClick={() => openModal("Skills Identified", "Details about skills identified")}>
                  <strong>12</strong> Skills Identified
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ===== CAREER CHAT MODAL ===== */}
      {showCareerChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeCareerChat}>
          <div className="group-card" style={{ maxWidth: "800px", width: "100%" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeCareerChat} style={{ float: "right", fontSize: "1.2rem", background: "none", border: "none" }}>✖</button>
            <CareerChat />
          </div>
        </div>
      )}

      {/* ===== INFO MODAL ===== */}
      {modalVisible && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modalTitle}</h2>
              <button className="close" onClick={closeModal}>&times;</button>
            </div>
            <div>{modalBody}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
