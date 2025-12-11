// Centralized error handler to keep responses consistent
module.exports = function errorHandler(err, req, res, _next) {
  console.error("API Error:", err);

  // Zod validation errors
  if (err.name === "ZodError") {
    return res.status(400).json({ error: "Validation failed", details: err.errors });
  }

  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({ error: message });
};

