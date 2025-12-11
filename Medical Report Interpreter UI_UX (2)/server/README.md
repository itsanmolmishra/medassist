# MedAssist AI — Backend

Express + MongoDB backend for the MedAssist AI hackathon MVP. Supports user auth, report upload (PDF/Image), OCR via Tesseract.js, value extraction (Glucose & Cholesterol), HuggingFace-powered explanations, and actionable advice.

## Quick start
```bash
cd server
npm install
cp .env.example .env   # fill values
npm run dev            # or: npm start
```

## Required environment
- PORT (default 4000)
- MONGO_URI (e.g., mongodb://localhost:27017/medassist)
- JWT_SECRET (any random string)
- HUGGINGFACE_API_KEY (optional, for free HF inference)
- HUGGINGFACE_MODEL (optional, default google/flan-t5-base)

## Endpoints
- POST /api/auth/register — name, email, password
- POST /api/auth/login
- GET /api/auth/me
- GET /api/status — checks DB, OCR, NLP readiness
- POST /api/reports/upload — multipart file (pdf/png/jpg) or text
- POST /api/reports/:id/process — parse values + explain
- GET /api/reports/:id — full record
- GET /api/reports — paginated list
- DELETE /api/reports/:id
  - Upload response also returns `ocrEngine` and `rawTextLength` to help debug OCR issues.

## Data model (MongoDB)
- User: name, email, passwordHash
- Report: userId, filePath, rawText, extracted[{name,value,unit,status}], explanation, advice[], summary, status, timestamps

## Notes
- OCR: Uses Tesseract.js for images; PDFs first try pdf-parse then fall back to Tesseract if needed.
- NLP: Uses HuggingFace free inference if an API key is set; otherwise falls back to rule-based messaging.
- Normal ranges: Glucose 70–100 mg/dL, Cholesterol <200 mg/dL (hardcoded).

## Scripts
- npm run dev — nodemon server
- npm start — production start
