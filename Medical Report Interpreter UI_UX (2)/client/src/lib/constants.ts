// Medical report status types
export type ReportStatus = 'normal' | 'attention' | 'critical';

// Color scheme constants for the medical theme
export const COLORS = {
  primary: '#2D8CFF', // Medical blue
  accent: '#0AA67A', // Healthy green
  warning: '#F59E0B', // Attention amber
  error: '#EF4444', // Critical red
  background: '#F4F8FB', // Light medical background
  text: '#1A1A1A', // Primary text
} as const;

// Test parameter normal ranges (reference values)
export const NORMAL_RANGES = {
  hemoglobin: {
    male: { min: 13.5, max: 17.5, unit: 'g/dL' },
    female: { min: 12.0, max: 15.5, unit: 'g/dL' },
  },
  glucose: { min: 70, max: 100, unit: 'mg/dL' },
  cholesterol: { min: 0, max: 200, unit: 'mg/dL' },
  ldl: { min: 0, max: 100, unit: 'mg/dL' },
  hdl: { 
    male: { min: 40, max: 999, unit: 'mg/dL' },
    female: { min: 50, max: 999, unit: 'mg/dL' },
  },
  triglycerides: { min: 0, max: 150, unit: 'mg/dL' },
} as const;

// Medical terminology tooltips
export const MEDICAL_TERMS = {
  hemoglobin: 'Protein in red blood cells that carries oxygen throughout your body',
  rbc: 'Red Blood Cells - cells that carry oxygen to body tissues',
  wbc: 'White Blood Cells - cells that fight infection and disease',
  platelets: 'Blood cells that help with clotting and wound healing',
  glucose: 'Blood sugar level - main source of energy for your body',
  cholesterol: 'Fat-like substance in your blood - too much can clog arteries',
  ldl: 'Low-Density Lipoprotein - "bad" cholesterol that can build up in arteries',
  hdl: 'High-Density Lipoprotein - "good" cholesterol that removes bad cholesterol',
  triglycerides: 'Type of fat in your blood - high levels increase heart disease risk',
} as const;

// Support file types for upload
export const ACCEPTED_FILE_TYPES = {
  pdf: 'application/pdf',
  jpeg: 'image/jpeg',
  jpg: 'image/jpg',
  png: 'image/png',
} as const;

// Max file size for uploads (in bytes)
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Animation durations
export const ANIMATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
} as const;
