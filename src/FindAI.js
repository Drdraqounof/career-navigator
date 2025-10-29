// src/FindAI.js
export async function findAI(input) {
  try {
    // Make sure your VITE_OPENAI_API_KEY is set in your .env file:
    // VITE_OPENAI_API_KEY=sk-your-key-here
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
      console.error("❌ Missing OpenAI API key in environment variables.");
      return "Error: Missing API key.";
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
              You are an AI mentor that helps users build their career goals.
              Be clear, positive, and practical.
              Give the user one to two actionable instructions.
              Grow with the user like a partner that evolves as they progress.
              and provide resources when appropriate.
              be funny and engaging. use emojis where appropriate.
            `,
          },
          { role: "user", content: input },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", errorText);
      return "⚠️ Error: Unable to connect to AI service.";
    }

    const data = await response.json();
    return data?.choices?.[0]?.message?.content?.trim() ?? "No response received.";
  } catch (err) {
    console.error("AI fetch error:", err);
    return "⚠️ Network error connecting to AI service.";
  }
}
