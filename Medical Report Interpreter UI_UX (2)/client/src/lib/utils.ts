import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return d.toLocaleDateString('en-US', options);
}

/**
 * Format file size to readable string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Validate file type
 */
export function isValidFileType(file: File): boolean {
  const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  return validTypes.includes(file.type);
}

/**
 * Validate file size (max 10MB)
 */
export function isValidFileSize(file: File, maxSize: number = 10 * 1024 * 1024): boolean {
  return file.size <= maxSize;
}

/**
 * Get status color class
 */
export function getStatusColor(status: 'normal' | 'attention' | 'critical'): string {
  switch (status) {
    case 'normal':
      return 'text-accent';
    case 'attention':
      return 'text-warning';
    case 'critical':
      return 'text-destructive';
    default:
      return 'text-muted-foreground';
  }
}

/**
 * Get status background color class
 */
export function getStatusBgColor(status: 'normal' | 'attention' | 'critical'): string {
  switch (status) {
    case 'normal':
      return 'bg-accent/10';
    case 'attention':
      return 'bg-warning/10';
    case 'critical':
      return 'bg-destructive/10';
    default:
      return 'bg-muted';
  }
}

/**
 * Determine if a value is within normal range
 */
export function isInNormalRange(
  value: number,
  min: number,
  max: number
): 'normal' | 'attention' | 'critical' {
  if (value >= min && value <= max) {
    return 'normal';
  } else if (value < min * 0.8 || value > max * 1.2) {
    return 'critical';
  } else {
    return 'attention';
  }
}

/**
 * Generate report summary text
 */
export function generateReportSummary(
  totalTests: number,
  normalCount: number,
  abnormalCount: number
): string {
  const abnormalPercentage = Math.round((abnormalCount / totalTests) * 100);
  
  if (abnormalCount === 0) {
    return 'All test results are within normal ranges. Great job!';
  } else if (abnormalPercentage < 30) {
    return `Most of your test results (${normalCount}/${totalTests}) are normal, with ${abnormalCount} requiring attention.`;
  } else {
    return `${abnormalCount} out of ${totalTests} test results need attention. Please consult your healthcare provider.`;
  }
}

/**
 * Simulate async operation with delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}
