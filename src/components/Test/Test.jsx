import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// Constants
const TOTAL_STEPS = 4;

const QUESTION_KEYS = {
  ENVIRONMENT: 'environment',
  ACTIVITIES: 'activities',
  TECH_LEVEL: 'techLevel',
  PRIORITY: 'priority'
};

export default function CareerNavigator() {
  const navigate = useNavigate();
  // --- State ---
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Check if user is logged in and has already completed assessment
  React.useEffect(() => {
    const userData = localStorage.getItem("userData");
    const assessmentCompleted = localStorage.getItem("assessmentCompleted");
    
    if (userData && assessmentCompleted === "true") {
      // User is logged in and already completed assessment, redirect to dashboard
      navigate('/dashboard');
    } else if (!userData) {
      // User is not logged in, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  // --- Static data ---
  const groupsInit = [
    {
      name: "Tech Builders",
      description:
        "You excel at creating technical solutions and building digital products. Careers in this group focus on coding, architecture, and system design.",
      careers: ["Software Developer", "DevOps Engineer"],
      score: 0,
      match: 0,
    },
    {
      name: "Creative Designers",
      description:
        "You thrive in visual and user-centered design. These careers blend creativity with user experience to craft engaging digital experiences.",
      careers: ["UX Designer", "UI Designer"],
      score: 0,
      match: 0,
    },
    {
      name: "Analytical Thinkers",
      description:
        "You love working with data and uncovering insights. These careers involve analysis, pattern recognition, and data-driven decision making.",
      careers: ["Data Analyst", "Business Intelligence Analyst"],
      score: 0,
      match: 0,
    },
    {
      name: "Strategic Leaders",
      description:
        "You excel at big-picture thinking and leading teams. These careers focus on strategy, stakeholder management, and product vision.",
      careers: ["Product Manager", "Project Manager"],
      score: 0,
      match: 0,
    },
  ];

  const careersInit = [
    { name: "Software Developer", salary: "$95,000", growth: "23%", score: 0, match: 0, group: "Tech Builders" },
    { name: "DevOps Engineer", salary: "$105,000", growth: "28%", score: 0, match: 0, group: "Tech Builders" },
    { name: "UX Designer", salary: "$85,000", growth: "16%", score: 0, match: 0, group: "Creative Designers" },
    { name: "UI Designer", salary: "$80,000", growth: "14%", score: 0, match: 0, group: "Creative Designers" },
    { name: "Data Analyst", salary: "$75,000", growth: "25%", score: 0, match: 0, group: "Analytical Thinkers" },
    { name: "Business Intelligence Analyst", salary: "$82,000", growth: "22%", score: 0, match: 0, group: "Analytical Thinkers" },
    { name: "Product Manager", salary: "$115,000", growth: "19%", score: 0, match: 0, group: "Strategic Leaders" },
    { name: "Project Manager", salary: "$90,000", growth: "18%", score: 0, match: 0, group: "Strategic Leaders" },
  ];

  const questions = {
    [QUESTION_KEYS.ENVIRONMENT]: {
      collaborative: "Collaborative team environment",
      independent: "Independent work",
      mixed: "Mix of both",
      "client-facing": "Client-facing role",
    },
    [QUESTION_KEYS.ACTIVITIES]: {
      "problem-solving": "Solving complex problems",
      creative: "Creative design work",
      data: "Analyzing data and patterns",
      strategy: "Strategic planning",
    },
    [QUESTION_KEYS.TECH_LEVEL]: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      expert: "Expert",
    },
    [QUESTION_KEYS.PRIORITY]: {
      salary: "High salary",
      balance: "Work-life balance",
      impact: "Positive impact",
      growth: "Career growth",
    },
  };

  const answerWeights = {
    environment: {
      collaborative: {
        "Software Developer": 5, "DevOps Engineer": 6, "UX Designer": 10, "UI Designer": 9,
        "Data Analyst": 5, "Business Intelligence Analyst": 6, "Product Manager": 10, "Project Manager": 10,
      },
      independent: {
        "Software Developer": 10, "DevOps Engineer": 9, "UX Designer": 5, "UI Designer": 6,
        "Data Analyst": 10, "Business Intelligence Analyst": 9, "Product Manager": 5, "Project Manager": 4,
      },
      mixed: {
        "Software Developer": 8, "DevOps Engineer": 8, "UX Designer": 8, "UI Designer": 8,
        "Data Analyst": 8, "Business Intelligence Analyst": 8, "Product Manager": 8, "Project Manager": 8,
      },
      "client-facing": {
        "Software Developer": 5, "DevOps Engineer": 4, "UX Designer": 5, "UI Designer": 5,
        "Data Analyst": 5, "Business Intelligence Analyst": 7, "Product Manager": 10, "Project Manager": 9,
      },
    },
    activities: {
      "problem-solving": {
        "Software Developer": 10, "DevOps Engineer": 10, "UX Designer": 3, "UI Designer": 2,
        "Data Analyst": 8, "Business Intelligence Analyst": 9, "Product Manager": 7, "Project Manager": 6,
      },
      creative: {
        "Software Developer": 3, "DevOps Engineer": 2, "UX Designer": 10, "UI Designer": 10,
        "Data Analyst": 2, "Business Intelligence Analyst": 3, "Product Manager": 5, "Project Manager": 4,
      },
      data: {
        "Software Developer": 5, "DevOps Engineer": 6, "UX Designer": 3, "UI Designer": 2,
        "Data Analyst": 10, "Business Intelligence Analyst": 10, "Product Manager": 6, "Project Manager": 5,
      },
      strategy: {
        "Software Developer": 4, "DevOps Engineer": 5, "UX Designer": 5, "UI Designer": 4,
        "Data Analyst": 6, "Business Intelligence Analyst": 7, "Product Manager": 10, "Project Manager": 10,
      },
    },
    techLevel: {
      beginner: {
        "Software Developer": 2, "DevOps Engineer": 2, "UX Designer": 5, "UI Designer": 6,
        "Data Analyst": 3, "Business Intelligence Analyst": 4, "Product Manager": 2, "Project Manager": 3,
      },
      intermediate: {
        "Software Developer": 5, "DevOps Engineer": 5, "UX Designer": 6, "UI Designer": 7,
        "Data Analyst": 6, "Business Intelligence Analyst": 6, "Product Manager": 5, "Project Manager": 5,
      },
      advanced: {
        "Software Developer": 8, "DevOps Engineer": 9, "UX Designer": 7, "UI Designer": 7,
        "Data Analyst": 8, "Business Intelligence Analyst": 8, "Product Manager": 7, "Project Manager": 6,
      },
      expert: {
        "Software Developer": 10, "DevOps Engineer": 10, "UX Designer": 8, "UI Designer": 8,
        "Data Analyst": 10, "Business Intelligence Analyst": 10, "Product Manager": 9, "Project Manager": 8,
      },
    },
    priority: {
      salary: {
        "Software Developer": 8, "DevOps Engineer": 9, "UX Designer": 6, "UI Designer": 5,
        "Data Analyst": 7, "Business Intelligence Analyst": 8, "Product Manager": 10, "Project Manager": 7,
      },
      balance: {
        "Software Developer": 6, "DevOps Engineer": 5, "UX Designer": 8, "UI Designer": 9,
        "Data Analyst": 7, "Business Intelligence Analyst": 7, "Product Manager": 6, "Project Manager": 7,
      },
      impact: {
        "Software Developer": 7, "DevOps Engineer": 7, "UX Designer": 7, "UI Designer": 6,
        "Data Analyst": 6, "Business Intelligence Analyst": 7, "Product Manager": 9, "Project Manager": 8,
      },
      growth: {
        "Software Developer": 9, "DevOps Engineer": 10, "UX Designer": 8, "UI Designer": 7,
        "Data Analyst": 8, "Business Intelligence Analyst": 8, "Product Manager": 10, "Project Manager": 9,
      },
    },
  };

  const [careers, setCareers] = useState(() => careersInit.map(c => ({ ...c })));
  const [groups, setGroups] = useState(() => groupsInit.map(g => ({ ...g })));

  // --- Question configuration ---
  const questionConfig = {
    1: { 
      key: QUESTION_KEYS.ENVIRONMENT, 
      title: 'What type of work environment energizes you most?', 
      options: questions[QUESTION_KEYS.ENVIRONMENT] 
    },
    2: { 
      key: QUESTION_KEYS.ACTIVITIES, 
      title: 'Which activities do you find most engaging?', 
      options: questions[QUESTION_KEYS.ACTIVITIES] 
    },
    3: { 
      key: QUESTION_KEYS.TECH_LEVEL, 
      title: "What's your current experience level with technology?", 
      options: questions[QUESTION_KEYS.TECH_LEVEL] 
    },
    4: { 
      key: QUESTION_KEYS.PRIORITY, 
      title: "What's most important to you in a career?", 
      options: questions[QUESTION_KEYS.PRIORITY] 
    },
  };

  // --- Handle answer selection ---
  function setAnswer(questionKey, value) {
    setAnswers((prev) => ({ ...prev, [questionKey]: value }));
    setErrorMessage("");
  }

  // --- Validation ---
  const isStepAnswered = (stepNum) => {
    const config = questionConfig[stepNum];
    return config ? !!answers[config.key] : true;
  };

  // --- Navigation ---
  const nextStep = () => {
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const prevStep = () => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const goToDashboard = () => {
    // Mark assessment as completed
    localStorage.setItem("assessmentCompleted", "true");
    navigate("/dashboard");
  };

  function handleNext() {
    if (!isStepAnswered(currentStep)) {
      setErrorMessage("Please select an option before continuing.");
      return;
    }
    setErrorMessage("");
    nextStep();
  }

  function handlePrevious() {
    setErrorMessage("");
    prevStep();
  }

  // --- Calculate results ---
  function calculateResults() {
    if (!isStepAnswered(TOTAL_STEPS)) {
      setErrorMessage("Please select an option before continuing.");
      return;
    }

    const updatedCareers = careers.map(c => ({ ...c, score: 0, match: 0 }));
    const updatedGroups = groups.map(g => ({ ...g, score: 0, match: 0 }));

    // Accumulate career scores
    for (const questionKey of Object.keys(answers)) {
      const answerValue = answers[questionKey];
      const weightsForQuestion = answerWeights[questionKey]?.[answerValue];
      if (!weightsForQuestion) continue;

      for (const careerName of Object.keys(weightsForQuestion)) {
        const weight = weightsForQuestion[careerName] || 0;
        const careerObj = updatedCareers.find(c => c.name === careerName);
        if (careerObj) careerObj.score += weight;
      }
    }

    // Calculate career match percentages
    const maxCareerScore = Math.max(...updatedCareers.map(c => c.score), 1);
    if (maxCareerScore > 0) {
      updatedCareers.forEach(c => {
        c.match = Math.round((c.score / maxCareerScore) * 100);
      });
    }

    // Calculate group scores
    updatedGroups.forEach(group => {
      const groupCareers = updatedCareers.filter(c => group.careers.includes(c.name));
      if (groupCareers.length > 0) {
        group.score = groupCareers.reduce((sum, c) => sum + c.score, 0) / groupCareers.length;
      }
    });

    const maxGroupScore = Math.max(...updatedGroups.map(g => g.score), 1);
    if (maxGroupScore > 0) {
      updatedGroups.forEach(g => {
        g.match = Math.round((g.score / maxGroupScore) * 100);
      });
    }

    setCareers(updatedCareers);
    setGroups(updatedGroups);
    setShowResults(true);
    setCurrentStep(TOTAL_STEPS + 1);
  }

  // --- Memoized sorted data ---
  const sortedGroups = useMemo(() => {
    return [...groups].sort((a, b) => b.match - a.match);
  }, [groups]);

  const careersByGroup = useMemo(() => {
    const map = {};
    groups.forEach(group => {
      map[group.name] = [...careers]
        .filter(c => group.careers.includes(c.name))
        .sort((a, b) => b.match - a.match);
    });
    return map;
  }, [careers, groups]);

  // --- Progress ---
  const progressPercent = Math.round(
    Math.min(100, ((Math.min(currentStep, TOTAL_STEPS) / TOTAL_STEPS) * 100))
  );

  // --- Render question ---
  const renderQuestion = (step) => {
    const config = questionConfig[step];
    if (!config) return null;

    return (
      <div className="quiz-container active">
        <div className="question">
          <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "#2c3e50" }}>
            {config.title}
          </h3>
          <div className="options" role="radiogroup" aria-label={config.title}>
            {Object.entries(config.options).map(([value, label]) => (
              <label
                key={value}
                className={`option ${answers[config.key] === value ? "selected" : ""}`}
                style={{
                  display: "block",
                  marginBottom: "0.75rem",
                  padding: "1rem",
                  border: "2px solid",
                  borderColor: answers[config.key] === value ? "#3498db" : "#e0e0e0",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: answers[config.key] === value ? "#e3f2fd" : "#fff",
                  transition: "all 0.2s ease"
                }}
              >
                <input
                  type="radio"
                  name={config.key}
                  value={value}
                  checked={answers[config.key] === value}
                  onChange={() => setAnswer(config.key, value)}
                  style={{ marginRight: "0.75rem" }}
                />
                <span style={{ fontSize: "1.05rem" }}>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#fff", borderBottom: "1px solid #e0e0e0", padding: "1rem 0" }}>
        <nav style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#3498db" }}>🎯 Career Navigator</div>
        </nav>
      </header>

      {/* Assessment */}
      <section style={{ padding: "4rem 1rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", color: "#2c3e50", fontSize: "2.5rem", marginBottom: "1rem" }}>
            Career Assessment
          </h2>
          <p style={{ textAlign: "center", color: "#555", fontSize: "1.1rem", marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
            Answer 4 quick questions to discover your ideal career path. Our assessment analyzes your work preferences, skills, and priorities to match you with careers where you'll thrive. Takes less than 2 minutes!
          </p>

          <div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "2rem", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
            {/* Progress Bar */}
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ height: "8px", backgroundColor: "#e0e0e0", borderRadius: "4px", overflow: "hidden" }}>
                <div
                  style={{
                    width: `${progressPercent}%`,
                    height: "100%",
                    backgroundColor: "#3498db",
                    transition: "width 300ms ease"
                  }}
                  role="progressbar"
                  aria-valuenow={progressPercent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </div>

            <p style={{ textAlign: "center", marginBottom: "2rem", color: "#6c757d" }}>
              Step <strong>{Math.min(currentStep, TOTAL_STEPS)}</strong> of <strong>{TOTAL_STEPS}</strong>
            </p>

            {/* Error Message */}
            {errorMessage && (
              <div style={{ padding: "1rem", backgroundColor: "#fee", border: "1px solid #fcc", borderRadius: "8px", marginBottom: "1rem", color: "#c33" }} role="alert">
                {errorMessage}
              </div>
            )}

            {/* Questions */}
            {currentStep <= TOTAL_STEPS && renderQuestion(currentStep)}

            {/* Navigation */}
            {!showResults && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem" }}>
                <button
                  onClick={handlePrevious}
                  style={{
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#6c757d",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    visibility: currentStep > 1 ? "visible" : "hidden"
                  }}
                >
                  Previous
                </button>

                <div>
                  {currentStep < TOTAL_STEPS && (
                    <button
                      onClick={handleNext}
                      style={{
                        padding: "0.75rem 1.5rem",
                        backgroundColor: "#3498db",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold"
                      }}
                    >
                      Next
                    </button>
                  )}
                  {currentStep === TOTAL_STEPS && (
                    <button
                      onClick={calculateResults}
                      style={{
                        padding: "0.75rem 1.5rem",
                        backgroundColor: "#27ae60",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold"
                      }}
                    >
                      Get My Results
                    </button>
                  )}
                </div>

                <div style={{ width: 90 }} />
              </div>
            )}

            {/* Results */}
            {showResults && (
              <div style={{ marginTop: "2rem" }} role="region" aria-live="polite">
                <h3 style={{ marginBottom: "1rem", fontSize: "1.8rem", color: "#27ae60" }}>
                  Assessment Complete! ✓
                </h3>
                <p style={{ marginBottom: "1.5rem", fontSize: "1.05rem" }}>
                  Great — we found career matches for you. Review your results below!
                </p>


         {/* Dashboard Button */}
<div style={{ marginBottom: "2rem", textAlign: "center" }}>
  <button
    onClick={goToDashboard}
    style={{
      padding: "1rem 2.5rem",
      backgroundColor: "#3498db",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "1.1rem",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      transition: "all 0.2s ease"
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#2980b9")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#3498db")}
  >
    Go to Dashboard →
  </button>
  <p
    style={{
      marginTop: "0.5rem",
      fontSize: "0.9rem",
      color: "#6c757d"
    }}
  >
    View your full career roadmap and personalized recommendations
  </p>
</div>


                <div style={{ marginTop: "1.5rem" }}>
                  <h4 style={{ marginBottom: "1rem", fontSize: "1.3rem" }}>Top Career Groups</h4>
                  <div style={{ display: "grid", gap: "1rem" }}>
                    {sortedGroups.map((g) => (
                      <div key={g.name} style={{ padding: "1.5rem", borderRadius: "8px", backgroundColor: "#f8f9fa", border: "1px solid #e0e0e0" }}>
                        <div style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: "0.5rem" }}>{g.name}</div>
                        <div style={{ color: "#64748b", fontSize: "0.95rem", marginBottom: "0.75rem" }}>{g.description}</div>
                        <div style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>
                          Match: <strong style={{ color: "#3498db", fontSize: "1.1rem" }}>{g.match}%</strong>
                        </div>

                        <div>
                          <div style={{ fontSize: "0.95rem", color: "#334155", fontWeight: "bold", marginBottom: "0.5rem" }}>
                            Top Careers
                          </div>
                          {careersByGroup[g.name]?.map(c => (
                            <div key={c.name} style={{ marginTop: "0.75rem", padding: "0.75rem", backgroundColor: "#fff", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div>
                                <div style={{ fontWeight: "bold" }}>{c.name}</div>
                                <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                                  {c.salary} • Growth: {c.growth}
                                </div>
                              </div>
                              <div style={{ fontSize: "1rem", fontWeight: "bold", color: "#3498db" }}>
                                {c.match}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "4rem 1rem", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center" }}>Why Career Assessment Matters</h2>
          <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>🎯 Discover Your True Potential</h3>
              <p style={{ color: "#555" }}>
                Many people spend years in careers that don't align with their natural strengths and interests. Our assessment helps you identify career paths where you'll naturally excel and find fulfillment, saving you years of trial and error.
              </p>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>📊 Data-Driven Insights</h3>
              <p style={{ color: "#555" }}>
                The test analyzes your work preferences, skills, and priorities against real-world career data. Instead of guessing what might fit, you get personalized matches based on proven success patterns in each field.
              </p>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>💡 Avoid Costly Mistakes</h3>
              <p style={{ color: "#555" }}>
                Choosing the wrong career path can cost you time, money, and happiness. This assessment helps you make informed decisions before investing in education or training, ensuring your efforts lead to a career you'll love.
              </p>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>🚀 Fast-Track Your Success</h3>
              <p style={{ color: "#555" }}>
                Understanding which careers match your profile means you can focus your energy on the right opportunities. Get clarity on your path forward, connect with relevant resources, and start building the career that's meant for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "4rem 1rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ marginBottom: "2rem", fontSize: "2rem", textAlign: "center" }}>Success Stories</h2>
          <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            <div style={{ padding: "1.5rem", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              <p style={{ fontStyle: "italic", marginBottom: "1rem" }}>
                "This tool helped me find a career I truly enjoy. I landed my dream job in just 3 months!"
              </p>
              <p style={{ fontWeight: "bold", color: "#3498db" }}>— Alex P., Software Engineer</p>
            </div>
            <div style={{ padding: "1.5rem", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              <p style={{ fontStyle: "italic", marginBottom: "1rem" }}>
                "The skills gap analysis showed me exactly what I needed to learn to get promoted."
              </p>
              <p style={{ fontWeight: "bold", color: "#3498db" }}>— Maria R., UX Designer</p>
            </div>
            <div style={{ padding: "1.5rem", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              <p style={{ fontStyle: "italic", marginBottom: "1rem" }}>
                "I never knew which career fit me best until I took this assessment."
              </p>
              <p style={{ fontWeight: "bold", color: "#3498db" }}>— James L., Data Analyst</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}