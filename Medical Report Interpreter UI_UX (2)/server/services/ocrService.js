const fs = require("fs/promises");
const Tesseract = require("tesseract.js");
const pdfParse = require("pdf-parse");

let workerPromise = null;

const getWorker = async () => {
  if (!workerPromise) {
    // spin up worker lazily to keep boot fast
    workerPromise = (async () => {
      const worker = await Tesseract.createWorker();
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      return worker;
    })();
  }
  return workerPromise;
};

const ensureOcrReady = async () => {
  try {
    await getWorker();
    return true;
  } catch (err) {
    console.error("Tesseract init failed:", err.message);
    return false;
  }
};

const extractTextFromFile = async (filePath, mimetype) => {
  // Prefer pdf-parse for PDFs (fast), fall back to Tesseract if it fails or for images.
  if (mimetype?.includes("pdf")) {
    try {
      const buffer = await fs.readFile(filePath);
      const parsed = await pdfParse(buffer);
      const pdfText = parsed.text?.trim();
      if (pdfText && pdfText.length > 20) {
        return { text: pdfText, engine: "pdf-parse" };
      }
    } catch (err) {
      console.warn("PDF parse fallback to OCR:", err.message);
    }
  }

  const worker = await getWorker();
  const { data } = await worker.recognize(filePath);
  const text = data.text?.trim() || "";

  if (!text) {
    throw new Error("OCR did not return text. Please upload a clearer file.");
  }

  return { text, engine: "tesseract" };
};

module.exports = { extractTextFromFile, ensureOcrReady };

