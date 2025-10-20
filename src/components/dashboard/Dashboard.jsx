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
  const [overallProgress] = useState(45); // 👈 overall progress value

  // ===== Navigation =====
  const handleExploreClick = (e) => {
    e.preventDefault();
    navigate("/net");
  };

  // ===== User menu =====
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

  // ===== Chat modal control =====
  const showMyPlan = () => setShowCareerChat(true);
  const closeCareerChat = () => setShowCareerChat(false);

  // ===== User actions =====
  const showSettings = () => alert("Settings clicked");
  const editProfile = () => alert("Edit Profile clicked");
  const viewProgress = () => alert("View Progress clicked");
  const exportData = () => alert("Export Data clicked");
  const logoutUser = () => alert("Logging out...");

  // ===== User type selection =====
  const selectUserType = (type) => setSelectedUserType(type);

  // ===== Modal control =====
  const openModal = (title, body) => {
    setModalTitle(title);
    setModalBody(body);
    setModalVisible(true);
  };
  const closeModal = () => setModalVisible(false);

  return (
    <div>
      {/* ===== HEADER ===== */}
      <header>
        <nav className="container">
          <div className="logo">🚀 Find Me Career Navigator</div>
          <ul className="nav-links">
            <li><a href="#" onClick={(e) => e.preventDefault()}>Dashboard</a></li>
            <li><a href="#" onClick={handleExploreClick}>Explore</a></li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); showMyPlan(); }}>
                My Plan
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); showSettings(); }}>
                Settings
              </a>
            </li>
            <li>
              <div className="user-profile" onClick={toggleUserMenu}>
                <span id="userIcon">👤</span>
                <span id="userName">John Doe</span>

                {userMenuOpen && (
                  <div className="user-menu" id="userMenu">
                    <button onClick={editProfile}>Edit Profile</button>
                    <button onClick={viewProgress}>View Progress</button>
                    <button onClick={exportData}>Export Data</button>
                    <button onClick={logoutUser} style={{ color: "red" }}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="main-content">
        <div className="container">
          {/* ===== MY PLAN CHAT MODAL ===== */}
          {showCareerChat && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full relative">
                <button
                  onClick={closeCareerChat}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  ✖
                </button>
                <CareerChat />
              </div>
            </div>
          )}

          {/* ===== WELCOME SECTION ===== */}
          <section className="welcome-section fade-in">
            <h1>Welcome to Your Career Journey</h1>
            <p>
              Choose your profile to get personalized career guidance, tailored
              resources, and actionable next steps for your unique situation.
            </p>
          </section>

          {/* ===== OVERALL PROGRESS BAR ===== */}
          <section className="overall-progress fade-in">
            <h2>📈 Your Overall Career Progress</h2>
            <p>You’re currently {overallProgress}% through your roadmap!</p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </section>

          {/* ===== USER TYPE SELECTION ===== */}
          <section className="user-type-selector fade-in">
            {["student", "graduate", "changer", "professional"].map((type) => (
              <div
                key={type}
                className="user-type-card"
                onClick={() => selectUserType(type)}
                style={{
                  border:
                    selectedUserType === type
                      ? "2px solid #667eea"
                      : "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                <div className="icon">
                  {{
                    student: "🎓",
                    graduate: "👨‍🎓",
                    changer: "🔄",
                    professional: "💼",
                  }[type]}
                </div>
                <h3>
                  {{
                    student: "High School Student",
                    graduate: "Recent Graduate",
                    changer: "Career Changer",
                    professional: "Working Professional",
                  }[type]}
                </h3>
                <p>
                  {{
                    student:
                      "Planning your college path and exploring future career options",
                    graduate:
                      "Ready to enter the job market with your new degree",
                    changer:
                      "Looking to transition to a new field or industry",
                    professional:
                      "Advancing your career and developing new skills",
                  }[type]}
                </p>
              </div>
            ))}
          </section>

          {/* ===== STUDENT DASHBOARD CONTENT ===== */}
          {selectedUserType === "student" && (
            <section className="dashboard-content">
              <div className="dashboard-grid">
                <div className="dashboard-card fade-in">
                  <div className="card-header">
                    <span className="icon">🎯</span>
                    <h3>Career Exploration Progress</h3>
                  </div>

                  <p>
                    You’ve explored <strong>3</strong> out of 10 recommended
                    career paths.
                  </p>

                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "30%" }}></div>
                  </div>

                  <div className="stats-grid">
                    <div
                      className="stat-item"
                      onClick={() =>
                        openModal("Careers Saved", "Details about careers saved")
                      }
                    >
                      <span className="stat-number">5</span>
                      <span className="stat-label">Careers Saved</span>
                    </div>
                    <div
                      className="stat-item"
                      onClick={() =>
                        openModal(
                          "Skills Identified",
                          "Details about skills identified"
                        )
                      }
                    >
                      <span className="stat-number">12</span>
                      <span className="stat-label">Skills Identified</span>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button
                      className="btn btn-primary"
                      onClick={handleExploreClick}
                    >
                      Explore More Careers
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => alert("Take Assessment clicked")}
                    >
                      Take Assessment
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* ===== INFO MODAL ===== */}
      {modalVisible && (
        <div id="featureModal" className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modalTitle}</h2>
              <span className="close" onClick={closeModal}>
                &times;
              </span>
            </div>
            <div>{modalBody}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

