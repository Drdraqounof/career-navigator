import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FindMeGroups() {
  const navigate = useNavigate();
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const [groups, setGroups] = useState([
    {
      name: "Tech Builders",
      description: "You excel at creating technical solutions and building digital products.",
      careers: ["Software Developer", "DevOps Engineer"],
      score: 0,
      match: 0,
    },
    {
      name: "Creative Designers",
      description: "You thrive in visual and user-centered design.",
      careers: ["UX Designer", "UI Designer"],
      score: 0,
      match: 0,
    },
    {
      name: "Analytical Thinkers",
      description: "You love working with data and uncovering insights.",
      careers: ["Data Analyst", "Business Intelligence Analyst"],
      score: 0,
      match: 0,
    },
    {
      name: "Strategic Leaders",
      description: "You excel at big-picture thinking and leading teams.",
      careers: ["Product Manager", "Project Manager"],
      score: 0,
      match: 0,
    },
  ]);

  const [careers, setCareers] = useState([
    { name: "Software Developer", salary: "$95,000", growth: "23%", score: 0, match: 0, group: "Tech Builders" },
    { name: "DevOps Engineer", salary: "$105,000", growth: "28%", score: 0, match: 0, group: "Tech Builders" },
    { name: "UX Designer", salary: "$85,000", growth: "16%", score: 0, match: 0, group: "Creative Designers" },
    { name: "UI Designer", salary: "$80,000", growth: "14%", score: 0, match: 0, group: "Creative Designers" },
    { name: "Data Analyst", salary: "$75,000", growth: "25%", score: 0, match: 0, group: "Analytical Thinkers" },
    { name: "Business Intelligence Analyst", salary: "$82,000", growth: "22%", score: 0, match: 0, group: "Analytical Thinkers" },
    { name: "Product Manager", salary: "$115,000", growth: "19%", score: 0, match: 0, group: "Strategic Leaders" },
    { name: "Project Manager", salary: "$90,000", growth: "18%", score: 0, match: 0, group: "Strategic Leaders" },
  ]);

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
      collaborative: { "Software Developer": 5, "DevOps Engineer": 6, "UX Designer": 10, "UI Designer": 9, "Data Analyst": 5, "Business Intelligence Analyst": 6, "Product Manager": 10, "Project Manager": 10 },
      independent: { "Software Developer": 10, "DevOps Engineer": 9, "UX Designer": 5, "UI Designer": 6, "Data Analyst": 10, "Business Intelligence Analyst": 9, "Product Manager": 5, "Project Manager": 4 },
      mixed: { "Software Developer": 8, "DevOps Engineer": 8, "UX Designer": 8, "UI Designer": 8, "Data Analyst": 8, "Business Intelligence Analyst": 8, "Product Manager": 8, "Project Manager": 8 },
      "client-facing": { "Software Developer": 5, "DevOps Engineer": 4, "UX Designer": 5, "UI Designer": 5, "Data Analyst": 5, "Business Intelligence Analyst": 7, "Product Manager": 10, "Project Manager": 9 },
    },
    activities: {
      "problem-solving": { "Software Developer": 10, "DevOps Engineer": 10, "UX Designer": 3, "UI Designer": 2, "Data Analyst": 8, "Business Intelligence Analyst": 9, "Product Manager": 7, "Project Manager": 6 },
      creative: { "Software Developer": 3, "DevOps Engineer": 2, "UX Designer": 10, "UI Designer": 10, "Data Analyst": 2, "Business Intelligence Analyst": 3, "Product Manager": 5, "Project Manager": 4 },
      data: { "Software Developer": 5, "DevOps Engineer": 6, "UX Designer": 3, "UI Designer": 2, "Data Analyst": 10, "Business Intelligence Analyst": 10, "Product Manager": 6, "Project Manager": 5 },
      strategy: { "Software Developer": 4, "DevOps Engineer": 5, "UX Designer": 5, "UI Designer": 4, "Data Analyst": 6, "Business Intelligence Analyst": 7, "Product Manager": 10, "Project Manager": 10 },
    },
    techLevel: {
      beginner: { "Software Developer": 2, "DevOps Engineer": 2, "UX Designer": 5, "UI Designer": 6, "Data Analyst": 3, "Business Intelligence Analyst": 4, "Product Manager": 2, "Project Manager": 3 },
      intermediate: { "Software Developer": 5, "DevOps Engineer": 5, "UX Designer": 6, "UI Designer": 7, "Data Analyst": 6, "Business Intelligence Analyst": 6, "Product Manager": 5, "Project Manager": 5 },
      advanced: { "Software Developer": 8, "DevOps Engineer": 9, "UX Designer": 7, "UI Designer": 7, "Data Analyst": 8, "Business Intelligence Analyst": 8, "Product Manager": 7, "Project Manager": 6 },
      expert: { "Software Developer": 10, "DevOps Engineer": 10, "UX Designer": 8, "UI Designer": 8, "Data Analyst": 10, "Business Intelligence Analyst": 10, "Product Manager": 9, "Project Manager": 8 },
    },
    priority: {
      salary: { "Software Developer": 8, "DevOps Engineer": 9, "UX Designer": 6, "UI Designer": 5, "Data Analyst": 7, "Business Intelligence Analyst": 8, "Product Manager": 10, "Project Manager": 7 },
      balance: { "Software Developer": 6, "DevOps Engineer": 5, "UX Designer": 8, "UI Designer": 9, "Data Analyst": 7, "Business Intelligence Analyst": 7, "Product Manager": 6, "Project Manager": 7 },
      impact: { "Software Developer": 7, "DevOps Engineer": 7, "UX Designer": 7, "UI Designer": 6, "Data Analyst": 6, "Business Intelligence Analyst": 7, "Product Manager": 9, "Project Manager": 8 },
      growth: { "Software Developer": 9, "DevOps Engineer": 10, "UX Designer": 8, "UI Designer": 7, "Data Analyst": 8, "Business Intelligence Analyst": 8, "Product Manager": 10, "Project Manager": 9 },
    },
  };

  const handleChange = (question, value) => {
    setAnswers({ ...answers, [question]: value });
  };

  const nextStep = () => currentStep < totalSteps && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const calculateResults = () => {
    const updatedCareers = careers.map((c) => ({ ...c, score: 0 }));
    for (const question in answers) {
      const weights = answerWeights[question][answers[question]];
      for (const career in weights) {
        const idx = updatedCareers.findIndex((c) => c.name === career);
        if (idx !== -1) updatedCareers[idx].score += weights[career];
      }
    }

    const maxScore = Math.max(...updatedCareers.map((c) => c.score)) || 1;
    const normalizedCareers = updatedCareers.map((c) => ({
      ...c,
      match: Math.round((c.score / maxScore) * 100),
    }));

    const updatedGroups = groups.map((group) => {
      const groupCareers = normalizedCareers.filter((c) => c.group === group.name);
      const avg = groupCareers.length
        ? groupCareers.reduce((s, c) => s + c.match, 0) / groupCareers.length
        : 0;
      return { ...group, score: avg, match: Math.round(avg) };
    });

    setCareers(normalizedCareers);
    setGroups(updatedGroups);
    setShowResults(true);
    setTimeout(() => {
  navigate("/dashboard", {
    state: {
      topGroups: updatedGroups.sort((a, b) => b.match - a.match).slice(0, 2),
      topCareers: normalizedCareers.sort((a, b) => b.match - a.match).slice(0, 3),
    },
  });
}, 4000);

  };

  const questionKeys = Object.keys(questions);
  const currentQuestion = questionKeys[currentStep - 1];

  return (
    <div className="container">
      <style>{`
        .container { max-width: 700px; margin: auto; font-family: sans-serif; padding: 20px; }
        .question { margin-bottom: 30px; }
        .options label { display: block; margin: 10px 0; }
        .button-group button { margin-right: 10px; padding: 8px 16px; }
        .results { margin-top: 30px; }
        .group { border: 1px solid #ccc; padding: 10px; margin-bottom: 15px; border-radius: 5px; }
        .progress { background: #f0f0f0; height: 10px; border-radius: 5px; overflow: hidden; margin-bottom: 20px; }
        .progress-bar { background: #4caf50; height: 10px; transition: width 0.3s; }
      `}</style>

      <h2>Find My Group</h2>

      {!showResults ? (
        <>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
          </div>

          <div className="question">
            <h3>{`Question ${currentStep}: What best describes your preference for ${currentQuestion}?`}</h3>
            <div className="options">
              {Object.entries(questions[currentQuestion]).map(([key, label]) => (
                <label key={key}>
                  <input
                    type="radio"
                    name={currentQuestion}
                    value={key}
                    checked={answers[currentQuestion] === key}
                    onChange={() => handleChange(currentQuestion, key)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div className="button-group">
            {currentStep > 1 && <button onClick={prevStep}>Back</button>}
            {currentStep < totalSteps && <button onClick={nextStep}>Next</button>}
            {currentStep === totalSteps && <button onClick={calculateResults}>See Results</button>}
          </div>
        </>
      ) : (
        <div className="results">
          <h3>Your Top Matching Groups</h3>
          {groups
            .sort((a, b) => b.match - a.match)
            .slice(0, 2)
            .map((group) => (
              <div className="group" key={group.name}>
                <h4>{group.name}</h4>
                <p>{group.description}</p>
                <p><strong>Match Score:</strong> {group.match}%</p>
              </div>
            ))}
          <p>Redirecting to your personalized dashboard...</p>
        </div>
      )}
    </div>
  );
}

