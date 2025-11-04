import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {findAI} from "./FindAI";
// Mock AI function for demo


// Simple markdown-like text formatter
function formatText(text) {
  // Split by lines
  const lines = text.split('\n');
  
  return lines.map((line, i) => {
    // Handle headers
    if (line.startsWith('### ')) {
      return <h3 key={i} style={{ fontSize: '1.1rem', fontWeight: '600', margin: '0.5rem 0' }}>{line.substring(4)}</h3>;
    }
    if (line.startsWith('## ')) {
      return <h2 key={i} style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0.5rem 0' }}>{line.substring(3)}</h2>;
    }
    
    // Handle bold **text**
    let formatted = line;
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = boldRegex.exec(formatted)) !== null) {
      if (match.index > lastIndex) {
        parts.push(formatted.substring(lastIndex, match.index));
      }
      parts.push(<strong key={`bold-${i}-${match.index}`}>{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < formatted.length) {
      parts.push(formatted.substring(lastIndex));
    }
    
    // Handle list items
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      return <li key={i} style={{ marginLeft: '1.5rem' }}>{parts.length > 0 ? parts : line.substring(2)}</li>;
    }
    
    if (line.trim().match(/^\d+\./)) {
      return <li key={i} style={{ marginLeft: '1.5rem' }}>{parts.length > 0 ? parts : line.substring(line.indexOf('.') + 1)}</li>;
    }
    
    // Regular paragraph
    if (line.trim()) {
      return <p key={i} style={{ margin: '0.5rem 0' }}>{parts.length > 0 ? parts : line}</p>;
    }
    
    return <br key={i} />;
  });
}

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

export default function CareerChat() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Welcome to your Career Navigator! I'm here to help you plan your career path, discover opportunities, and develop the skills you need. How can I assist you today?"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [notification, setNotification] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const chatRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Starter prompts for users
  const starterPrompts = [
    "🎯 What career paths match my interests?",
    "📚 What skills should I develop for tech careers?",
    "💼 How do I transition into a new industry?",
    "🎓 What certifications are valuable in my field?",
    "💰 What are high-demand careers right now?",
    "🚀 How can I advance in my current career?"
  ];

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Canvas Wave Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 200;
    };
    resizeCanvas();

       const waves = [
      { color: 'rgba(59, 130, 246, 0.7)', speed: 0.03, amplitude: 40, frequency: 0.003, offset: -50 },
      { color: 'rgba(37, 99, 235, 0.6)', speed: 0.035, amplitude: 40, frequency: 0.0055, offset: 10 },
      { color: 'rgba(147, 51, 234, 0.5)', speed: 0.025, amplitude: 80, frequency: 0.004, offset: 50 },
      { color: 'rgba(147, 51, 234, 0.5)', speed: 0.025, amplitude: 80, frequency: 0.004, offset: 20 }
    ];

    function drawWave(wave, time) {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + 
          Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.7) * wave.amplitude * 0.5 +
          wave.offset;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = wave.color;
      ctx.fill();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      waves.forEach(wave => drawWave(wave, time));

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Auto-scroll when messages update
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle resume file upload
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResumeFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      setResumeText(text);
      
      setMessages((prev) => [
        ...prev,
        {
          sender: "system",
          text: `✅ Resume "${file.name}" uploaded successfully! I can now provide personalized advice based on your experience.`
        }
      ]);
    };

    if (file.type === "text/plain") {
      reader.readAsText(file);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          sender: "system",
          text: `✅ Resume "${file.name}" uploaded! Note: For best results, upload a .txt file or paste your resume text directly.`
        }
      ]);
    }
  };

  async function handleSend() {
    if (!input.trim()) return;
    
    let messageToSend = input;
    if (resumeText) {
      messageToSend = `[Resume Context: ${resumeText.substring(0, 500)}...]\n\nUser Question: ${input}`;
    }

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = messageToSend;
    setInput("");
    setLoading(true);

    try {
      const aiResponse = await findAI(currentInput);
      const aiMsg = { sender: "ai", text: aiResponse };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("AI fetch error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Error: Unable to get response." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const handleStarterPrompt = (prompt) => {
    setInput(prompt.substring(2));
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding-bottom: 40px;
          position: relative;
        }

        .wave-header {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
          margin-bottom: 2rem;
        }

        .wave-canvas {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .wave-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 3rem 1rem;
          color: white;
        }

        .wave-content h1 {
          font-size: 2.5rem;
          font-weight: 800;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          margin-bottom: 0.5rem;
        }

        .wave-content p {
          font-size: 1.1rem;
          opacity: 0.95;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        .chat-container {
          background-color: white;
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          max-width: 50rem;
          margin: 0 auto;
        }

        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .chat-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #4a5568;
        }

        .resume-upload-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
          box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
        }

        .resume-upload-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(102, 126, 234, 0.4);
        }

        .resume-status {
          margin-top: 0.5rem;
          padding: 0.5rem;
          background: #f0fdf4;
          border: 1px solid #86efac;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          color: #166534;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .messages-area {
          height: 22rem;
          overflow-y: auto;
          border: 1px solid #e2e8f0;
          padding: 0.75rem;
          border-radius: 0.5rem;
          margin-bottom: 0.75rem;
          background-color: #f9fafb;
        }

        .messages-area::-webkit-scrollbar {
          width: 8px;
        }

        .messages-area::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .messages-area::-webkit-scrollbar-thumb {
          background: #667eea;
          border-radius: 10px;
        }

        .messages-area::-webkit-scrollbar-thumb:hover {
          background: #764ba2;
        }

        .message {
          padding: 12px 16px;
          margin: 8px 0;
          border-radius: 12px;
          max-width: 80%;
          word-wrap: break-word;
          animation: fadeIn 0.3s ease;
        }

        .message-user {
          margin-left: auto;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-bottom-right-radius: 4px;
          text-align: right;
        }

        .message-ai {
          margin-right: auto;
          background: white;
          border: 1px solid #e2e8f0;
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          color: #2d3748;
          text-align: left;
        }

        .message-system {
          margin: 0 auto;
          background: #f0fdf4;
          border: 1px solid #86efac;
          color: #166534;
          text-align: center;
          max-width: 90%;
        }

        .message p {
          margin: 0.5rem 0;
          line-height: 1.6;
        }

        .message ul,
        .message ol {
          margin-left: 1.5rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .message li {
          margin: 0.25rem 0;
        }

        .message code {
          background: rgba(0, 0, 0, 0.05);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }

        .message-user code {
          background: rgba(255, 255, 255, 0.2);
        }

        .loading-text {
          color: #a0aec0;
          font-style: italic;
          animation: pulse 1.5s ease-in-out infinite;
          padding: 0.5rem;
        }

        .starter-prompts {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .prompt-button {
          background: white;
          border: 2px solid #e2e8f0;
          padding: 1rem;
          border-radius: 0.75rem;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.95rem;
          color: #4a5568;
          font-weight: 500;
        }

        .prompt-button:hover {
          border-color: #667eea;
          background: #f7fafc;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(102, 126, 234, 0.15);
        }

        .input-area {
          display: flex;
          gap: 0.5rem;
        }

        .chat-input {
          flex-grow: 1;
          border: 2px solid #e2e8f0;
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          transition: all 0.2s ease;
          outline: none;
        }

        .chat-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .send-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);
        }

        .send-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
        }

        .send-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        @media (max-width: 768px) {
          .wave-content h1 {
            font-size: 2rem;
          }

          .chat-container {
            margin: 0 1rem;
            padding: 1rem;
          }

          .chat-header {
            flex-direction: column;
            gap: 0.75rem;
            align-items: flex-start;
          }

          .messages-area {
            height: 18rem;
          }

          .message {
            max-width: 90%;
          }
        }
      `}</style>

      <div className="page-container">
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

        {/* TOP NAV - Matching Dashboard Style */}
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
              <NavButton onClick={() => navigate("/dashboard")}>Dashboard</NavButton>
              <NavButton onClick={() => navigate("/net")}>Network</NavButton>
              <NavButton onClick={() => showNotification("Already on My Plan")}>My Plan</NavButton>
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

        {/* Wave Header */}
        <div className="wave-header">
          <canvas ref={canvasRef} className="wave-canvas"></canvas>
          <div className="wave-content">
            <h1>Career Plan Assistant</h1>
            <p>Get personalized career guidance powered by AI</p>
          </div>
        </div>

        {/* Chat Container */}
        <div className="chat-container">
          <div className="chat-header">
            <h2 className="chat-title">Let's Plan Your Career</h2>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleResumeUpload}
              accept=".txt,.pdf,.doc,.docx"
              style={{ display: 'none' }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="resume-upload-btn"
            >
              📄 Upload Resume
            </button>
          </div>

          {resumeFile && (
            <div className="resume-status">
              <span>✅</span>
              <span>Resume loaded: <strong>{resumeFile.name}</strong></span>
            </div>
          )}

          <div ref={chatRef} className="messages-area">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`message ${
                  msg.sender === "user" 
                    ? "message-user" 
                    : msg.sender === "system"
                    ? "message-system"
                    : "message-ai"
                }`}
              >
                {formatText(msg.text)}
              </div>
            ))}
            {loading && <p className="loading-text">Thinking...</p>}
          </div>

          {messages.length === 1 && !loading && (
            <div className="starter-prompts">
              {starterPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStarterPrompt(prompt)}
                  className="prompt-button"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <div className="input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about your career goals..."
              className="chat-input"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="send-button"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}