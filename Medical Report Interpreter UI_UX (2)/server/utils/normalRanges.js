const ranges = {
  glucose: { low: 70, high: 100, unit: "mg/dL" },
  cholesterol: { low: 0, high: 200, unit: "mg/dL" },
};

const classifyValue = (name, value) => {
  const range = ranges[name];
  if (!range || value === undefined || value === null || Number.isNaN(value)) {
    return { status: "unknown", range };
  }

  if (value < range.low) return { status: "low", range };
  if (value > range.high) return { status: "high", range };
  return { status: "normal", range };
};

module.exports = { ranges, classifyValue };

