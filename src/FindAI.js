// src/FindAI.js
export async function findAI(input) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an AI mentor that helps users build their career goals,  Be clear, positive, and practical. give user one to two intructions and grow with the user like digimon",
          },
          { role: "user", content: input },
        ],
      }),
    });

    const data = await response.json();
    return data?.choices?.[0]?.message?.content?.trim() ?? "No response received.";
  } catch (err) {
    console.error(err);
    return "Error connecting to AI service.";
  }
}
