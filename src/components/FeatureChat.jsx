import React, { useState, useEffect } from "react";
import { findAI } from "../FindAI";

const featurePrompts = {
  "College Path Finder": {
    fields: [
      { id: "gpa", label: "What's your current GPA?", type: "number", placeholder: "e.g., 3.8" },
      { id: "interests", label: "What are your main academic interests?", type: "text", placeholder: "e.g., Computer Science, Biology" },
      { id: "location", label: "Preferred college locations?", type: "text", placeholder: "e.g., East Coast, California" },
      { id: "budget", label: "What's your yearly college budget?", type: "text", placeholder: "e.g., $30,000" }
    ],
    generatePrompt: (data) => `Help me find colleges that match my profile:
      - GPA: ${data.gpa}
      - Interests: ${data.interests}
      - Preferred Locations: ${data.location}
      - Yearly Budget: ${data.budget}
      Please suggest specific colleges and explain why they would be a good fit.`
  },
  "Academic Strength Analysis": {
    fields: [
      { id: "subjects", label: "List your current subjects and grades", type: "text", placeholder: "e.g., Math A, English B+" },
      { id: "favorite", label: "Which subjects do you enjoy most?", type: "text", placeholder: "e.g., Mathematics, Physics" },
      { id: "goals", label: "What are your career goals?", type: "text", placeholder: "e.g., Software Engineer, Doctor" }
    ],
    generatePrompt: (data) => `Analyze my academic profile:
      - Current Subjects & Grades: ${data.subjects}
      - Favorite Subjects: ${data.favorite}
      - Career Goals: ${data.goals}
      Please identify my academic strengths and suggest potential career paths.`
  },
  "Extracurricular Planner": {
    fields: [
      { id: "current", label: "Current extracurricular activities?", type: "text", placeholder: "e.g., Debate Club, Soccer" },
      { id: "interests", label: "What interests would you like to explore?", type: "text", placeholder: "e.g., Leadership, Community Service" },
      { id: "time", label: "Hours available per week?", type: "number", placeholder: "e.g., 10" },
      { id: "goals", label: "What do you want to achieve?", type: "text", placeholder: "e.g., Develop leadership skills" }
    ],
    generatePrompt: (data) => `Help me plan my extracurricular activities:
      - Current Activities: ${data.current}
      - Interests to Explore: ${data.interests}
      - Available Time: ${data.time} hours/week
      - Goals: ${data.goals}
      Please suggest activities and create a balanced schedule.`
  },
  "Job Market Navigator": {
    fields: [
      { id: "degree", label: "What degree did you recently complete?", type: "text", placeholder: "e.g., B.S. in Marketing" },
      { id: "skills", label: "List your core technical and soft skills", type: "text", placeholder: "e.g., SQL, Data Analysis, Communication" },
      { id: "industries", label: "Which industries interest you most?", type: "text", placeholder: "e.g., Tech, Healthcare, Finance" },
      { id: "locations", label: "Preferred job locations?", type: "text", placeholder: "e.g., Remote, New York, Austin" },
      { id: "salary", label: "What salary range are you targeting?", type: "text", placeholder: "e.g., $60,000 - $75,000" }
    ],
    generatePrompt: (data) => `Help me find entry-level job opportunities:
      - Degree: ${data.degree}
      - Core Skills: ${data.skills}
      - Target Industries: ${data.industries}
      - Preferred Locations: ${data.locations}
      - Salary Range: ${data.salary}
      Provide specific roles, explain why they fit, and suggest next steps to apply.`
  },
  "Resume & Portfolio Builder": {
    fields: [
      { id: "summary", label: "Describe your professional summary", type: "text", placeholder: "e.g., Detail-oriented finance graduate with analytics experience" },
      { id: "experience", label: "Highlight key experiences or internships", type: "text", placeholder: "e.g., Marketing intern at XYZ, research assistant" },
      { id: "skills", label: "List key skills to spotlight", type: "text", placeholder: "e.g., UX Design, Figma, Collaboration" },
      { id: "projects", label: "Notable projects or portfolio links?", type: "text", placeholder: "e.g., Portfolio at example.com" }
    ],
    generatePrompt: (data) => `Help me refine my resume and portfolio:
      - Professional Summary: ${data.summary}
      - Key Experiences: ${data.experience}
      - Skills to Highlight: ${data.skills}
      - Projects/Portfolio: ${data.projects}
      Provide resume bullet suggestions and portfolio improvements tailored to entry-level roles.`
  },
  "Interview Prep Coach": {
    fields: [
      { id: "role", label: "What role are you interviewing for?", type: "text", placeholder: "e.g., Junior Product Manager" },
      { id: "company", label: "Company or company type?", type: "text", placeholder: "e.g., SaaS startup, Fortune 500" },
      { id: "stage", label: "Which interview stage are you preparing for?", type: "text", placeholder: "e.g., Behavioral, Technical, Final Round" },
      { id: "challenges", label: "Areas you feel least confident about?", type: "text", placeholder: "e.g., Behavioral stories, case questions" }
    ],
    generatePrompt: (data) => `Help me prepare for an interview:
      - Target Role: ${data.role}
      - Company Context: ${data.company}
      - Interview Stage: ${data.stage}
      - Confidence Gaps: ${data.challenges}
      Provide tailored practice questions, recommended responses, and tips for improvement.`
  }
};

export default function FeatureChat({ feature, onClose }) {
  // Get user's name from localStorage (set in Login.jsx)
  let userName = "";
  try {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.firstName) {
      userName = userData.firstName + (userData.lastName ? ` ${userData.lastName}` : "");
    }
  } catch (e) {}
  const [formData, setFormData] = useState({});
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  // Normalize feature title to match keys in featurePrompts (remove emoji and trim)
  function normalizeTitle(title) {
    // Remove leading emoji and whitespace, then trim
    return title.replace(/^[^a-zA-Z0-9]+\s*/, "").trim();
  }
  const normalizedTitle = normalizeTitle(feature.title);
  const prompts = featurePrompts[normalizedTitle] || null;

  // If prompts is null, show error message
  if (!prompts) {
    return (
      <div style={{ padding: "24px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "20px", color: "#2d3748" }}>
          {feature.title}
        </h2>
        <div style={{ color: "#e53e3e", fontWeight: "600", fontSize: "1.1rem", marginBottom: "12px" }}>
          This feature is not yet supported for personalized chat.
        </div>
        <button
          onClick={onClose}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "8px"
          }}
        >
          Close
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowChat(true);
    setLoading(true);

    try {
      let initialPrompt = prompts.generatePrompt(formData);
      if (userName) {
        initialPrompt = `User name: ${userName}\n` + initialPrompt;
      }
      const response = await findAI(initialPrompt);
      setMessages([
        { sender: "system", text: "Information collected successfully! Starting personalized assistance..." },
        { sender: "ai", text: response }
      ]);
    } catch (error) {
      console.error("AI fetch error:", error);
      setMessages([
        { sender: "system", text: "Error starting the conversation. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const aiResponse = await findAI(input);
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    } catch (error) {
      console.error("AI fetch error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "system", text: "Error getting response. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ 
        fontSize: "1.5rem", 
        fontWeight: "600", 
        marginBottom: "20px",
        color: "#2d3748"
      }}>
        {feature.title}
      </h2>
      
      {!showChat ? (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {prompts?.fields.map((field) => (
            <div key={field.id} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontSize: "0.95rem", fontWeight: "500", color: "#4a5568" }}>
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.id] || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                required
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  fontSize: "0.95rem"
                }}
              />
            </div>
          ))}
          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "8px"
            }}
          >
            Start Personalized Chat
          </button>
        </form>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{
            height: "300px",
            overflowY: "auto",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "16px",
            background: "#f8fafc"
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: "12px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  maxWidth: "80%",
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  background: msg.sender === "user" 
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : msg.sender === "system" ? "#48bb78" : "white",
                  color: msg.sender === "user" || msg.sender === "system" ? "white" : "#2d3748",
                  border: msg.sender === "ai" ? "1px solid #e2e8f0" : "none"
                }}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div style={{ color: "#718096", fontStyle: "italic" }}>Thinking...</div>}
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                fontSize: "0.95rem"
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              style={{
                padding: "12px 24px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                borderRadius: "8px",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                opacity: loading ? 0.7 : 1
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}