import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { findAI } from "./FindAI";
import { useNavigate } from "react-router-dom";

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
      { color: 'rgba(59, 130, 246, 0.3)', speed: 0.02, amplitude: 20, frequency: 0.005, offset: 0 },
      { color: 'rgba(37, 99, 235, 0.2)', speed: 0.025, amplitude: 25, frequency: 0.004, offset: 30 },
      { color: 'rgba(147, 51, 234, 0.15)', speed: 0.018, amplitude: 22, frequency: 0.006, offset: 60 }
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
      
      // Add system message about resume upload
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
      // For other file types, just store the file name
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
    
    // Include resume context if available
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

        /* Page Container with Waves */
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

        /* Navigation Bar */
        .nav-bar {
          width: 100%;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 2px solid #e2e8f0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .nav-container {
          max-width: 64rem;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
        }

        .nav-title {
          font-size: 1.25rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-buttons {
          display: flex;
          gap: 0.75rem;
        }

        .nav-button {
          background: none;
          border: none;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
        }

        .nav-button.primary {
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }

        .nav-button.primary:hover {
          background: rgba(102, 126, 234, 0.2);
        }

        .nav-button.secondary {
          color: #718096;
        }

        .nav-button.secondary:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        /* Chat Container */
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

        /* Messages Area */
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

        /* Message Bubbles */
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

        .message strong {
          font-weight: 700;
        }

        .message em {
          font-style: italic;
        }

        /* Loading Indicator */
        .loading-text {
          color: #a0aec0;
          font-style: italic;
          animation: pulse 1.5s ease-in-out infinite;
          padding: 0.5rem;
        }

        /* Starter Prompts */
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

        .prompt-button:active {
          transform: translateY(0);
        }

        /* Input Area */
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

        .chat-input::placeholder {
          color: #a0aec0;
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

        .send-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .send-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Animations */
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

        /* Responsive Design */
        @media (max-width: 768px) {
          .page-container {
            padding-bottom: 20px;
          }

          .wave-content h1 {
            font-size: 2rem;
          }

          .wave-content p {
            font-size: 1rem;
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

          .nav-title {
            font-size: 1rem;
          }

          .nav-buttons {
            gap: 0.5rem;
          }

          .nav-button {
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
          }
        }
      `}</style>

      <div className="page-container">
        {/* Top Navigation Bar */}
        <div className="nav-bar">
          <div className="nav-container">
            <h1 className="nav-title">🚀 Career Navigator</h1>

            <div className="nav-buttons">
              <button
                onClick={() => navigate("/dashboard")}
                className="nav-button primary"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate("/net")}
                className="nav-button secondary"
              >
                Explore
              </button>
              <button
                onClick={() => navigate("/settings")}
                className="nav-button secondary"
              >
                Settings
              </button>
            </div>
          </div>
        </div>

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
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            {loading && <p className="loading-text">Thinking...</p>}
          </div>

          {/* Starter Prompts */}
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

          {/* Input Field */}
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