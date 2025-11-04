// src/FindAI.js

/**
 * Sends a message to the OpenAI API with conversational memory support.
 * @param {string} input - The user's latest message.
 * @param {Array} history - Previous chat history as [{ role: 'user'|'assistant', content: string }]
 * @returns {Promise<string>} - The AI's response text.
 */
export async function findAI(input, history = []) {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
      console.error("❌ Missing OpenAI API key in environment variables.");
      return "⚠️ Missing API key. Please check your .env file.";
    }

    // 🧠 Construct the full conversation memory
    const messages = [
      {
        role: "system",
        content: `
          You are Wayvian 🌊 — an AI career mentor who helps users explore
          future roles, identify skill gaps, and create action plans.
          Be clear, friendly, and helpful. Respond in short paragraphs (2-5 sentences).
          Depending on the context give concise advice, resources, or next steps.
          Use emojis sparingly but naturally. Reference past context when relevant.
        `,
      },
      ...history.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: "user",
        content: input,
      },
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
        temperature: 0.7, // 🎨 Adds more conversational variety
        max_tokens: 250,  // ✂️ Keeps responses concise
      }),
    });

    // 🚨 Handle rate-limiting and general errors
    if (response.status === 429) {
      console.warn("⚠️ OpenAI rate limit hit.");
      return "⚠️ The AI is receiving too many requests. Please wait a moment and try again.";
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ OpenAI API error:", errorText);
      return "⚠️ Error: Unable to connect to AI service.";
    }

    // ✅ Extract the AI's message
    const data = await response.json();
    const message = data?.choices?.[0]?.message?.content?.trim();

    return message || "🤔 I didn’t catch that — try asking again!";
  } catch (err) {
    console.error("💥 AI fetch error:", err);
    return "⚠️ Network error connecting to AI service.";
  }
}
