import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Load stored user data if available and check if assessment is completed
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("userData"));
    const assessmentCompleted = localStorage.getItem("assessmentCompleted");
    
    if (savedData) {
      setEmail(savedData.email || "");
      setFirstName(savedData.firstName || "");
      setLastName(savedData.lastName || "");
      
      // If assessment is already completed, go directly to dashboard
      if (assessmentCompleted === "true") {
        navigate('/dashboard');
      } else {
        setCurrentPage("complete");
      }
    }
  }, [navigate]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setCurrentPage("name");
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      firstName,
      lastName,
      submittedAt: new Date().toISOString(),
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log("User data saved:", userData);
    setCurrentPage("complete");
  };

  const handleStartOver = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setCurrentPage("login");
    localStorage.removeItem("userData");
    localStorage.removeItem("assessmentCompleted");
  };

  // Step label helper
  const getStep = () => {
    if (currentPage === "login") return "Step 1 of 3";
    if (currentPage === "name") return "Step 2 of 3";
    return "Step 3 of 3";
  };

  // LOGIN PAGE
  if (currentPage === "login") {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <p style={styles.step}>{getStep()}</p>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Log in to continue your career journey</p>

          <form onSubmit={handleLoginSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>

            <button
              type="submit"
              style={{
                ...styles.button,
                opacity: !email || !password ? 0.6 : 1,
                cursor: !email || !password ? "not-allowed" : "pointer",
              }}
              disabled={!email || !password}
            >
              Log In
            </button>
          </form>

          <div style={styles.extraLinks}>
            <a href="#" style={styles.link}>
              Forgot Password?
            </a>{" "}
            |{" "}
            <a href="#" style={styles.link}>
              Create Account
            </a>
          </div>
        </div>
      </div>
    );
  }

  // NAME PAGE
  if (currentPage === "name") {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <p style={styles.step}>{getStep()}</p>
          <h1 style={styles.title}>Tell Us About You</h1>
          <p style={styles.subtitle}>Let's personalize your experience</p>

          <form onSubmit={handleNameSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="firstName" style={styles.label}>
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="John"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="lastName" style={styles.label}>
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Doe"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={styles.input}
              />
            </div>

            <button
              type="submit"
              style={{
                ...styles.button,
                opacity: !firstName || !lastName ? 0.6 : 1,
                cursor: !firstName || !lastName ? "not-allowed" : "pointer",
              }}
              disabled={!firstName || !lastName}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    );
  }

  // SUCCESS PAGE
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <p style={styles.step}>{getStep()}</p>
        <h1 style={styles.title}>Welcome, {firstName}!</h1>
        <p style={styles.subtitle}>Your profile has been set up successfully.</p>
        <div style={styles.successInfo}>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Name:</strong> {firstName} {lastName}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleStartOver} style={{ ...styles.button, flex: 1, background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)' }}>
            Start Over
          </button>
          <button onClick={() => {
            const assessmentCompleted = localStorage.getItem("assessmentCompleted");
            if (assessmentCompleted === "true") {
              navigate('/dashboard');
            } else {
              navigate('/test');
            }
          }} style={{ ...styles.button, flex: 1, background: 'linear-gradient(45deg, #667eea, #764ba2)' }}>
            {localStorage.getItem("assessmentCompleted") === "true" ? 'Go to Dashboard' : 'Continue to Assessment'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- STYLES ----------
const styles = {
  page: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#333",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.5s ease",
  },
  container: {
    background: "#fff",
    padding: "2.5rem",
    borderRadius: "15px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    animation: "fadeIn 0.4s ease-in-out",
  },
  step: {
    fontWeight: 600,
    color: "#667eea",
    marginBottom: "1rem",
  },
  title: { marginBottom: "1rem", fontSize: "2rem", color: "#2c3e50" },
  subtitle: { marginBottom: "2rem", color: "#6c757d" },
  form: { width: "100%" },
  formGroup: { marginBottom: "1.5rem", textAlign: "left" },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: 500,
    color: "#2c3e50",
  },
  input: {
    width: "100%",
    padding: "0.8rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    transition: "border 0.3s",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "1rem",
    border: "none",
    borderRadius: "50px",
    background: "linear-gradient(45deg, #ff6b6b, #ee5a52)",
    color: "white",
    fontSize: "1.1rem",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "1rem",
    boxShadow: "0 8px 25px rgba(255, 107, 107, 0.3)",
    transition: "all 0.3s",
  },
  extraLinks: {
    marginTop: "1.5rem",
    fontSize: "0.9rem",
    color: "#6c757d",
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: 500,
    margin: "0 0.5rem",
  },
  successInfo: {
    textAlign: "left",
    background: "#f8f9fa",
    padding: "1.5rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    color: "#2c3e50",
  },
};
