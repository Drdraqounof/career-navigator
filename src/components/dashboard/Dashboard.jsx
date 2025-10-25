import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


// DashboardCard Component

function DashboardCard({ title, progressText, careersSaved, skillsIdentified, progressPercent, actionLabel, onAction }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '28px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'default'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
    }}>
      <h3 style={{ marginBottom: '16px', fontSize: '1.3rem', fontWeight: '600', color: '#2d3748' }}>{title}</h3>
      <p style={{ marginBottom: '20px', color: '#718096', lineHeight: '1.6' }}>{progressText}</p>
      
      <div style={{ display: 'flex', gap: '32px', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea', marginBottom: '4px' }}>{careersSaved}</div>
          <div style={{ fontSize: '0.875rem', color: '#718096' }}>Careers Saved</div>
        </div>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#764ba2', marginBottom: '4px' }}>{skillsIdentified}</div>
          <div style={{ fontSize: '0.875rem', color: '#718096' }}>Skills Identified</div>
        </div>
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.875rem', color: '#718096' }}>Progress</span>
          <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#667eea' }}>{progressPercent}%</span>
        </div>
        <div style={{ 
          width: '100%', 
          height: '10px', 
          background: '#e2e8f0', 
          borderRadius: '5px', 
          overflow: 'hidden' 
        }}>
          <div style={{ 
            width: `${progressPercent}%`, 
            height: '100%', 
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', 
            transition: 'width 0.6s ease',
            borderRadius: '5px'
          }}></div>
        </div>
      </div>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

// CareerChat Component
function CareerChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your career planning assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, 
      { role: 'user', content: input },
      { role: 'assistant', content: 'I\'m here to help you with career guidance, skill development, and job market insights. (This is a demo - full AI integration would go here)' }
    ]);
    setInput('');
  };

  return (
    <div style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ marginBottom: '8px', fontSize: '1.5rem', fontWeight: '600' }}>💬 Career Planning Assistant</h2>
      <p style={{ color: '#718096', marginBottom: '20px' }}>Ask me anything about your career path, skills development, or job market insights.</p>
      
      <div style={{ 
        flex: 1,
        background: '#f7fafc', 
        borderRadius: '12px', 
        padding: '20px', 
        marginBottom: '16px',
        overflowY: 'auto',
        minHeight: '300px',
        maxHeight: '400px'
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            marginBottom: '16px',
            padding: '12px 16px',
            borderRadius: '8px',
            background: msg.role === 'user' ? '#667eea' : 'white',
            color: msg.role === 'user' ? 'white' : '#2d3748',
            maxWidth: '80%',
            marginLeft: msg.role === 'user' ? 'auto' : '0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {msg.content}
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your question here..."
          style={{
            flex: 1,
            padding: '14px',
            borderRadius: '10px',
            border: '2px solid #e2e8f0',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        />
        <button
          onClick={handleSend}
          style={{
            padding: '14px 28px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("student");
  const [showCareerChat, setShowCareerChat] = useState(false);
  const [overallProgress] = useState(45);
  const [notification, setNotification] = useState(null);
  
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [userMenuOpen]);

  // Close modals on Escape key
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setShowCareerChat(false);
        setModalVisible(false);
        setUserMenuOpen(false);
      }
    }
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Navigation handlers - These would use useNavigate() in your actual app
const handleExploreClick = (e) => {
  e.preventDefault();
  navigate("/net");
};

  const handleDashboardClick = (e) => {
    e.preventDefault();
    // In your actual app: navigate("/dashboard");
    showNotification("Already on Dashboard");
  };

    const handleMyPlanClick = (e) => {
    e.preventDefault();
    navigate("/careerchat");
  };
  
  const showSettings = () => {
    // In your actual app: navigate("/settings");
    showNotification("Opening Settings...");
  };

  const editProfile = () => {
    // In your actual app: navigate("/profile/edit");
    showNotification("Opening Profile Editor...");
    setUserMenuOpen(false);
  };

  const viewProgress = () => {
    // In your actual app: navigate("/progress");
    showNotification("Loading Progress Report...");
    setUserMenuOpen(false);
  };

  const exportData = () => {
    // In your actual app: trigger data export API call
    showNotification("Exporting your data...");
    setUserMenuOpen(false);
  };

  const logoutUser = () => {
    // In your actual app: clear auth state and navigate("/login");
    showNotification("Logging out...");
    setUserMenuOpen(false);
  };

  const selectUserType = (type) => {
    setSelectedUserType(type);
    showNotification(`Switched to ${userTypes.find(t => t.key === type)?.label} mode`);
  };

  const openModal = (title, body) => {
    setModalTitle(title);
    setModalBody(body);
    setModalVisible(true);
  };

  const toggleUserMenu = () => {
  setUserMenuOpen((prev) => !prev);
};

  const closeModal = () => setModalVisible(false);

  const userTypes = [
    { key: "student", label: "High School Student", icon: "🎓", description: "Planning your college path and exploring future career options" },
    { key: "graduate", label: "Recent Graduate", icon: "👨‍🎓", description: "Ready to enter the job market with your new degree" },
    { key: "changer", label: "Career Changer", icon: "🔄", description: "Looking to transition to a new field or industry" },
    { key: "professional", label: "Working Professional", icon: "💼", description: "Advancing your career and developing new skills" },
  ];

  const dashboardData = [
    {
      title: "🎯 Career Exploration Progress",
      progressText: "You've explored 3 out of 10 recommended career paths.",
      careersSaved: 5,
      skillsIdentified: 12,
      progressPercent: 30,
      actionLabel: "Explore More Careers",
      onAction: handleExploreClick
    },
    {
      title: "📚 Skill Development Journey",
      progressText: "You've completed 2 out of 8 recommended courses.",
      careersSaved: 8,
      skillsIdentified: 15,
      progressPercent: 25,
      actionLabel: "Continue Learning",
      onAction: () => showNotification("Loading Learning Dashboard...")
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f7fafc' }}>
      {/* Notification Toast */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#48bb78',
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

      {/* TOP NAV */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '18px 0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 24px',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
            🚀 <span>Wayvian Career Navigator</span>
          </div>
          <nav style={{ 
            display: 'flex', 
            gap: '8px',
            alignItems: 'center'
          }}>
            <NavButton onClick={handleDashboardClick} active={true}>Dashboard</NavButton>
            <NavButton onClick={handleExploreClick}>Explore</NavButton>
            <NavButton onClick={handleMyPlanClick}>My Plan</NavButton>
            <NavButton onClick={showSettings}>Settings</NavButton>
            
            
            <div ref={userMenuRef} style={{ position: 'relative', marginLeft: '12px' }}>
              <button 
                onClick={toggleUserMenu}
                aria-label="User menu"
                aria-expanded={userMenuOpen}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontWeight: '500',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              >
                <span style={{ fontSize: '1.2rem' }}>👤</span>
                <span>John Doe</span>
                <span style={{ fontSize: '0.7rem' }}>▼</span>
              </button>
              
              {userMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  minWidth: '200px',
                  overflow: 'hidden',
                  animation: 'fadeIn 0.2s ease'
                }}>
                  <DropdownButton onClick={editProfile}>✏️ Edit Profile</DropdownButton>
                  <DropdownButton onClick={viewProgress}>📊 View Progress</DropdownButton>
                  <DropdownButton onClick={exportData}>💾 Export Data</DropdownButton>
                  <DropdownButton onClick={logoutUser} danger={true}>🚪 Logout</DropdownButton>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
        {/* OVERALL PROGRESS */}
        <section style={{
          background: 'white',
          borderRadius: '16px',
          padding: '36px',
          marginBottom: '36px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ fontSize: '1.875rem', marginBottom: '12px', fontWeight: '600', color: '#2d3748' }}>
            📈 Your Overall Career Progress
          </h2>
          <p style={{ color: '#718096', marginBottom: '20px', fontSize: '1.05rem' }}>
            You're currently {overallProgress}% through your roadmap! Keep up the great work! 🎉
          </p>
          <div style={{
            width: '100%',
            height: '32px',
            background: '#e2e8f0',
            borderRadius: '16px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              width: `${overallProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              transition: 'width 0.8s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: '16px',
              color: 'white',
              fontSize: '0.95rem',
              fontWeight: '700',
              borderRadius: '16px'
            }}>
              {overallProgress}%
            </div>
          </div>
        </section>

        {/* USER TYPE SELECTION */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '36px'
        }}>
          {userTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => selectUserType(type.key)}
              aria-pressed={selectedUserType === type.key}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '28px',
                border: selectedUserType === type.key ? '3px solid #667eea' : '2px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center',
                boxShadow: selectedUserType === type.key ? '0 8px 20px rgba(102, 126, 234, 0.25)' : '0 2px 8px rgba(0,0,0,0.06)',
                transform: selectedUserType === type.key ? 'translateY(-4px) scale(1.02)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (selectedUserType !== type.key) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedUserType !== type.key) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                }
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{type.icon}</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', fontWeight: '600', color: '#2d3748' }}>
                {type.label}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#718096', margin: 0, lineHeight: '1.5' }}>
                {type.description}
              </p>
            </button>
          ))}
        </section>

        {/* DASHBOARD CARDS */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '24px'
        }}>
          {dashboardData.map((card, idx) => (
            <DashboardCard key={idx} {...card} />
          ))}
        </section>
      </main>

      {/* CAREER CHAT MODAL */}
      {showCareerChat && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="career-chat-title"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={closeCareerChat}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '16px',
              maxWidth: '900px',
              width: '90%',
              maxHeight: '85vh',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              animation: 'slideUp 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeCareerChat}
              aria-label="Close dialog"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#f7fafc',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                fontSize: '1.3rem',
                cursor: 'pointer',
                color: '#718096',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e2e8f0';
                e.currentTarget.style.color = '#2d3748';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f7fafc';
                e.currentTarget.style.color = '#718096';
              }}
            >
              ✖
            </button>
            <CareerChat />
          </div>
        </div>
      )}

      {/* INFO MODAL */}
      {modalVisible && (
        <div 
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '90%',
              padding: '32px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              animation: 'slideUp 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600', color: '#2d3748' }}>{modalTitle}</h2>
              <button 
                onClick={closeModal}
                aria-label="Close dialog"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#718096',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#2d3748'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#718096'}
              >
                ×
              </button>
            </div>
            <div style={{ color: '#4a5568', lineHeight: '1.6' }}>{modalBody}</div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// Reusable Navigation Button Component
function NavButton({ onClick, active, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? 'rgba(255,255,255,0.2)' : 'transparent',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        fontSize: '0.95rem',
        padding: '10px 16px',
        borderRadius: '8px',
        transition: 'background 0.2s',
        fontWeight: active ? '600' : '500'
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
      onMouseLeave={(e) => e.currentTarget.style.background = active ? 'rgba(255,255,255,0.2)' : 'transparent'}
    >
      {children}
    </button>
  );
}

// Reusable Dropdown Button Component
function DropdownButton({ onClick, children, danger }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '14px 20px',
        background: 'none',
        border: 'none',
        borderTop: danger ? '1px solid #e2e8f0' : 'none',
        textAlign: 'left',
        cursor: 'pointer',
        color: danger ? '#e53e3e' : '#2d3748',
        fontSize: '0.95rem',
        transition: 'background 0.2s',
        fontWeight: '500'
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = danger ? '#fff5f5' : '#f7fafc'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
    >
      {children}
    </button>
  );
}