# 🚀 Developer Quick Reference - MedAssist AI

## Component Import Guide

### Core Page Components
```typescript
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { UploadPage } from './pages/UploadPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { AnalysisPage } from './pages/AnalysisPage';      // Main feature page
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';
```

### Advanced Feature Components
```typescript
import { AIChatWidget } from './components/AIChatWidget';
import { TrendChart } from './components/TrendChart';
import { ComparisonView } from './components/ComparisonView';
import { SymptomMatcher } from './components/SymptomMatcher';
import { DoctorReferral } from './components/DoctorReferral';
import { CarePlan } from './components/CarePlan';
import { VoiceReader } from './components/VoiceReader';
import { GamificationBadge } from './components/GamificationBadge';
import { OnboardingModal } from './components/OnboardingModal';
import { PrivacyConsent } from './components/PrivacyConsent';
import { PrivacyBanner } from './components/PrivacyBanner';
```

### Basic UI Components
```typescript
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Switch } from './components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
```

### Custom Components
```typescript
import { StatusBadge } from './components/StatusBadge';
import { ActionCard } from './components/ActionCard';
import { ReportCard } from './components/ReportCard';
import { StatsCard } from './components/StatsCard';
import { Navbar } from './components/Navbar';
```

### Data & Utils
```typescript
import { mockReports, hemoglobinTrend, cholesterolTrend, glucoseTrend } from './lib/mockData';
import type { Report, TestResult, TrendDataPoint } from './lib/mockData';
```

---

## Component Usage Examples

### AIChatWidget
```typescript
<AIChatWidget reportContext={report.aiExplanation} />
```

### TrendChart
```typescript
<TrendChart
  title="Hemoglobin Levels"
  data={hemoglobinTrend}
  normalRange={{ min: 13.5, max: 17.5 }}
  unit="g/dL"
  currentValue={11.5}
/>
```

### ComparisonView
```typescript
<ComparisonView
  oldDate="Nov 10, 2025"
  newDate="Dec 10, 2025"
  data={comparisonData}
/>
```

### CarePlan
```typescript
<CarePlan
  immediate={report.carePlan.immediate}
  shortTerm={report.carePlan.shortTerm}
  longTerm={report.carePlan.longTerm}
/>
```

### DoctorReferral
```typescript
<DoctorReferral 
  recommendedSpecialties={['cardiologist', 'endocrinologist']} 
/>
```

### SymptomMatcher
```typescript
<SymptomMatcher 
  availableTests={report.testResults.map(r => r.parameter)} 
/>
```

### StatusBadge
```typescript
<StatusBadge status="normal" />    // Green
<StatusBadge status="attention" /> // Yellow
<StatusBadge status="critical" />  // Red
```

### VoiceReader
```typescript
<VoiceReader text={report.aiExplanation} label="Read Aloud" />
```

---

## Tailwind Color Classes

### Status Colors
```css
/* Normal (Green) */
bg-accent text-accent
bg-accent/10 border-accent/30

/* Attention (Yellow) */
bg-warning text-warning
bg-warning/10 border-warning/30

/* Critical (Red) */
bg-destructive text-destructive
bg-destructive/10 border-destructive/30

/* Primary (Blue) */
bg-primary text-primary-foreground
bg-primary/10 text-primary
```

### Layout Classes
```css
/* Container */
max-w-7xl mx-auto px-6 py-8

/* Cards */
bg-card border border-border rounded-xl p-6 shadow-sm

/* Sections */
space-y-8 lg:space-y-6
```

---

## Motion Animations

### Fade In
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>
```

### Stagger Children
```typescript
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index }}
  >
))}
```

### Hover Scale
```typescript
<motion.div whileHover={{ scale: 1.05 }}>
```

---

## Page Navigation

```typescript
// In component props
interface PageProps {
  onNavigate: (page: string, reportId?: string) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

// Usage
onNavigate('dashboard');
onNavigate('analysis', reportId);
onNavigate('upload');
```

---

## LocalStorage Keys

```typescript
'medassist_onboarding_completed'
'medassist_privacy_consent'
'medassist_privacy_banner_dismissed'
```

---

## Mock Data Structure

```typescript
// Report with all features
const report = {
  id: '1',
  name: 'Complete Blood Count (CBC)',
  date: 'Dec 10, 2025',
  status: 'attention',
  patientName: 'John Doe',
  patientAge: 35,
  patientGender: 'Male',
  testResults: [...],
  aiExplanation: '...',
  recommendations: {
    lifestyle: [],
    diet: [],
    consultation: [],
    emergency: []
  },
  carePlan: {
    immediate: [],
    shortTerm: [],
    longTerm: []
  }
};

// Trend data
const trendData = [
  { date: 'Jul', value: 10.2 },
  { date: 'Aug', value: 10.8 },
  ...
];
```

---

## Icon Usage (Lucide React)

```typescript
import { 
  Activity, Upload, Download, Share2, 
  Calendar, User, CheckCircle, AlertTriangle, AlertCircle,
  TrendingUp, TrendingDown, Minus,
  Heart, Brain, Stethoscope, Apple, Dumbbell,
  FileText, MessageCircle, Volume2, Eye, Globe, Lock, Trash2
} from 'lucide-react';

// Usage
<Activity className="w-5 h-5 text-primary" />
<Upload className="w-6 h-6" />
```

---

## Toast Notifications

```typescript
import { toast } from 'sonner@2.0.3';

toast.success('Report downloaded successfully!');
toast.error('Upload failed. Please try again.');
toast.info('Processing your report...');
```

---

## Responsive Breakpoints

```css
/* Mobile First */
sm:  /* @media (min-width: 640px) */
md:  /* @media (min-width: 768px) */
lg:  /* @media (min-width: 1024px) */
xl:  /* @media (min-width: 1280px) */

/* Usage */
className="grid md:grid-cols-2 lg:grid-cols-3"
className="text-sm md:text-base lg:text-lg"
```

---

## Common Patterns

### Conditional Rendering
```typescript
{hasCriticalValues && (
  <div className="bg-destructive text-destructive-foreground">
    Critical Alert
  </div>
)}

{report.carePlan && (
  <CarePlan {...report.carePlan} />
)}
```

### Status Mapping
```typescript
const getStatusColor = (status) => {
  switch (status) {
    case 'normal': return 'bg-accent/10 text-accent';
    case 'attention': return 'bg-warning/10 text-warning';
    case 'critical': return 'bg-destructive/10 text-destructive';
  }
};
```

### Loading States
```typescript
const [isLoading, setIsLoading] = useState(false);

{isLoading ? <LoadingSpinner /> : <Content />}
```

---

## File Size Limits

```typescript
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
```

---

## Quick Commands

```bash
# Development
npm run dev

# Build
npm run build

# Type check
npx tsc --noEmit

# Format
npx prettier --write .
```

---

## Key Features by Page

### Dashboard
- Stats cards
- Recent reports
- Gamification badges
- Privacy banner
- Quick actions

### Analysis (Main)
- Critical alerts
- Key findings
- Test results table
- Trend charts
- Comparison view
- AI explanation
- Care plan tabs
- Symptom matcher
- Doctor referrals
- Advice sidebar
- AI chat widget
- Voice reader
- PDF download

### Settings
- Profile info
- Health metrics
- Notifications
- Dark mode
- **Accessibility**: High contrast, Large text, Language
- Security
- Privacy controls

---

## Component Hierarchy

```
App.tsx
├── Pages (9)
│   ├── LandingPage
│   ├── LoginPage
│   ├── SignupPage
│   ├── DashboardPage
│   │   ├── Navbar
│   │   ├── PrivacyBanner
│   │   ├── StatsCard (x3)
│   │   ├── ReportCard (x3)
│   │   └── GamificationBadge
│   ├── UploadPage
│   ├── ProcessingPage
│   ├── AnalysisPage ⭐⭐⭐
│   │   ├── Navbar
│   │   ├── Critical Alert (conditional)
│   │   ├── StatusBadge
│   │   ├── VoiceReader
│   │   ├── Key Findings Cards
│   │   ├── Tabs (Results/Trends/Compare)
│   │   │   ├── Table
│   │   │   ├── TrendChart
│   │   │   └── ComparisonView
│   │   ├── CarePlan
│   │   ├── SymptomMatcher
│   │   ├── DoctorReferral
│   │   ├── ActionCard (multiple)
│   │   └── AIChatWidget
│   ├── HistoryPage
│   └── SettingsPage
├── Modals
│   ├── OnboardingModal
│   └── PrivacyConsent
└── Toaster
```

---

**Keep this guide handy for quick reference during development!** 🚀
