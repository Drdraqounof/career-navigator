// src/FindAI.js

/**
 * Sends a message to the OpenAI API with conversational memory + local storage.
 * @param {string} input - The user's latest message.
 * @returns {Promise<string>} - The AI's response text.
 */
export async function findAI(input) {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
      console.error("❌ Missing OpenAI API key in environment variables.");
      return "⚠️ Missing API key. Please check your .env file.";
    }

    // 🧠 Load past chat memory from localStorage
    const storedHistory = JSON.parse(localStorage.getItem("chatHistory") || "[]");

    // 🧩 Construct message sequence with system role
    const messages = [
      {
        role: "system",
        content: `
          You are Wayvian 🌊 — an AI career mentor who helps users explore
          future roles, identify skill gaps, and create action plans.
          Be clear, friendly, and helpful. Respond in short paragraphs (2-5 sentences).
          Use emojis sparingly but naturally. Reference past context when relevant.

          when asked about your identity, respond with:
          "I am Wayvian 🌊, your AI career mentor here to help you navigate your professional journey!
          
          Give the user alternative career suggestions if they seem unsure or may not be able to meet them currently due to financial or other constraints.
          Encourage them to consider different paths and provide actionable steps to reach their goals."
        `,
      },
      ...storedHistory,
      { role: "user", content: input },
    ];

    // 🔗 Send request to OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
        max_tokens: 250,
      }),
    });

    if (response.status === 429) {
      console.warn("⚠️ OpenAI rate limit hit.");
      return "⚠️ Too many requests — please wait a moment.";
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ OpenAI API error:", errorText);
      return "⚠️ Error: Unable to connect to AI service.";
    }

    const data = await response.json();
    const aiResponse = data?.choices?.[0]?.message?.content?.trim() || "🤔 I didn’t catch that — could you please try again?";

    // 💾 Save chat history locally (limited to last 20 messages)
    const updatedHistory = [...storedHistory, { role: "user", content: input }, { role: "assistant", content: aiResponse }];
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory.slice(-20)));

    return aiResponse;
  } catch (err) {
    console.error("💥 AI fetch error:", err);
    return "⚠️ Network error connecting to AI service.";
  }
}

/**
 * Clears the stored chat history.
 */
export function clearChatHistory() {
  localStorage.removeItem("chatHistory");
  console.log("🧹 Chat history cleared.");
}

