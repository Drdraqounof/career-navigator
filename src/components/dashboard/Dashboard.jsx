import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CareerChat from "../../CareerChat";
import FeatureChat from "../FeatureChat";
// User Type Configurations
export const userTypeConfigs = {
  student: {
    prompts: [
      "What subjects am I strongest in?",
      "Which colleges match my interests?",
      "What AP courses should I take?",
      "How do I prepare for SAT/ACT?",
      "What extracurriculars boost my profile?"
    ],
    features: [
      {
        title: "🎓 College Path Finder",
        description: "Discover colleges that match your interests, grades, and career goals",
        action: "Explore Colleges",
        progressText: "You've explored 3 out of 15 recommended colleges.",
        careersSaved: 8,
        skillsIdentified: 12,
        progressPercent: 20
      },
      {
        title: "📊 Academic Strength Analysis",
        description: "Identify your strongest subjects and how they align with future careers",
        action: "Analyze My Strengths",
        progressText: "Complete 2 more assessments to get full insights.",
        careersSaved: 5,
        skillsIdentified: 8,
        progressPercent: 60
      },
      {
        title: "🏆 Extracurricular Planner",
        description: "Build a profile that stands out to colleges and aligns with your goals",
        action: "Plan Activities",
        progressText: "You've added 4 out of 8 recommended activities.",
        careersSaved: 3,
        skillsIdentified: 10,
        progressPercent: 50
      }
    ],
    welcomeMessage: "Hey there! 🎓 I'm here to help you explore college options, discover your strengths, and plan your path to success. What would you like to know?"
  },
  graduate: {
    prompts: [
      "How do I write a strong resume?",
      "What entry-level jobs match my degree?",
      "How do I prepare for interviews?",
      "Should I get certifications?",
      "How do I negotiate my first salary?"
    ],
    features: [
      {
        title: "💼 Job Market Navigator",
        description: "Find entry-level positions that match your degree and interests",
        action: "Browse Jobs",
        progressText: "You've reviewed 12 out of 50 matching job postings.",
        careersSaved: 15,
        skillsIdentified: 18,
        progressPercent: 24
      },
      {
        title: "📝 Resume & Portfolio Builder",
        description: "Create professional materials that get you noticed by recruiters",
        action: "Build Resume",
        progressText: "Your resume is 80% complete. Add 2 more experiences.",
        careersSaved: 8,
        skillsIdentified: 14,
        progressPercent: 80
      },
      {
        title: "🎯 Interview Prep Coach",
        description: "Practice common interview questions and perfect your pitch",
        action: "Start Practicing",
        progressText: "You've completed 5 out of 20 practice interviews.",
        careersSaved: 6,
        skillsIdentified: 11,
        progressPercent: 25
      }
    ],
    welcomeMessage: "Congratulations on graduating! 🎉 I'm here to help you land your first job, polish your resume, and ace those interviews. What can I help with today?"
  },
  changer: {
    prompts: [
      "What skills transfer to my new field?",
      "How do I rebrand my experience?",
      "What certifications do I need?",
      "How do I explain my career change?",
      "What's the best entry strategy?"
    ],
    features: [
      {
        title: "🔄 Skills Translation Tool",
        description: "Map your current skills to opportunities in your target industry",
        action: "Translate My Skills",
        progressText: "You've identified 12 transferable skills across 3 industries.",
        careersSaved: 10,
        skillsIdentified: 22,
        progressPercent: 55
      },
      {
        title: "🎓 Upskilling Roadmap",
        description: "Get a personalized learning path to bridge skill gaps",
        action: "View Roadmap",
        progressText: "You're halfway through your transition roadmap!",
        careersSaved: 7,
        skillsIdentified: 16,
        progressPercent: 50
      },
      {
        title: "💡 Career Pivot Strategy",
        description: "Plan your transition with timeline, networking, and positioning tactics",
        action: "Build Strategy",
        progressText: "You've completed 3 out of 8 strategy milestones.",
        careersSaved: 9,
        skillsIdentified: 19,
        progressPercent: 38
      }
    ],
    welcomeMessage: "Ready to make a change? 🔄 I'm here to help you transition smoothly, leverage your existing skills, and break into your new field. Let's talk strategy!"
  },
  professional: {
    prompts: [
      "How do I advance to management?",
      "What skills are trending in my industry?",
      "How do I negotiate a promotion?",
      "Should I specialize or generalize?",
      "How do I build my professional brand?"
    ],
    features: [
      {
        title: "📈 Career Advancement Planner",
        description: "Chart your path to leadership and senior roles in your field",
        action: "Plan Advancement",
        progressText: "You've completed 4 out of 10 leadership development modules.",
        careersSaved: 12,
        skillsIdentified: 25,
        progressPercent: 40
      },
      {
        title: "🎯 Skills Gap Analysis",
        description: "Identify emerging skills needed to stay competitive in your industry",
        action: "Analyze Gaps",
        progressText: "You're tracking 8 trending skills in your field.",
        careersSaved: 14,
        skillsIdentified: 28,
        progressPercent: 65
      },
      {
        title: "🌟 Executive Presence Builder",
        description: "Develop leadership skills, personal branding, and influence",
        action: "Build Presence",
        progressText: "You've completed 6 out of 12 leadership workshops.",
        careersSaved: 11,
        skillsIdentified: 21,
        progressPercent: 50
      }
    ],
    welcomeMessage: "Welcome back! 💼 I'm here to help you advance your career, develop leadership skills, and stay ahead in your industry. What are your goals today?"
  }
};

export const dashboardUserTypes = [
  { key: "student", label: "High School Student", icon: "🎓", description: "Planning your college path and exploring future career options", isPremium: false },
  { key: "graduate", label: "Recent Graduate", icon: "👨‍🎓", description: "Ready to enter the job market with your new degree", isPremium: false },
  { key: "changer", label: "Career Changer", icon: "🔄", description: "Looking to transition to a new field or industry", isPremium: true },
  { key: "professional", label: "Working Professional", icon: "💼", description: "Advancing your career and developing new skills", isPremium: true }
];

function getSmartResponse(question, userType) {
  const responses = {
    student: {
      default: "Great question! As a high school student, focus on building a strong foundation. I recommend exploring different subjects, maintaining good grades, and getting involved in extracurriculars that genuinely interest you. Would you like specific advice on any of these areas?",
      college: "When choosing colleges, consider: 1) Academic programs that match your interests, 2) Campus culture and location, 3) Financial aid opportunities, 4) Career services and internship connections. What's most important to you?",
      subjects: "Your strongest subjects often point to natural aptitudes! Math/Science might lead to STEM careers, while strong Language Arts skills open doors in communications, law, or creative fields. Want to explore specific career paths?",
    },
    graduate: {
      default: "Congratulations on graduating! The job market values both your degree and transferable skills. Focus on: networking actively, tailoring your resume to each position, and practicing your interview skills. What area would you like to focus on first?",
      resume: "Your resume should highlight: 1) Relevant coursework and projects, 2) Internships or part-time work, 3) Leadership roles in clubs/organizations, 4) Technical and soft skills. Use action verbs and quantify achievements when possible!",
      interview: "Interview prep tips: Research the company thoroughly, prepare STAR method examples, practice common questions, prepare thoughtful questions to ask, and do mock interviews. Would you like to practice some common questions?",
    },
    changer: {
      default: "Career transitions are challenging but rewarding! Your existing experience is valuable—we just need to reframe it. Focus on: identifying transferable skills, networking in your target industry, and gaining relevant certifications. What's your target field?",
      skills: "Many skills transfer across industries: project management, communication, problem-solving, leadership, and technical proficiency. Let's map your current skills to your target role. What skills do you bring from your current field?",
      strategy: "A successful career change strategy includes: 1) Skills gap analysis, 2) Targeted upskilling, 3) Strategic networking, 4) Rebranding your experience, 5) Planning your timeline and finances. Where would you like to start?",
    },
    professional: {
      default: "As a working professional, advancement requires strategic planning. Focus on: developing leadership skills, staying current with industry trends, building your professional network, and demonstrating measurable impact. What's your next career goal?",
      advancement: "To advance in your career: 1) Take on stretch assignments, 2) Develop leadership and management skills, 3) Build cross-functional relationships, 4) Seek mentorship, 5) Document and communicate your achievements. Ready to create your advancement plan?",
      skills: "Stay competitive by: monitoring industry trends, pursuing relevant certifications, developing both technical and soft skills, and building expertise in emerging areas. What skills are you looking to develop?",
    }
  };

  const typeResponses = responses[userType];
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('college') || lowerQuestion.includes('school')) return typeResponses.college || typeResponses.default;
  if (lowerQuestion.includes('subject') || lowerQuestion.includes('strength')) return typeResponses.subjects || typeResponses.default;
  if (lowerQuestion.includes('resume') || lowerQuestion.includes('cv')) return typeResponses.resume || typeResponses.default;
  if (lowerQuestion.includes('interview')) return typeResponses.interview || typeResponses.default;
  if (lowerQuestion.includes('skill')) return typeResponses.skills || typeResponses.default;
  if (lowerQuestion.includes('strategy') || lowerQuestion.includes('plan')) return typeResponses.strategy || typeResponses.default;
  if (lowerQuestion.includes('advance') || lowerQuestion.includes('promotion')) return typeResponses.advancement || typeResponses.default;
  
  return typeResponses.default;
}

// DashboardCard Component
function DashboardCard({ title, description, progressText, careersSaved, skillsIdentified, progressPercent, action, onAction }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '28px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'default',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
    }}>
      <h3 style={{ marginBottom: '12px', fontSize: '1.3rem', fontWeight: '600', color: '#2d3748' }}>{title}</h3>
      <p style={{ marginBottom: '16px', color: '#4a5568', lineHeight: '1.5', fontSize: '0.95rem' }}>{description}</p>
      <p style={{ marginBottom: '20px', color: '#718096', lineHeight: '1.6', fontSize: '0.9rem', fontStyle: 'italic' }}>{progressText}</p>
      
      <div style={{ display: 'flex', gap: '32px', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea', marginBottom: '4px' }}>{careersSaved}</div>
          <div style={{ fontSize: '0.875rem', color: '#718096' }}>Items Saved</div>
        </div>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#764ba2', marginBottom: '4px' }}>{skillsIdentified}</div>
          <div style={{ fontSize: '0.875rem', color: '#718096' }}>Skills Tracked</div>
        </div>
      </div>
      
      <div style={{ marginBottom: '16px', marginTop: 'auto' }}>
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
        {action}
      </button>
    </div>
  );
}

// Using external CareerChat component (from src/CareerChat.jsx)
// NavButton Component
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

// Main Dashboard Component
export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedUserType, setSelectedUserType] = useState("student");
  const [showCareerChat, setShowCareerChat] = useState(false);
  const [showFeatureChat, setShowFeatureChat] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [careerInitialPrompt, setCareerInitialPrompt] = useState("");
  const [notification, setNotification] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);

  const currentConfig = userTypeConfigs[selectedUserType];
  const overallProgress = Math.round(
    currentConfig.features.reduce((sum, f) => sum + f.progressPercent, 0) / currentConfig.features.length
  );

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setShowCareerChat(false);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Save selected user type to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('selectedUserType', selectedUserType);
    } catch (e) {
      console.error('Error saving user type:', e);
    }
  }, [selectedUserType]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const userTypes = dashboardUserTypes;

  return (
    <div style={{ minHeight: '100vh', background: '#f7fafc' }}>
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
            <NavButton onClick={() => showNotification("Already on Dashboard")}>Dashboard</NavButton>
            <NavButton onClick={() => navigate("/net")}>Network</NavButton>
            <NavButton onClick={() => navigate("/lessonplan")}>Lesson Plan</NavButton>
            <NavButton onClick={() => navigate("/careerchat")}>My Plan</NavButton>
            <NavButton onClick={() => navigate("/settings")}>Settings</NavButton>
            <button 
              onClick={() => {
                setLoggedIn(!loggedIn);
                showNotification(loggedIn ? "Logged out successfully" : "Logged in successfully");
              }}
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

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
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

        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '36px'
        }}>
          {userTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => {
                setSelectedUserType(type.key);
                showNotification(`Switched to ${type.label} mode`);
              }}
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
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{type.icon}</div>
                {type.isPremium && type.key !== "student" && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-15px',
                    background: 'linear-gradient(135deg, #f6e05e 0%, #ecc94b 100%)',
                    color: '#744210',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transform: 'rotate(12deg)'
                  }}>
                    ✨ PREMIUM
                  </div>
                )}
              </div>
              <h3 style={{ 
                fontSize: '1.15rem', 
                marginBottom: '10px', 
                fontWeight: '600', 
                color: '#2d3748',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                {type.label}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#718096', margin: 0, lineHeight: '1.5' }}>
                {type.description}
              </p>
            </button>
          ))}
        </section>

        {/* ...existing code... (AI Chat section removed as requested) */}

        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '24px'
        }}>
          {currentConfig.features.map((feature, idx) => (
            <DashboardCard 
              key={idx} 
              {...feature}
              onAction={() => {
                const isPremiumType = userTypes.find((type) => type.key === selectedUserType)?.isPremium;
                if (isPremiumType) {
                  navigate("/paywall", { state: { from: "/dashboard" } });
                  return;
                }
                showNotification(`Opening ${feature.title}...`);
                setSelectedFeature(feature);
                setShowFeatureChat(true);
              }}
            />
          ))}
        </section>
      </main>

      {showCareerChat && (
        <div 
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
          onClick={() => setShowCareerChat(false)}
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
              onClick={() => setShowCareerChat(false)}
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
            <CareerChat userType={selectedUserType} initialPrompt={careerInitialPrompt} />
          </div>
        </div>
      )}

      {showFeatureChat && selectedFeature && (
        <div 
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
          onClick={() => setShowFeatureChat(false)}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '16px',
              maxWidth: '600px',
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
              onClick={() => setShowFeatureChat(false)}
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
            <FeatureChat 
              feature={selectedFeature} 
              onClose={() => setShowFeatureChat(false)} 
            />
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