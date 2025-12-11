const fs = require("fs/promises");
const path = require("path");
const Report = require("../models/Report");
const { extractTextFromFile } = require("../services/ocrService");
const { parseLabReport } = require("../services/reportParser");
const { generateExplanation } = require("../services/nlpService");

const uploadReport = async (req, res, next) => {
  try {
    if (!req.file && !req.body.text) {
      return res.status(400).json({ error: "Please upload a file or provide raw text." });
    }

    let rawText = req.body.text?.trim();
    let engine = "raw-text";

    if (!rawText && req.file) {
      const result = await extractTextFromFile(req.file.path, req.file.mimetype);
      rawText = result.text;
      engine = result.engine;
    }

    if (!rawText) {
      return res.status(400).json({ error: "Could not extract text from the report." });
    }

    const report = await Report.create({
      userId: req.user._id,
      filePath: req.file ? req.file.path : "text-only",
      originalName: req.file?.originalname,
      mimetype: req.file?.mimetype || "text/plain",
      ocrEngine: engine,
      rawText,
      status: "uploaded",
    });

    res.status(201).json({
      reportId: report._id,
      ocrEngine: engine,
      rawTextLength: rawText.length,
      status: report.status,
    });
  } catch (err) {
    next(err);
  }
};

const processReport = async (req, res, next) => {
  try {
    const report = await Report.findOne({ _id: req.params.id, userId: req.user._id });
    if (!report) return res.status(404).json({ error: "Report not found" });

    const parsed = parseLabReport(report.rawText);
    const explanationResult = await generateExplanation({ tests: parsed.tests, rawText: report.rawText });

    report.extracted = parsed.tests;
    report.explanation = explanationResult.explanation;
    report.advice = explanationResult.advice;
    report.summary = parsed.summary;
    report.status = "processed";

    await report.save();

    res.json({
      id: report._id,
      tests: report.extracted,
      explanation: report.explanation,
      advice: report.advice,
      summary: report.summary,
      provider: explanationResult.provider,
    });
  } catch (err) {
    next(err);
  }
};

const getReport = async (req, res, next) => {
  try {
    const report = await Report.findOne({ _id: req.params.id, userId: req.user._id });
    if (!report) return res.status(404).json({ error: "Report not found" });

    res.json({
      id: report._id,
      filePath: report.filePath,
      fileUrl: report.filePath.includes("uploads") ? `/uploads/${path.basename(report.filePath)}` : null,
      rawText: report.rawText,
      ocrEngine: report.ocrEngine,
      mimetype: report.mimetype,
      originalName: report.originalName,
      tests: report.extracted,
      explanation: report.explanation,
      advice: report.advice,
      summary: report.summary,
      status: report.status,
      createdAt: report.createdAt,
    });
  } catch (err) {
    next(err);
  }
};

const listReports = async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Report.find({ userId: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("summary status createdAt extracted"),
      Report.countDocuments({ userId: req.user._id }),
    ]);

    res.json({
      page,
      total,
      pageSize: limit,
      reports: items.map((r) => ({
        id: r._id,
        createdAt: r.createdAt,
        status: r.status,
        summary: r.summary || "Pending processing",
        tests: r.extracted || [],
      })),
    });
  } catch (err) {
    next(err);
  }
};

const deleteReport = async (req, res, next) => {
  try {
    const report = await Report.findOne({ _id: req.params.id, userId: req.user._id });
    if (!report) return res.status(404).json({ error: "Report not found" });

    if (report.filePath && report.filePath !== "text-only") {
      try {
        await fs.unlink(report.filePath);
      } catch (err) {
        console.warn("File cleanup warning:", err.message);
      }
    }

    await report.deleteOne();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadReport, processReport, getReport, listReports, deleteReport };

