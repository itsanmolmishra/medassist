const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  uploadReport,
  processReport,
  getReport,
  listReports,
  deleteReport,
} = require("../controllers/reportController");

const router = express.Router();

const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || "";
    const name = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

router.post("/upload", upload.single("file"), uploadReport);
router.post("/:id/process", processReport);
router.get("/:id", getReport);
router.get("/", listReports);
router.delete("/:id", deleteReport);

module.exports = router;

