// src/pages/CareerChat.jsx
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { findAI } from "./FindAI";
import "./Chat.css";

export default function CareerChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

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
    setInput("");
    setLoading(true);

    const aiResponse = await findAI(input);
    const aiMsg = { sender: "ai", text: aiResponse };
    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  }

  return (
    <div className="page-container">
      <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: "800px" }}>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Career Plan Assistant
        </h2>

        <div
          ref={chatRef}
          className="h-80 overflow-y-auto border p-3 rounded mb-3 bg-gray-50"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`my-2 ${
                msg.sender === "user"
                  ? "text-right text-blue-600"
                  : "text-left text-gray-800"
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
          {loading && <p className="text-gray-500 italic">Thinking...</p>}
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about your career goals..."
            className="flex-grow border rounded px-3 py-2"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}