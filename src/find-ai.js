// src/FindAI.js
export async function findAI(input) {
  try {
    const response = await fetch("/api/find-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Serverless API error:", errText);
      return "⚠️ Error: Unable to connect to AI service.";
    }

    const data = await response.json();
    return data?.choices?.[0]?.message?.content?.trim() ?? "No response received.";
  } catch (err) {
    console.error("Client fetch error:", err);
    return "⚠️ Network error connecting to AI service.";
  }
}
