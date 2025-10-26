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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("student");
  const [showCareerChat, setShowCareerChat] = useState(false);
  const [overallProgress] = useState(45);
  const [notification, setNotification] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);

  // Close modals on Escape key
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setShowCareerChat(false);
        setModalVisible(false);
      }
    }
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Navigation handlers
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleDashboardClick = () => {
    showNotification("Already on Dashboard");
  };

  const handleExploreClick = () => {
    navigate("/net");
  };

  const handleMyPlanClick = () => {
    navigate("/careerchat");
  };

  const showSettings = () => {
    showNotification("Opening Settings...");
  };

  const toggleAuth = () => {
    setLoggedIn(!loggedIn);
    showNotification(loggedIn ? "Logged out successfully" : "Logged in successfully");
  };

  const selectUserType = (type) => {
    setSelectedUserType(type);
    showNotification(`Switched to ${userTypes.find(t => t.key === type)?.label} mode`);
  };

  const closeModal = () => setModalVisible(false);
  const closeCareerChat = () => setShowCareerChat(false);

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

      {/* TOP NAV - Updated to match Network Page */}
      <nav style={{
        width: '100%',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🚀 Wayvian
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <NavButton onClick={handleDashboardClick}>Dashboard</NavButton>
            <NavButton onClick={handleExploreClick}>Explore</NavButton>
            <NavButton onClick={handleMyPlanClick}>My Plan</NavButton>
            <NavButton onClick={showSettings}>Settings</NavButton>
            <button 
              onClick={toggleAuth}
              style={{
                background: loggedIn 
                  ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
                  : 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                padding: '0.6rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginLeft: '1rem',
                fontSize: '0.95rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {loggedIn ? '👋 Logout' : '🔐 Login'}
            </button>
          </div>
        </div>
      </nav>

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
function NavButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        padding: '0.6rem 1.2rem',
        borderRadius: '8px',
        color: '#4b5563',
        fontSize: '0.95rem'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        e.currentTarget.style.color = 'white';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'none';
        e.currentTarget.style.color = '#4b5563';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </button>
  );
}