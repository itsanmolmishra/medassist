const mongoose = require("mongoose");
const { ensureOcrReady } = require("../services/ocrService");
const { nlpStatus } = require("../services/nlpService");

const getStatus = async (_req, res) => {
  const dbState = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  const ocrReady = await ensureOcrReady();
  const nlp = nlpStatus();

  res.json({
    service: "MedAssist AI backend",
    uptimeSeconds: process.uptime(),
    database: dbState,
    ocrReady,
    nlpProvider: nlp.provider,
    nlpApiKeyLoaded: nlp.apiKeyLoaded,
  });
};

module.exports = { getStatus };

