import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { findAI } from '../../FindAI';

// Lesson data based on user type and career goals
const lessonLibrary = {
  student: {
    title: "High School Student Learning Path",
    lessons: [
      {
        id: 1,
        title: "College Research Fundamentals",
        category: "College Planning",
        duration: "2 weeks",
        difficulty: "Beginner",
        skills: ["Research Skills", "Decision Making"],
        modules: [
          { name: "Understanding College Types", duration: "3 hours", completed: false },
          { name: "Evaluating Programs", duration: "2 hours", completed: false },
          { name: "Campus Culture Research", duration: "2 hours", completed: false }
        ],
        description: "Learn how to effectively research and evaluate colleges that match your interests and goals."
      },
      {
        id: 2,
        title: "Academic Strength Assessment",
        category: "Self-Discovery",
        duration: "1 week",
        difficulty: "Beginner",
        skills: ["Self-Assessment", "Critical Thinking"],
        modules: [
          { name: "Identify Your Strengths", duration: "2 hours", completed: false },
          { name: "Career-Subject Alignment", duration: "3 hours", completed: false },
          { name: "Building on Your Talents", duration: "2 hours", completed: false }
        ],
        description: "Discover your academic strengths and how they align with future career paths."
      },
      {
        id: 3,
        title: "SAT/ACT Prep Strategy",
        category: "Test Preparation",
        duration: "3 weeks",
        difficulty: "Intermediate",
        skills: ["Test Taking", "Time Management"],
        modules: [
          { name: "Understanding Test Format", duration: "2 hours", completed: false },
          { name: "Study Schedule Creation", duration: "1 hour", completed: false },
          { name: "Practice Test Strategies", duration: "4 hours", completed: false }
        ],
        description: "Master effective strategies for standardized test preparation and performance."
      }
    ]
  },
  graduate: {
    title: "Recent Graduate Career Launch",
    lessons: [
      {
        id: 1,
        title: "Resume Writing Mastery",
        category: "Job Search",
        duration: "1 week",
        difficulty: "Beginner",
        skills: ["Resume Writing", "Personal Branding"],
        modules: [
          { name: "Resume Structure & Format", duration: "2 hours", completed: false },
          { name: "Action Verbs & Achievements", duration: "2 hours", completed: false },
          { name: "Tailoring for Each Job", duration: "3 hours", completed: false },
          { name: "ATS Optimization", duration: "2 hours", completed: false }
        ],
        description: "Create a compelling resume that gets past ATS systems and catches recruiters' attention."
      },
      {
        id: 2,
        title: "Interview Confidence Builder",
        category: "Interview Skills",
        duration: "2 weeks",
        difficulty: "Intermediate",
        skills: ["Communication", "Interview Techniques"],
        modules: [
          { name: "Common Interview Questions", duration: "3 hours", completed: false },
          { name: "STAR Method Mastery", duration: "2 hours", completed: false },
          { name: "Body Language & Presence", duration: "2 hours", completed: false },
          { name: "Mock Interview Practice", duration: "4 hours", completed: false }
        ],
        description: "Build confidence and master interview techniques for landing your first job."
      },
      {
        id: 3,
        title: "Entry-Level Job Market Navigation",
        category: "Job Search",
        duration: "2 weeks",
        difficulty: "Beginner",
        skills: ["Job Search", "Networking"],
        modules: [
          { name: "Identifying Target Companies", duration: "2 hours", completed: false },
          { name: "LinkedIn Optimization", duration: "3 hours", completed: false },
          { name: "Job Board Strategies", duration: "2 hours", completed: false },
          { name: "Networking for Beginners", duration: "3 hours", completed: false }
        ],
        description: "Navigate the job market effectively and find entry-level positions that match your degree."
      },
      {
        id: 4,
        title: "Salary Negotiation Basics",
        category: "Career Development",
        duration: "1 week",
        difficulty: "Intermediate",
        skills: ["Negotiation", "Communication"],
        modules: [
          { name: "Market Research", duration: "2 hours", completed: false },
          { name: "Understanding Your Worth", duration: "2 hours", completed: false },
          { name: "Negotiation Tactics", duration: "3 hours", completed: false }
        ],
        description: "Learn how to confidently negotiate your first salary and benefits package."
      }
    ]
  },
  changer: {
    title: "Career Transition Pathway",
    lessons: [
      {
        id: 1,
        title: "Skills Translation Workshop",
        category: "Career Transition",
        duration: "2 weeks",
        difficulty: "Intermediate",
        skills: ["Skills Mapping", "Personal Branding"],
        modules: [
          { name: "Identifying Transferable Skills", duration: "3 hours", completed: false },
          { name: "Industry-Specific Translation", duration: "4 hours", completed: false },
          { name: "Rebranding Your Experience", duration: "3 hours", completed: false }
        ],
        description: "Map your existing skills to new industry opportunities and rebrand yourself effectively."
      },
      {
        id: 2,
        title: "Strategic Upskilling Plan",
        category: "Skill Development",
        duration: "4 weeks",
        difficulty: "Advanced",
        skills: ["Learning Strategy", "Technical Skills"],
        modules: [
          { name: "Skills Gap Analysis", duration: "2 hours", completed: false },
          { name: "Learning Resource Curation", duration: "3 hours", completed: false },
          { name: "Certification Priorities", duration: "2 hours", completed: false },
          { name: "Building a Portfolio", duration: "5 hours", completed: false }
        ],
        description: "Create a strategic plan to acquire the skills needed for your target industry."
      },
      {
        id: 3,
        title: "Career Pivot Networking",
        category: "Networking",
        duration: "3 weeks",
        difficulty: "Intermediate",
        skills: ["Networking", "Relationship Building"],
        modules: [
          { name: "Industry Research", duration: "3 hours", completed: false },
          { name: "Informational Interviews", duration: "4 hours", completed: false },
          { name: "LinkedIn Strategy", duration: "2 hours", completed: false },
          { name: "Building Your Network", duration: "4 hours", completed: false }
        ],
        description: "Build meaningful connections in your target industry to facilitate your transition."
      }
    ]
  },
  professional: {
    title: "Professional Advancement Program",
    lessons: [
      {
        id: 1,
        title: "Leadership Development Essentials",
        category: "Leadership",
        duration: "4 weeks",
        difficulty: "Advanced",
        skills: ["Leadership", "Team Management"],
        modules: [
          { name: "Leadership Styles", duration: "3 hours", completed: false },
          { name: "Emotional Intelligence", duration: "4 hours", completed: false },
          { name: "Conflict Resolution", duration: "3 hours", completed: false },
          { name: "Strategic Thinking", duration: "4 hours", completed: false }
        ],
        description: "Develop essential leadership skills to advance into management roles."
      },
      {
        id: 2,
        title: "Industry Trends & Innovation",
        category: "Professional Development",
        duration: "3 weeks",
        difficulty: "Advanced",
        skills: ["Market Analysis", "Innovation"],
        modules: [
          { name: "Trend Identification", duration: "3 hours", completed: false },
          { name: "Competitive Analysis", duration: "3 hours", completed: false },
          { name: "Innovation Frameworks", duration: "4 hours", completed: false }
        ],
        description: "Stay ahead of industry trends and position yourself as an innovative thinker."
      },
      {
        id: 3,
        title: "Executive Presence Mastery",
        category: "Personal Branding",
        duration: "3 weeks",
        difficulty: "Advanced",
        skills: ["Executive Presence", "Communication"],
        modules: [
          { name: "Professional Image", duration: "2 hours", completed: false },
          { name: "Influence & Persuasion", duration: "4 hours", completed: false },
          { name: "Public Speaking", duration: "4 hours", completed: false },
          { name: "Personal Brand Building", duration: "3 hours", completed: false }
        ],
        description: "Build executive presence and influence to advance to senior leadership positions."
      }
    ]
  }
};

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

function LessonCard({ lesson, onStart, onViewDetails, isEnrolled }) {
  const totalModules = lesson.modules.length;
  const completedModules = lesson.modules.filter(m => m.completed).length;
  const progress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      border: '2px solid #e2e8f0',
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <span style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '0.75rem',
          fontWeight: '600'
        }}>
          {lesson.category}
        </span>
        <span style={{
          background: lesson.difficulty === 'Beginner' ? '#10b981' : lesson.difficulty === 'Intermediate' ? '#f59e0b' : '#ef4444',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '0.75rem',
          fontWeight: '600'
        }}>
          {lesson.difficulty}
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#2d3748', marginBottom: '8px' }}>
        {lesson.title}
      </h3>

      <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '16px', lineHeight: '1.6', flex: 1 }}>
        {lesson.description}
      </p>

      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {lesson.skills.map((skill, idx) => (
            <span key={idx} style={{
              background: '#f7fafc',
              color: '#4a5568',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              border: '1px solid #e2e8f0'
            }}>
              {skill}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#718096', marginBottom: '8px' }}>
          <span>📚 {totalModules} modules</span>
          <span>⏱️ {lesson.duration}</span>
        </div>

        {isEnrolled && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
              <span style={{ color: '#718096' }}>Progress</span>
              <span style={{ color: '#667eea', fontWeight: '600' }}>{progress}%</span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              background: '#e2e8f0',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                transition: 'width 0.6s ease',
                borderRadius: '4px'
              }}></div>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
        <button
          onClick={() => onViewDetails(lesson)}
          style={{
            flex: 1,
            padding: '10px',
            background: isEnrolled ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
            color: isEnrolled ? 'white' : '#667eea',
            border: isEnrolled ? 'none' : '2px solid #667eea',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            if (!isEnrolled) {
              e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
              e.currentTarget.style.color = 'white';
            } else {
              e.currentTarget.style.opacity = '0.9';
            }
          }}
          onMouseLeave={(e) => {
            if (!isEnrolled) {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#667eea';
            } else {
              e.currentTarget.style.opacity = '1';
            }
          }}
        >
          {isEnrolled ? '📖 Continue Learning' : '👁️ View Details'}
        </button>
        {!isEnrolled && (
          <button
            onClick={() => onStart(lesson)}
            style={{
              flex: 1,
              padding: '10px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            🚀 Enroll Now
          </button>
        )}
      </div>
    </div>
  );
}

function LessonDetailsModal({ lesson, onClose, onEnroll, onToggleModule, isEnrolled, aiAssignments, onToggleAssignment, loadingAssignments }) {
  if (!lesson) return null;

  const totalModules = lesson.modules.length;
  const completedModules = lesson.modules.filter(m => m.completed).length;
  const progress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px',
      overflowY: 'auto'
    }} onClick={onClose}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#2d3748', margin: 0, flex: 1 }}>
            {lesson.title}
          </h2>
          <button onClick={onClose} style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#718096',
            padding: '0 8px'
          }}>×</button>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <span style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '6px 14px',
            borderRadius: '12px',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}>
            {lesson.category}
          </span>
          <span style={{
            background: lesson.difficulty === 'Beginner' ? '#10b981' : lesson.difficulty === 'Intermediate' ? '#f59e0b' : '#ef4444',
            color: 'white',
            padding: '6px 14px',
            borderRadius: '12px',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}>
            {lesson.difficulty}
          </span>
          <span style={{
            background: '#f7fafc',
            color: '#4a5568',
            padding: '6px 14px',
            borderRadius: '12px',
            fontSize: '0.85rem',
            fontWeight: '600',
            border: '1px solid #e2e8f0'
          }}>
            ⏱️ {lesson.duration}
          </span>
        </div>

        <p style={{ color: '#4a5568', fontSize: '1rem', marginBottom: '24px', lineHeight: '1.7' }}>
          {lesson.description}
        </p>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2d3748', marginBottom: '12px' }}>
            Skills You'll Learn
          </h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {lesson.skills.map((skill, idx) => (
              <span key={idx} style={{
                background: '#f0f4ff',
                color: '#667eea',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '500',
                border: '1px solid #d1dbff'
              }}>
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        {isEnrolled && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2d3748', margin: 0 }}>
                Your Progress
              </h3>
              <span style={{ color: '#667eea', fontWeight: '700', fontSize: '1.1rem' }}>{progress}%</span>
            </div>
            <div style={{
              width: '100%',
              height: '12px',
              background: '#e2e8f0',
              borderRadius: '6px',
              overflow: 'hidden',
              marginBottom: '8px'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                transition: 'width 0.6s ease',
                borderRadius: '6px'
              }}></div>
            </div>
            <p style={{ color: '#718096', fontSize: '0.85rem', margin: 0 }}>
              {completedModules} of {totalModules} modules completed
            </p>
          </div>
        )}

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2d3748', marginBottom: '16px' }}>
            Course Modules
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {lesson.modules.map((module, idx) => (
              <div key={idx} style={{
                background: module.completed ? '#f0fdf4' : '#f7fafc',
                padding: '16px',
                borderRadius: '12px',
                border: `2px solid ${module.completed ? '#86efac' : '#e2e8f0'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: isEnrolled ? 'pointer' : 'default',
                transition: 'all 0.2s'
              }}
              onClick={() => isEnrolled && onToggleModule(lesson.id, idx)}
              onMouseEnter={(e) => {
                if (isEnrolled) {
                  e.currentTarget.style.transform = 'translateX(4px)';
                }
              }}
              onMouseLeave={(e) => {
                if (isEnrolled) {
                  e.currentTarget.style.transform = 'translateX(0)';
                }
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                    {isEnrolled && (
                      <input
                        type="checkbox"
                        checked={module.completed}
                        readOnly
                        style={{
                          width: '20px',
                          height: '20px',
                          cursor: 'pointer',
                          accentColor: '#667eea'
                        }}
                      />
                    )}
                    <span style={{
                      fontWeight: '600',
                      color: module.completed ? '#166534' : '#2d3748',
                      fontSize: '0.95rem'
                    }}>
                      Module {idx + 1}: {module.name}
                    </span>
                  </div>
                  <span style={{ color: '#718096', fontSize: '0.85rem', marginLeft: isEnrolled ? '32px' : '0' }}>
                    ⏱️ {module.duration}
                  </span>
                </div>
                {module.completed && (
                  <span style={{ fontSize: '1.5rem' }}>✅</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI-Generated Assignments Section */}
        {isEnrolled && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2d3748', marginBottom: '16px' }}>
              🤖 Personalized Assignments (AI-Generated)
            </h3>
            
            {loadingAssignments ? (
              <div style={{
                background: '#f7fafc',
                padding: '24px',
                borderRadius: '12px',
                textAlign: 'center',
                color: '#718096'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⏳</div>
                <p>Generating personalized assignments based on your profile...</p>
              </div>
            ) : aiAssignments && aiAssignments.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {aiAssignments.map((assignment, idx) => (
                  <div key={idx} style={{
                    background: assignment.completed ? '#f0fdf4' : '#fef3c7',
                    padding: '16px',
                    borderRadius: '12px',
                    border: `2px solid ${assignment.completed ? '#86efac' : '#fbbf24'}`,
                    display: 'flex',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => onToggleAssignment(lesson.id, idx)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}>
                    <input
                      type="checkbox"
                      checked={assignment.completed}
                      readOnly
                      style={{
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                        accentColor: '#10b981',
                        marginTop: '2px',
                        flexShrink: 0
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: '600',
                        color: assignment.completed ? '#166534' : '#92400e',
                        fontSize: '0.95rem',
                        marginBottom: '6px'
                      }}>
                        {assignment.title}
                      </div>
                      {assignment.description && (
                        <div style={{
                          color: assignment.completed ? '#15803d' : '#78350f',
                          fontSize: '0.85rem',
                          lineHeight: '1.5'
                        }}>
                          {assignment.description}
                        </div>
                      )}
                    </div>
                    {assignment.completed && (
                      <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>✅</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                background: '#f7fafc',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'center',
                color: '#718096',
                border: '2px dashed #e2e8f0'
              }}>
                <p style={{ margin: 0 }}>
                  AI assignments will be generated when you enroll in this lesson.
                </p>
              </div>
            )}
          </div>
        )}

        {!isEnrolled ? (
          <button
            onClick={() => onEnroll(lesson)}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            🚀 Enroll in This Lesson
          </button>
        ) : (
          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            ✓ Continue Learning
          </button>
        )}
      </div>
    </div>
  );
}

export default function LessonPlan() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('graduate');
  const [enrolledLessons, setEnrolledLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [notification, setNotification] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [aiAssignments, setAiAssignments] = useState({});
  const [loadingAssignments, setLoadingAssignments] = useState({});

  // Load user type from localStorage (set from dashboard)
  useEffect(() => {
    try {
      const savedUserType = localStorage.getItem('selectedUserType');
      if (savedUserType) {
        setUserType(savedUserType);
      }

      const savedEnrolled = localStorage.getItem('enrolledLessons');
      if (savedEnrolled) {
        const enrolled = JSON.parse(savedEnrolled);
        setEnrolledLessons(enrolled);
        
        // Load AI assignments for enrolled lessons
        const assignments = {};
        enrolled.forEach(lesson => {
          const lessonKey = `lesson_${lesson.id}`;
          const savedAssignments = localStorage.getItem(`aiAssignments_${lessonKey}`);
          if (savedAssignments) {
            assignments[lessonKey] = JSON.parse(savedAssignments);
          }
        });
        setAiAssignments(assignments);
      }
    } catch (e) {
      console.error('Error loading data:', e);
    }
  }, []);

  // Save enrolled lessons to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('enrolledLessons', JSON.stringify(enrolledLessons));
    } catch (e) {
      console.error('Error saving data:', e);
    }
  }, [enrolledLessons]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Generate AI-powered personalized assignments
  const generateAIAssignments = async (lesson) => {
    const lessonKey = `lesson_${lesson.id}`;
    
    // Check if assignments already exist
    const savedAssignments = localStorage.getItem(`aiAssignments_${lessonKey}`);
    if (savedAssignments) {
      setAiAssignments(prev => ({ ...prev, [lessonKey]: JSON.parse(savedAssignments) }));
      return;
    }

    setLoadingAssignments(prev => ({ ...prev, [lessonKey]: true }));

    try {
      // Gather user context from localStorage
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const careerChatMessages = JSON.parse(localStorage.getItem('careerChatMessages') || '[]');
      const assessmentData = localStorage.getItem('assessmentCompleted');
      
      // Build context for AI
      const userContext = `
User Profile:
- Name: ${userData.firstName || 'User'} ${userData.lastName || ''}
- User Type: ${userType}
- Assessment Status: ${assessmentData ? 'Completed' : 'Not completed'}

Recent Career Discussions:
${careerChatMessages.slice(-5).map(msg => `${msg.sender}: ${msg.text.substring(0, 150)}...`).join('\n')}

Lesson Information:
- Title: ${lesson.title}
- Category: ${lesson.category}
- Difficulty: ${lesson.difficulty}
- Skills: ${lesson.skills.join(', ')}
- Modules: ${lesson.modules.map(m => m.name).join(', ')}
`;

      const prompt = `Based on the following user profile and lesson details, create 4-6 personalized, actionable assignments that will help the user master this lesson. Each assignment should be specific, measurable, and tailored to their career stage.

${userContext}

Provide assignments in the following format:
1. [Assignment Title] - [Brief description and specific action steps]
2. [Assignment Title] - [Brief description and specific action steps]
...

Make assignments practical, achievable within the lesson timeframe, and directly related to the skills being taught. Include specific resources, exercises, or deliverables where applicable.`;

      const aiResponse = await findAI(prompt);
      
      // Parse AI response into structured assignments
      const assignmentLines = aiResponse.split('\n').filter(line => line.match(/^\d+\./));
      const parsedAssignments = assignmentLines.map(line => {
        const match = line.match(/^\d+\.\s*(.+?)\s*-\s*(.+)$/);
        if (match) {
          return {
            title: match[1].trim(),
            description: match[2].trim(),
            completed: false
          };
        }
        return {
          title: line.replace(/^\d+\.\s*/, '').trim(),
          description: '',
          completed: false
        };
      });

      const assignments = parsedAssignments.length > 0 ? parsedAssignments : [
        {
          title: 'Custom Learning Assignment',
          description: aiResponse,
          completed: false
        }
      ];

      // Save to state and localStorage
      setAiAssignments(prev => ({ ...prev, [lessonKey]: assignments }));
      localStorage.setItem(`aiAssignments_${lessonKey}`, JSON.stringify(assignments));
      
    } catch (error) {
      console.error('Error generating AI assignments:', error);
      showNotification('⚠️ Unable to generate assignments. Please try again.');
    } finally {
      setLoadingAssignments(prev => ({ ...prev, [lessonKey]: false }));
    }
  };

  const handleEnroll = async (lesson) => {
    if (!enrolledLessons.find(l => l.id === lesson.id)) {
      setEnrolledLessons([...enrolledLessons, { ...lesson }]);
      showNotification(`🎉 Enrolled in "${lesson.title}"!`);
      setShowDetails(false);
      
      // Generate AI assignments for this lesson
      await generateAIAssignments(lesson);
    }
  };

  const handleViewDetails = (lesson) => {
    setSelectedLesson(lesson);
    setShowDetails(true);
  };

  const handleToggleModule = (lessonId, moduleIdx) => {
    setEnrolledLessons(enrolledLessons.map(lesson => {
      if (lesson.id === lessonId) {
        const updatedModules = [...lesson.modules];
        updatedModules[moduleIdx] = {
          ...updatedModules[moduleIdx],
          completed: !updatedModules[moduleIdx].completed
        };
        return { ...lesson, modules: updatedModules };
      }
      return lesson;
    }));

    // Update selected lesson if it's being viewed
    if (selectedLesson && selectedLesson.id === lessonId) {
      const updatedLesson = { ...selectedLesson };
      updatedLesson.modules[moduleIdx].completed = !updatedLesson.modules[moduleIdx].completed;
      setSelectedLesson(updatedLesson);
    }
  };

  const handleToggleAssignment = (lessonId, assignmentIdx) => {
    const lessonKey = `lesson_${lessonId}`;
    const assignments = [...(aiAssignments[lessonKey] || [])];
    
    if (assignments[assignmentIdx]) {
      assignments[assignmentIdx] = {
        ...assignments[assignmentIdx],
        completed: !assignments[assignmentIdx].completed
      };
      
      setAiAssignments(prev => ({ ...prev, [lessonKey]: assignments }));
      localStorage.setItem(`aiAssignments_${lessonKey}`, JSON.stringify(assignments));
    }
  };

  const currentLessons = lessonLibrary[userType]?.lessons || [];
  const categories = ['all', ...new Set(currentLessons.map(l => l.category))];
  const filteredLessons = filterCategory === 'all' 
    ? currentLessons 
    : currentLessons.filter(l => l.category === filterCategory);

  const totalEnrolled = enrolledLessons.length;
  const totalCompleted = enrolledLessons.filter(lesson => 
    lesson.modules.every(m => m.completed)
  ).length;
  const overallProgress = totalEnrolled > 0 
    ? Math.round((totalCompleted / totalEnrolled) * 100) 
    : 0;
  
  // Calculate total AI assignments
  const totalAIAssignments = Object.values(aiAssignments).reduce((sum, assignments) => sum + assignments.length, 0);
  const completedAIAssignments = Object.values(aiAssignments).reduce((sum, assignments) => 
    sum + assignments.filter(a => a.completed).length, 0
  );

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
            <NavButton onClick={() => navigate('/dashboard')}>Dashboard</NavButton>
            <NavButton onClick={() => navigate('/net')}>Network</NavButton>
            <NavButton onClick={() => showNotification('Already on Lesson Plan')}>My Plan</NavButton>
            <NavButton onClick={() => navigate('/settings')}>Settings</NavButton>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Header Section */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          padding: '40px',
          marginBottom: '32px',
          color: 'white',
          boxShadow: '0 8px 24px rgba(102, 126, 234, 0.25)'
        }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '12px' }}>
            📚 Your Learning Path
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.95, marginBottom: '24px' }}>
            {lessonLibrary[userType]?.title || 'Personalized Learning Journey'} • AI-Powered Assignments
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '20px',
            marginTop: '24px'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              padding: '20px',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '4px' }}>
                {currentLessons.length}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Available Lessons</div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              padding: '20px',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '4px' }}>
                {totalEnrolled}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Enrolled Lessons</div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              padding: '20px',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '4px' }}>
                {totalCompleted}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Completed</div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              padding: '20px',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '4px' }}>
                {completedAIAssignments}/{totalAIAssignments}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>AI Assignments</div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              padding: '20px',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '4px' }}>
                {overallProgress}%
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Overall Progress</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div style={{
          marginBottom: '24px',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <span style={{ fontWeight: '600', color: '#4a5568', fontSize: '0.95rem' }}>Filter by:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                background: filterCategory === cat 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                  : 'white',
                color: filterCategory === cat ? 'white' : '#4a5568',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                if (filterCategory !== cat) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (filterCategory !== cat) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }
              }}
            >
              {cat === 'all' ? 'All Lessons' : cat}
            </button>
          ))}
        </div>

        {/* Quick Action Prompts */}
        {enrolledLessons.length === 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            borderRadius: '16px',
            padding: '28px',
            marginBottom: '32px',
            border: '2px solid #bae6fd'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              color: '#0c4a6e',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              💡 Getting Started
            </h3>
            <p style={{
              color: '#075985',
              marginBottom: '20px',
              lineHeight: '1.6'
            }}>
              Not sure where to begin? Try these recommended actions to jumpstart your learning journey:
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '12px'
            }}>
              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  background: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '2px solid #7dd3fc',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = '#0ea5e9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                  e.currentTarget.style.borderColor = '#7dd3fc';
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>📊</div>
                <div style={{ fontWeight: '600', color: '#0c4a6e', marginBottom: '4px' }}>
                  Visit Your Dashboard
                </div>
                <div style={{ fontSize: '0.85rem', color: '#0369a1' }}>
                  Check your career progress and get personalized recommendations
                </div>
              </button>

              <button
                onClick={() => navigate('/careerchat')}
                style={{
                  background: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '2px solid #a78bfa',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = '#8b5cf6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                  e.currentTarget.style.borderColor = '#a78bfa';
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>💬</div>
                <div style={{ fontWeight: '600', color: '#5b21b6', marginBottom: '4px' }}>
                  Chat with AI Career Guide
                </div>
                <div style={{ fontSize: '0.85rem', color: '#6d28d9' }}>
                  Get instant career advice and guidance from our AI mentor
                </div>
              </button>

              <button
                onClick={() => {
                  const firstLesson = currentLessons[0];
                  if (firstLesson) {
                    handleViewDetails(firstLesson);
                  }
                }}
                style={{
                  background: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '2px solid #86efac',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = '#22c55e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                  e.currentTarget.style.borderColor = '#86efac';
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🎓</div>
                <div style={{ fontWeight: '600', color: '#15803d', marginBottom: '4px' }}>
                  Enroll in Your First Lesson
                </div>
                <div style={{ fontSize: '0.85rem', color: '#16a34a' }}>
                  Start learning with our recommended lesson for {userType === 'graduate' ? 'recent graduates' : 'your career stage'}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Enrolled Lessons Section */}
        {enrolledLessons.length > 0 && (
          <>
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#2d3748',
                marginBottom: '20px'
              }}>
                🎯 My Enrolled Lessons
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '24px'
              }}>
                {enrolledLessons.map(lesson => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    onStart={handleEnroll}
                    onViewDetails={handleViewDetails}
                    isEnrolled={true}
                  />
                ))}
              </div>
            </div>

            {/* Helpful Tips for Active Learners */}
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '32px',
              border: '2px solid #fbbf24'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#92400e',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                ⚡ Power Tips
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                  <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>📊</div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#78350f', marginBottom: '4px' }}>
                      Track Your Progress
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#92400e' }}>
                      Visit the <button 
                        onClick={() => navigate('/dashboard')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#c2410c',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          fontWeight: '600',
                          padding: 0,
                          fontSize: '0.85rem'
                        }}
                      >Dashboard</button> to see your overall career development stats
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                  <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>💬</div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#78350f', marginBottom: '4px' }}>
                      Get Personalized Help
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#92400e' }}>
                      Use <button 
                        onClick={() => navigate('/careerchat')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#c2410c',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          fontWeight: '600',
                          padding: 0,
                          fontSize: '0.85rem'
                        }}
                      >My Plan</button> to chat with AI about your learning journey
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                  <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>🌐</div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#78350f', marginBottom: '4px' }}>
                      Connect & Network
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#92400e' }}>
                      Join the <button 
                        onClick={() => navigate('/net')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#c2410c',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          fontWeight: '600',
                          padding: 0,
                          fontSize: '0.85rem'
                        }}
                      >Network</button> to meet professionals in your field
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Available Lessons Section */}
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: '700',
          color: '#2d3748',
          marginBottom: '20px'
        }}>
          📖 {filterCategory === 'all' ? 'All Available Lessons' : `${filterCategory} Lessons`}
        </h2>
        
        {filteredLessons.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px'
          }}>
            {filteredLessons.map(lesson => {
              const isEnrolled = enrolledLessons.find(l => l.id === lesson.id);
              const enrolledLesson = isEnrolled || lesson;
              
              return (
                <LessonCard
                  key={lesson.id}
                  lesson={enrolledLesson}
                  onStart={handleEnroll}
                  onViewDetails={handleViewDetails}
                  isEnrolled={!!isEnrolled}
                />
              );
            })}
          </div>
        ) : (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <p style={{ color: '#718096', fontSize: '1.1rem' }}>
              No lessons found in this category.
            </p>
          </div>
        )}
      </div>

      {showDetails && (
        <LessonDetailsModal
          lesson={selectedLesson}
          onClose={() => setShowDetails(false)}
          onEnroll={handleEnroll}
          onToggleModule={handleToggleModule}
          onToggleAssignment={handleToggleAssignment}
          isEnrolled={!!enrolledLessons.find(l => l.id === selectedLesson?.id)}
          aiAssignments={aiAssignments[`lesson_${selectedLesson?.id}`] || []}
          loadingAssignments={loadingAssignments[`lesson_${selectedLesson?.id}`] || false}
        />
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
