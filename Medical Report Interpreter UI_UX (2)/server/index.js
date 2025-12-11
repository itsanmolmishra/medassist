require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const statusRoutes = require("./routes/statusRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
// connect database on boot
connectDB();

// global middleware
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// basic root info
app.get("/", (_req, res) => {
  res.json({ name: "MedAssist AI API", status: "ok", uptimeSeconds: process.uptime() });
});

// feature routes
app.use("/api/status", statusRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);

// central error handler
app.use(errorHandler);

// Start server with simple port fallback if default is busy
const startServer = (port, attempts = 0) => {
  const server = app.listen(port, () => {
    console.log(`MedAssist AI backend running on port ${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE" && attempts < 5) {
      const nextPort = port + 1;
      console.warn(`Port ${port} in use, retrying on ${nextPort}...`);
      startServer(nextPort, attempts + 1);
    } else {
      console.error("Failed to start server:", err);
      process.exit(1);
    }
  });
};

const PORT = Number(process.env.PORT) || 4000;
startServer(PORT);

