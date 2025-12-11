const { classifyValue, ranges } = require("../utils/normalRanges");

const extractValue = (text, labelRegex) => {
  const regex = new RegExp(`${labelRegex}[^\\d]{0,12}([0-9]+(?:\\.[0-9]+)?)`, "i");
  const match = text.match(regex);
  if (!match) return undefined;
  return parseFloat(match[1]);
};

const parseLabReport = (rawText) => {
  const cleaned = rawText.replace(/\s+/g, " ");

  const glucose = extractValue(cleaned, "(glucose|blood glucose|fasting glucose)");
  const cholesterol = extractValue(cleaned, "(cholesterol|total cholesterol)");

  const tests = [];

  if (glucose !== undefined) {
    const { status, range } = classifyValue("glucose", glucose);
    tests.push({ name: "Glucose", value: glucose, unit: range.unit, status });
  }

  if (cholesterol !== undefined) {
    const { status, range } = classifyValue("cholesterol", cholesterol);
    tests.push({ name: "Cholesterol", value: cholesterol, unit: range.unit, status });
  }

  return {
    tests,
    summary: summarize(tests),
    advice: buildAdvice(tests),
  };
};

const summarize = (tests) => {
  if (!tests.length) return "No glucose or cholesterol values were detected in the report.";

  const parts = tests.map((t) => `${t.name} is ${t.status} at ${t.value} ${t.unit}`);
  return parts.join("; ");
};

const buildAdvice = (tests) => {
  const advice = [];

  tests.forEach((t) => {
    if (t.name === "Glucose") {
      if (t.status === "high") advice.push("Limit refined sugars, choose whole grains, and add daily walks.");
      if (t.status === "low") advice.push("Eat balanced meals and carry quick carbs if you feel dizzy.");
    }
    if (t.name === "Cholesterol") {
      if (t.status === "high") {
        advice.push("Cut down on fried foods and saturated fats; cook with olive oil.");
        advice.push("Add 150+ minutes of cardio per week to raise HDL and lower LDL.");
      }
    }
  });

  if (!advice.length) {
    advice.push("Maintain a balanced diet rich in vegetables, lean protein, and fiber.");
    advice.push("Stay hydrated and aim for 30 minutes of movement most days.");
  }

  return advice;
};

module.exports = { parseLabReport };

