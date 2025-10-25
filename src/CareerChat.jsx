import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { findAI } from "./FindAI"; // Ensure correct file name & path
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
  const chatRef = useRef(null);

  // Starter prompts for users
  const starterPrompts = [
    "🎯 What career paths match my interests?",
    "📚 What skills should I develop for tech careers?",
    "💼 How do I transition into a new industry?",
    "🎓 What certifications are valuable in my field?",
    "💰 What are high-demand careers right now?",
    "🚀 How can I advance in my current career?"
  ];

  // Auto-scroll when messages update
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSend() {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
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

  return (
    <>
      <style>{`
        /* Page Container */
        .page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding-bottom: 40px;
        }

        /* Navigation Bar */
        .nav-bar {
          width: 100%;
          background-color: #f7fafc;
          border-bottom: 2px solid #e2e8f0;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
        }

        .nav-container {
          max-width: 64rem;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
        }

        .nav-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #4a5568;
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
          transition: color 0.2s ease;
          padding: 0.5rem 1rem;
        }

        .nav-button.primary {
          color: #3182ce;
        }

        .nav-button.primary:hover {
          color: #2c5282;
        }

        .nav-button.secondary {
          color: #718096;
        }

        .nav-button.secondary:hover {
          color: #2d3748;
        }

        /* Chat Container */
        .chat-container {
          background-color: white;
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          max-width: 42rem;
          margin: 0 auto;
        }

        .chat-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 1rem;
        }

        /* Messages Area */
        .messages-area {
          height: 20rem;
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

          .chat-container {
            margin: 0 1rem;
            padding: 1rem;
          }

          .messages-area {
            height: 16rem;
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
            <h1 className="nav-title">Career Navigator</h1>

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

        {/* Chat Container */}
        <div className="chat-container">
          <h2 className="chat-title">Career Plan Assistant</h2>

          <div ref={chatRef} className="messages-area">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`message ${
                  msg.sender === "user" ? "message-user" : "message-ai"
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
                  onClick={() => {
                    setInput(prompt.substring(2)); // Remove emoji for cleaner input
                    handleSend();
                  }}
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