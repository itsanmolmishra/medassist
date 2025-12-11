const mongoose = require("mongoose");

const extractedSchema = new mongoose.Schema(
  {
    name: String,
    value: Number,
    unit: String,
    status: { type: String, enum: ["low", "normal", "high", "unknown"], default: "unknown" },
  },
  { _id: false }
);

const reportSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    filePath: { type: String, required: true },
    originalName: String,
    mimetype: String,
    ocrEngine: { type: String, enum: ["pdf-parse", "tesseract", "raw-text"], default: "raw-text" },
    rawText: { type: String, required: true },
    extracted: [extractedSchema],
    explanation: String,
    advice: [String],
    summary: String,
    status: { type: String, enum: ["uploaded", "processed"], default: "uploaded" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);

