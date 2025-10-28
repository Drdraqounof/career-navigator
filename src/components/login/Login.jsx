import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login success
    localStorage.setItem("isLoggedIn", "true");
    navigate("/test"); // redirect to the main app page
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Log in to continue your career journey</p>

        <form onSubmit={handleSubmit}>
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

          <button type="submit" style={styles.button}>
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

const styles = {
  page: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    lineHeight: 1.6,
    color: "#333",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    background: "#fff",
    padding: "2.5rem",
    borderRadius: "15px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: { marginBottom: "1rem", fontSize: "2rem", color: "#2c3e50" },
  subtitle: { marginBottom: "2rem", color: "#6c757d" },
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
};
