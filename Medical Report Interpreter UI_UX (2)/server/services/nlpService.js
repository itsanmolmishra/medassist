const axios = require("axios");

const defaultModel = process.env.HUGGINGFACE_MODEL || "google/flan-t5-base";
const hfApiKey = process.env.HUGGINGFACE_API_KEY;

const buildPrompt = ({ tests, rawText }) => {
  const testsText = tests
    .map((t) => `${t.name}: ${t.value} ${t.unit} (${t.status})`)
    .join(" | ");

  return `
Summarize these lab results for a patient in plain language and at most 120 words.
Focus on glucose and cholesterol. Keep it reassuring, non-alarming.
Tests: ${testsText || "No values found"}

Based on the values, provide 3-5 short actionable bullet points (diet, exercise, hydration).
Source text (truncated): ${rawText.slice(0, 800)}
`;
};

const callHuggingFace = async (prompt) => {
  if (!hfApiKey) return null;

  const url = `https://api-inference.huggingface.co/models/${defaultModel}`;
  const headers = { Authorization: `Bearer ${hfApiKey}` };

  try {
    const { data } = await axios.post(
      url,
      { inputs: prompt, parameters: { max_new_tokens: 180, temperature: 0.4 } },
      { headers, timeout: 15000 }
    );

    // text2text models return [{ generated_text }]
    if (Array.isArray(data) && data[0]?.generated_text) {
      return data[0].generated_text.trim();
    }
    // some models respond with { generated_text: "" }
    if (data?.generated_text) return data.generated_text.trim();
  } catch (err) {
    console.warn("HuggingFace inference error:", err.message);
    return null;
  }

  return null;
};

const fallback = (tests) => {
  const statuses = tests
    .filter((t) => t.status !== "normal")
    .map((t) => `${t.name} looks ${t.status} at ${t.value} ${t.unit}`);

  const explanation =
    statuses.join("; ") ||
    "Your glucose and cholesterol values appear within the expected ranges. Keep up the healthy habits.";

  const advice = [];
  advice.push("Hydrate with water regularly throughout the day.");
  advice.push("Prioritize vegetables, lean protein, and whole grains.");
  advice.push("Aim for at least 30 minutes of brisk walking most days.");
  if (tests.find((t) => t.name === "Glucose" && t.status === "high")) {
    advice.push("Reduce sugary drinks and refined carbs to help glucose control.");
  }
  if (tests.find((t) => t.name === "Cholesterol" && t.status === "high")) {
    advice.push("Swap fried/fast food for baked or grilled options to lower cholesterol.");
  }

  return { explanation, advice };
};

const generateExplanation = async ({ tests, rawText }) => {
  const prompt = buildPrompt({ tests, rawText });
  const hfText = await callHuggingFace(prompt);

  if (hfText) {
    const [firstLine, ...rest] = hfText.split(/\n+/);
    const bullets = rest
      .map((l) => l.replace(/^[\-\*\d\.\s]+/, "").trim())
      .filter(Boolean)
      .slice(0, 6);

    return {
      explanation: firstLine.trim(),
      advice: bullets.length ? bullets : fallback(tests).advice,
      provider: "huggingface",
    };
  }

  const fb = fallback(tests);
  return { ...fb, provider: "fallback" };
};

const nlpStatus = () => ({
  provider: hfApiKey ? "huggingface" : "fallback",
  apiKeyLoaded: Boolean(hfApiKey),
});

module.exports = { generateExplanation, nlpStatus };

