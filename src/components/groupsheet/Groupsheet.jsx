import React, { useEffect, useMemo, useState } from "react";
import "./Groupsheet.css";


export default function CareerNavigator() {
  // --- State ---
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [redirectCountdownMs] = useState(3500); // ms before redirecting to dashboard

  // --- Static data (copied from your Alpine config) ---
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
    environment: {
      collaborative: "Collaborative team environment",
      independent: "Independent work",
      mixed: "Mix of both",
      "client-facing": "Client-facing role",
    },
    activities: {
      "problem-solving": "Solving complex problems",
      creative: "Creative design work",
      data: "Analyzing data and patterns",
      strategy: "Strategic planning",
    },
    techLevel: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      expert: "Expert",
    },
    priority: {
      salary: "High salary",
      balance: "Work-life balance",
      impact: "Positive impact",
      growth: "Career growth",
    },
  };

  const answerWeights = {
    environment: {
      collaborative: {
        "Software Developer": 5,
        "DevOps Engineer": 6,
        "UX Designer": 10,
        "UI Designer": 9,
        "Data Analyst": 5,
        "Business Intelligence Analyst": 6,
        "Product Manager": 10,
        "Project Manager": 10,
      },
      independent: {
        "Software Developer": 10,
        "DevOps Engineer": 9,
        "UX Designer": 5,
        "UI Designer": 6,
        "Data Analyst": 10,
        "Business Intelligence Analyst": 9,
        "Product Manager": 5,
        "Project Manager": 4,
      },
      mixed: {
        "Software Developer": 8,
        "DevOps Engineer": 8,
        "UX Designer": 8,
        "UI Designer": 8,
        "Data Analyst": 8,
        "Business Intelligence Analyst": 8,
        "Product Manager": 8,
        "Project Manager": 8,
      },
      "client-facing": {
        "Software Developer": 5,
        "DevOps Engineer": 4,
        "UX Designer": 5,
        "UI Designer": 5,
        "Data Analyst": 5,
        "Business Intelligence Analyst": 7,
        "Product Manager": 10,
        "Project Manager": 9,
      },
    },
    activities: {
      "problem-solving": {
        "Software Developer": 10,
        "DevOps Engineer": 10,
        "UX Designer": 3,
        "UI Designer": 2,
        "Data Analyst": 8,
        "Business Intelligence Analyst": 9,
        "Product Manager": 7,
        "Project Manager": 6,
      },
      creative: {
        "Software Developer": 3,
        "DevOps Engineer": 2,
        "UX Designer": 10,
        "UI Designer": 10,
        "Data Analyst": 2,
        "Business Intelligence Analyst": 3,
        "Product Manager": 5,
        "Project Manager": 4,
      },
      data: {
        "Software Developer": 5,
        "DevOps Engineer": 6,
        "UX Designer": 3,
        "UI Designer": 2,
        "Data Analyst": 10,
        "Business Intelligence Analyst": 10,
        "Product Manager": 6,
        "Project Manager": 5,
      },
      strategy: {
        "Software Developer": 4,
        "DevOps Engineer": 5,
        "UX Designer": 5,
        "UI Designer": 4,
        "Data Analyst": 6,
        "Business Intelligence Analyst": 7,
        "Product Manager": 10,
        "Project Manager": 10,
      },
    },
    techLevel: {
      beginner: {
        "Software Developer": 2,
        "DevOps Engineer": 2,
        "UX Designer": 5,
        "UI Designer": 6,
        "Data Analyst": 3,
        "Business Intelligence Analyst": 4,
        "Product Manager": 2,
        "Project Manager": 3,
      },
      intermediate: {
        "Software Developer": 5,
        "DevOps Engineer": 5,
        "UX Designer": 6,
        "UI Designer": 7,
        "Data Analyst": 6,
        "Business Intelligence Analyst": 6,
        "Product Manager": 5,
        "Project Manager": 5,
      },
      advanced: {
        "Software Developer": 8,
        "DevOps Engineer": 9,
        "UX Designer": 7,
        "UI Designer": 7,
        "Data Analyst": 8,
        "Business Intelligence Analyst": 8,
        "Product Manager": 7,
        "Project Manager": 6,
      },
      expert: {
        "Software Developer": 10,
        "DevOps Engineer": 10,
        "UX Designer": 8,
        "UI Designer": 8,
        "Data Analyst": 10,
        "Business Intelligence Analyst": 10,
        "Product Manager": 9,
        "Project Manager": 8,
      },
    },
    priority: {
      salary: {
        "Software Developer": 8,
        "DevOps Engineer": 9,
        "UX Designer": 6,
        "UI Designer": 5,
        "Data Analyst": 7,
        "Business Intelligence Analyst": 8,
        "Product Manager": 10,
        "Project Manager": 7,
      },
      balance: {
        "Software Developer": 6,
        "DevOps Engineer": 5,
        "UX Designer": 8,
        "UI Designer": 9,
        "Data Analyst": 7,
        "Business Intelligence Analyst": 7,
        "Product Manager": 6,
        "Project Manager": 7,
      },
      impact: {
        "Software Developer": 7,
        "DevOps Engineer": 7,
        "UX Designer": 7,
        "UI Designer": 6,
        "Data Analyst": 6,
        "Business Intelligence Analyst": 7,
        "Product Manager": 9,
        "Project Manager": 8,
      },
      growth: {
        "Software Developer": 9,
        "DevOps Engineer": 10,
        "UX Designer": 8,
        "UI Designer": 7,
        "Data Analyst": 8,
        "Business Intelligence Analyst": 8,
        "Product Manager": 10,
        "Project Manager": 9,
      },
    },
  };

  // --- Derived state: careers & groups (we make copies to mutate scores) ---
  const [careers, setCareers] = useState(() => careersInit.map(c => ({ ...c })));
  const [groups, setGroups] = useState(() => groupsInit.map(g => ({ ...g })));

  // --- Navigation helpers ---
  const nextStep = () => {
    setCurrentStep((s) => Math.min(s + 1, totalSteps));
  };
  const prevStep = () => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  // --- Handle answer selection ---
  function setAnswer(questionKey, value) {
    setAnswers((prev) => ({ ...prev, [questionKey]: value }));
  }

  // --- Calculate results logic (mirrors your Alpine method) ---
  function calculateResults() {
    // Reset scores
    const updatedCareers = careers.map(c => ({ ...c, score: 0, match: 0 }));
    const updatedGroups = groups.map(g => ({ ...g, score: 0, match: 0 }));

    // Accumulate career scores based on answers
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

    // Determine max career score to compute % match
    const maxCareerScore = Math.max(...updatedCareers.map(c => c.score), 1);
    updatedCareers.forEach(c => {
      c.match = Math.round((c.score / maxCareerScore) * 100);
    });

    // Compute group scores and match %
    updatedGroups.forEach(group => {
      const groupCareers = updatedCareers.filter(c => group.careers.includes(c.name));
      group.score = groupCareers.reduce((sum, c) => sum + c.score, 0) / Math.max(groupCareers.length, 1);
    });
    const maxGroupScore = Math.max(...updatedGroups.map(g => g.score), 1);
    updatedGroups.forEach(g => {
      g.match = Math.round((g.score / maxGroupScore) * 100);
    });

    // Commit updated scores
    setCareers(updatedCareers);
    setGroups(updatedGroups);

    // Show results and advance step beyond totalSteps
    setShowResults(true);
    setCurrentStep(totalSteps + 1);

    // After a short delay, redirect to dashboard
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, redirectCountdownMs);
  }

  // --- Computed helpers for rendering ---
  const sortedGroups = useMemo(() => {
    return [...groups].sort((a, b) => b.match - a.match);
  }, [groups]);

  const getCareersInGroup = (group) => {
    return [...careers]
      .filter(c => group.careers.includes(c.name))
      .sort((a, b) => b.match - a.match);
  };

  // Progress percentage (clamp to 100)
  const progressPercent = Math.round(
    Math.min(100, ((Math.min(currentStep, totalSteps) / totalSteps) * 100))
  );

  // --- Basic validation: disable Next if current question unanswered ---
  const isStepAnswered = (stepNum) => {
    switch (stepNum) {
      case 1: return !!answers.environment;
      case 2: return !!answers.activities;
      case 3: return !!answers.techLevel;
      case 4: return !!answers.priority;
      default: return true;
    }
  };

  // optional: show a small warning if user tries to advance without selecting
  function handleNext() {
    if (!isStepAnswered(currentStep)) {
      // simple alert (you can replace with nicer UI)
      alert("Please select an option before continuing.");
      return;
    }
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  }

  // Render
  return (
    <div className="career-quiz">
      <header>
        <nav className="container">
          <div className="logo">🎯 Career Navigator</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#demo">Assessment</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#testimonials">Success Stories</a></li>
          </ul>
        </nav>
      </header>

      <section id="home" className="hero">
        <div className="container">
          <h1>Find Your Perfect Career Path</h1>
          <p>Stop guessing about your future. Get personalized career recommendations based on your interests, skills, and real job market data.</p>
          <a href="#demo" className="main-cta">Take Free Career Assessment</a>
        </div>
      </section>

      <section id="demo" className="demo-section">
        <div className="container">
          <h2 style={{ textAlign: "center", color: "#2c3e50", fontSize: "2.5rem", marginBottom: "2rem" }}>
            Try It Now - Career Assessment
          </h2>

          <div className="demo-container">
            <div className="progress-bar" aria-hidden>
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%`, transition: "width 300ms ease" }}
              />
            </div>

            <p style={{ textAlign: "center", marginBottom: "2rem", color: "#6c757d" }}>
              Step <strong>{Math.min(currentStep, totalSteps)}</strong> of <strong>{totalSteps}</strong>
            </p>

            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="quiz-container active">
                <div className="question">
                  <h3>What type of work environment energizes you most?</h3>
                  <div className="options">
                    {Object.entries(questions.environment).map(([value, label]) => (
                      <label
                        key={value}
                        className={`option ${answers.environment === value ? "selected" : ""}`}
                        style={{ display: "block", marginBottom: "0.5rem", cursor: "pointer" }}
                      >
                        <input
                          type="radio"
                          name="environment"
                          value={value}
                          checked={answers.environment === value}
                          onChange={() => setAnswer("environment", value)}
                          style={{ marginRight: "0.5rem" }}
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="quiz-container active">
                <div className="question">
                  <h3>Which activities do you find most engaging?</h3>
                  <div className="options">
                    {Object.entries(questions.activities).map(([value, label]) => (
                      <label
                        key={value}
                        className={`option ${answers.activities === value ? "selected" : ""}`}
                        style={{ display: "block", marginBottom: "0.5rem", cursor: "pointer" }}
                      >
                        <input
                          type="radio"
                          name="activities"
                          value={value}
                          checked={answers.activities === value}
                          onChange={() => setAnswer("activities", value)}
                          style={{ marginRight: "0.5rem" }}
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="quiz-container active">
                <div className="question">
                  <h3>What's your current experience level with technology?</h3>
                  <div className="options">
                    {Object.entries(questions.techLevel).map(([value, label]) => (
                      <label
                        key={value}
                        className={`option ${answers.techLevel === value ? "selected" : ""}`}
                        style={{ display: "block", marginBottom: "0.5rem", cursor: "pointer" }}
                      >
                        <input
                          type="radio"
                          name="techLevel"
                          value={value}
                          checked={answers.techLevel === value}
                          onChange={() => setAnswer("techLevel", value)}
                          style={{ marginRight: "0.5rem" }}
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {currentStep === 4 && (
              <div className="quiz-container active">
                <div className="question">
                  <h3>What's most important to you in a career?</h3>
                  <div className="options">
                    {Object.entries(questions.priority).map(([value, label]) => (
                      <label
                        key={value}
                        className={`option ${answers.priority === value ? "selected" : ""}`}
                        style={{ display: "block", marginBottom: "0.5rem", cursor: "pointer" }}
                      >
                        <input
                          type="radio"
                          name="priority"
                          value={value}
                          checked={answers.priority === value}
                          onChange={() => setAnswer("priority", value)}
                          style={{ marginRight: "0.5rem" }}
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem" }}>
              <button
                onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
                className="secondary-cta"
                style={{ visibility: currentStep > 1 ? "visible" : "hidden" }}
              >
                Previous
              </button>

              <div>
                {currentStep < totalSteps && (
                  <button onClick={handleNext} className="main-cta">Next</button>
                )}
                {currentStep === totalSteps && (
                  <button
                    onClick={() => {
                      if (!isStepAnswered(totalSteps)) {
                        alert("Please select an option before continuing.");
                        return;
                      }
                      calculateResults();
                    }}
                    className="main-cta"
                  >
                    Get My Results
                  </button>
                )}
              </div>

              <div style={{ width: 90 }} /> {/* spacer */}
            </div>

            {/* Results */}
            {showResults && (
              <div className="results-container" style={{ marginTop: 24 }}>
                <h3 style={{ marginBottom: 8, fontSize: "1.8rem" }}>Assessment Complete! ✓</h3>
                <p style={{ marginBottom: 12, fontSize: "1.05rem" }}>
                  Great — we found career matches for you. You will be redirected to the Dashboard shortly.
                </p>

                <div style={{ display: "grid", gap: 12 }}>
                  <div>
                    <h4 style={{ marginBottom: 8 }}>Top career groups</h4>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      {sortedGroups.map((g) => (
                        <div key={g.name} style={{ minWidth: 220, padding: 12, borderRadius: 8, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                          <div style={{ fontWeight: 800 }}>{g.name}</div>
                          <div style={{ color: "#64748b", fontSize: 13 }}>{g.description}</div>
                          <div style={{ marginTop: 8, fontSize: 12 }}>Match: <strong>{g.match}%</strong></div>

                          <div style={{ marginTop: 8 }}>
                            <div style={{ fontSize: 13, color: "#334155", fontWeight: 700 }}>Careers</div>
                            {getCareersInGroup(g).map(c => (
                              <div key={c.name} style={{ marginTop: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                  <div style={{ fontWeight: 700 }}>{c.name}</div>
                                  <div style={{ fontSize: 12, color: "#64748b" }}>{c.salary} • growth: {c.growth}</div>
                                </div>
                                <div style={{ fontSize: 12, fontWeight: 700 }}>{c.match}%</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Features & Testimonials (static from original) */}
      <section id="features" className="features-showcase container" style={{ marginTop: 36 }}>
        <div className="feature-demo">
          <h3>🎯 Discover Your True Potential</h3>
          <p>Many people spend years in careers that don't align with their natural strengths and interests. Our assessment helps you identify career paths where you'll naturally excel and find fulfillment, saving you years of trial and error.</p>
        </div>
        <div className="feature-demo">
          <h3>📊 Data-Driven Insights</h3>
          <p>The test analyzes your work preferences, skills, and priorities against real-world career data. Instead of guessing what might fit, you get personalized matches based on proven success patterns in each field.</p>
        </div>
        <div className="feature-demo">
          <h3>💡 Avoid Costly Mistakes</h3>
          <p>Choosing the wrong career path can cost you time, money, and happiness. This assessment helps you make informed decisions before investing in education or training, ensuring your efforts lead to a career you'll love.</p>
        </div>
        <div className="feature-demo">
          <h3>🚀 Fast-Track Your Success</h3>
          <p>Understanding which careers match your profile means you can focus your energy on the right opportunities. Get clarity on your path forward, connect with relevant resources, and start building the career that's meant for you.</p>
        </div>
      </section>

      <section id="testimonials" className="testimonials container" style={{ marginTop: 36 }}>
        <h2 style={{ marginBottom: 16, fontSize: "2rem" }}>Success Stories</h2>
        <div className="testimonial-grid" style={{ display: "grid", gap: 12 }}>
          <div className="testimonial">
            <p className="testimonial-text">"This tool helped me find a career I truly enjoy. I landed my dream job in just 3 months!"</p>
            <p className="testimonial-author">— Alex P., Software Engineer</p>
          </div>
          <div className="testimonial">
            <p className="testimonial-text">"The skills gap analysis showed me exactly what I needed to learn to get promoted."</p>
            <p className="testimonial-author">— Maria R., UX Designer</p>
          </div>
          <div className="testimonial">
            <p className="testimonial-text">"I never knew which career fit me best until I took this assessment."</p>
            <p className="testimonial-author">— James L., Data Analyst</p>
          </div>
        </div>
      </section>

      <section className="cta-section container" style={{ marginTop: 36, marginBottom: 48 }}>
        <h2>Ready to Discover Your Career?</h2>
        <p>Take the free assessment now and unlock your personalized roadmap to success.</p>
        <a href="#demo" className="secondary-cta" style={{ marginRight: 8 }}>Start Assessment</a>
        <a href="#features" className="secondary-cta">Explore Features</a>
      </section>
    </div>
  );
}
