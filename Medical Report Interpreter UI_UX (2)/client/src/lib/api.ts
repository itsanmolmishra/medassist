// Simple API client for MedAssist backend
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export type BackendTest = {
  name: string;
  value: number;
  unit?: string;
  status?: string;
};

export type BackendReport = {
  id: string;
  fileUrl?: string | null;
  rawText: string;
  tests: BackendTest[];
  explanation?: string;
  advice?: string[];
  summary?: string;
  status: string;
  createdAt?: string;
  ocrEngine?: string;
  mimetype?: string;
  originalName?: string;
};

export const api = {
  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },

  async register(name: string, email: string, password: string) {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) throw new Error("Register failed");
    return res.json();
  },

  async uploadReport(file?: File, text?: string) {
    const form = new FormData();
    if (file) form.append("file", file);
    if (text) form.append("text", text);

    const res = await fetch(`${API_BASE}/api/reports/upload`, {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Upload failed");
    }
    return res.json();
  },

  async processReport(id: string) {
    const res = await fetch(`${API_BASE}/api/reports/${id}/process`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Process failed");
    }
    return res.json();
  },

  async getReport(id: string): Promise<BackendReport> {
    const res = await fetch(`${API_BASE}/api/reports/${id}`, {
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Fetch report failed");
    }
    return res.json();
  },

  async listReports(page = 1, limit = 10) {
    const res = await fetch(`${API_BASE}/api/reports?page=${page}&limit=${limit}`, {
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Fetch reports failed");
    }
    return res.json();
  },
};

