import React, { useEffect, useState } from 'react';
import { 
  Download, Share2, Calendar, User, Activity, CheckCircle, AlertTriangle, 
  AlertCircle, Apple, Dumbbell, Stethoscope, Phone, FileUp, TrendingUp, 
  TrendingDown, Minus, FileText, BarChart3, GitCompare
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Navbar } from '../components/Navbar';
import { StatusBadge } from '../components/StatusBadge';
import { motion } from 'motion/react';
import { mockReports, Report, hemoglobinTrend, cholesterolTrend, glucoseTrend } from '../lib/mockData';
import { api, type BackendReport } from '../lib/api';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { AIChatWidget } from '../components/AIChatWidget';
import { TrendChart } from '../components/TrendChart';
import { ComparisonView } from '../components/ComparisonView';
import { SymptomMatcher } from '../components/SymptomMatcher';
import { DoctorReferral } from '../components/DoctorReferral';
import { CarePlan } from '../components/CarePlan';
import { VoiceReader } from '../components/VoiceReader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

interface AnalysisPageProps {
  reportId?: string;
  onNavigate: (page: string) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

const mapStatus = (status?: string): 'normal' | 'attention' | 'critical' => {
  if (!status || status === 'unknown') return 'attention';
  if (status === 'normal') return 'normal';
  if (status === 'high') return 'critical';
  if (status === 'low') return 'attention';
  return 'attention';
};

const mapTestResults = (tests: BackendReport['tests'] = []): Report['testResults'] => {
  return tests.map((t) => ({
    parameter: t.name || 'Test',
    value: t.value?.toString() ?? '-',
    normalRange: t.name?.toLowerCase().includes('glucose') ? '70-100' : '<200',
    unit: t.unit || 'mg/dL',
    status: mapStatus(t.status),
  }));
};

const mapBackendToReport = (b: BackendReport): Report => {
  return {
    id: b.id,
    name: b.summary ? `Report: ${b.summary}` : 'Lab Report',
    date: b.createdAt ? new Date(b.createdAt).toDateString() : 'Today',
    status: mapStatus(b.status),
    patientName: 'You',
    patientAge: 30,
    patientGender: '—',
    testResults: mapTestResults(b.tests),
    aiExplanation: b.explanation || b.summary || 'Your report has been processed.',
    recommendations: {
      lifestyle: b.advice || [],
      diet: [],
      consultation: [],
      emergency: [],
    },
  };
};

export function AnalysisPage({ reportId, onNavigate, darkMode, onToggleDarkMode }: AnalysisPageProps) {
  const [reportData, setReportData] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState<'results' | 'trends' | 'compare'>('results');

  useEffect(() => {
    const id = reportId || localStorage.getItem('latestReportId') || undefined;
    const cachedRaw = localStorage.getItem('latestReportData');
    const cached = cachedRaw ? (() => { try { return JSON.parse(cachedRaw); } catch { return null; } })() : null;

    if (cached && (!id || cached.id === id)) {
      setReportData(mapBackendToReport(cached));
    }

    if (!id) {
      setReportData(mockReports[0]);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        const data = await api.getReport(id);
        setReportData(mapBackendToReport(data));
      } catch (err: any) {
        console.warn('Falling back to cached/mock report', err?.message);
        if (cached) {
          setReportData(mapBackendToReport(cached));
        } else {
          toast.error('Could not load report, showing sample data');
          setReportData(mockReports[0]);
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [reportId]);

  if (!reportData) {
    return null;
  }

  const report = reportData;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        Loading report...
      </div>
    );
  }

  const getStatusIcon = (status: 'normal' | 'attention' | 'critical') => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="w-5 h-5 text-accent" />;
      case 'attention':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
    }
  };

  const getStatusColor = (status: 'normal' | 'attention' | 'critical') => {
    switch (status) {
      case 'normal':
        return 'bg-accent/10 text-accent';
      case 'attention':
        return 'bg-warning/10 text-warning';
      case 'critical':
        return 'bg-destructive/10 text-destructive';
    }
  };

  const getKeyFindings = () => {
    const abnormalResults = report.testResults.filter(r => r.status !== 'normal');
    const criticalResults = abnormalResults.filter(r => r.status === 'critical');
    
    if (criticalResults.length > 0) {
      return criticalResults.map(r => ({
        title: `${r.parameter} is ${r.status}`,
        description: `Value: ${r.value} ${r.unit} (Normal: ${r.normalRange})`,
        icon: TrendingDown,
        color: 'destructive' as const,
      }));
    }
    
    if (abnormalResults.length > 0) {
      return abnormalResults.slice(0, 3).map(r => ({
        title: `${r.parameter} needs attention`,
        description: `Value: ${r.value} ${r.unit} (Normal: ${r.normalRange})`,
        icon: TrendingUp,
        color: 'warning' as const,
      }));
    }
    
    return [{
      title: 'All results within normal range',
      description: 'Your test results look healthy',
      icon: CheckCircle,
      color: 'accent' as const,
    }];
  };

  const keyFindings = getKeyFindings();

  const handleDownloadPDF = () => {
    toast.success('Doctor-friendly PDF summary downloaded!');
  };

  const handleShare = () => {
    toast.success('Share link copied to clipboard!');
  };

  // Determine recommended specialists
  const getRecommendedSpecialists = () => {
    const specialists: string[] = [];
    if (report.name.includes('CBC') || report.name.includes('Blood')) {
      specialists.push('hematologist');
    }
    if (report.name.includes('Lipid') || report.name.includes('Cholesterol')) {
      specialists.push('cardiologist');
    }
    if (report.name.includes('Glucose') || report.name.includes('Metabolic')) {
      specialists.push('endocrinologist');
    }
    if (specialists.length === 0) {
      specialists.push('general');
    }
    return specialists;
  };

  const hasCriticalValues = report.testResults.some(r => r.status === 'critical');

  // Mock comparison data
  const comparisonData = report.testResults.slice(0, 3).map(result => ({
    parameter: result.parameter,
    oldValue: parseFloat(result.value) * 1.15,
    newValue: parseFloat(result.value),
    unit: result.unit,
    normalRange: result.normalRange,
    oldStatus: 'critical' as const,
    newStatus: result.status,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={onNavigate} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* CRITICAL ALERT BANNER */}
        {hasCriticalValues && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-destructive text-destructive-foreground rounded-xl p-6 border-2 border-destructive shadow-lg"
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">⚠️ CRITICAL: Immediate Action Required</h3>
                <p className="text-sm mb-3">
                  Your test results show critical values that require immediate medical attention.
                  Please contact your doctor or visit the emergency room if you experience any concerning symptoms.
                </p>
                <div className="flex gap-3">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => window.open('tel:911', '_self')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Emergency: 911
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    Find Nearest Hospital
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* A. Summary Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border p-6 mb-8 shadow-sm"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-foreground">{report.name}</h1>
                <StatusBadge status={report.status} />
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{report.patientName}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Analyzed: {report.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm">{report.patientAge} years, {report.patientGender}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <VoiceReader text={report.aiExplanation} />
              <Button variant="outline" className="gap-2" onClick={handleDownloadPDF}>
                <FileText className="w-4 h-4" />
                Doctor PDF
              </Button>
              <Button variant="outline" className="gap-2" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </motion.div>

        {/* B. Key Findings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            🔍 Key Findings
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {keyFindings.map((finding, index) => (
              <div
                key={index}
                className={`
                  bg-card rounded-xl border p-5
                  ${finding.color === 'destructive' ? 'border-destructive/30 bg-destructive/5' : ''}
                  ${finding.color === 'warning' ? 'border-warning/30 bg-warning/5' : ''}
                  ${finding.color === 'accent' ? 'border-accent/30 bg-accent/5' : ''}
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`
                    p-2 rounded-lg flex-shrink-0
                    ${finding.color === 'destructive' ? 'bg-destructive/10 text-destructive' : ''}
                    ${finding.color === 'warning' ? 'bg-warning/10 text-warning' : ''}
                    ${finding.color === 'accent' ? 'bg-accent/10 text-accent' : ''}
                  `}>
                    <finding.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm">
                      {finding.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {finding.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* C. View Selector Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Tabs value={activeView} onValueChange={(v) => setActiveView(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="results" className="gap-2">
                <FileText className="w-4 h-4" />
                Test Results
              </TabsTrigger>
              <TabsTrigger value="trends" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Trends
              </TabsTrigger>
              <TabsTrigger value="compare" className="gap-2">
                <GitCompare className="w-4 h-4" />
                Compare
              </TabsTrigger>
            </TabsList>

            <TabsContent value="results">
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Test Name</TableHead>
                      <TableHead className="font-semibold">Value</TableHead>
                      <TableHead className="font-semibold">Normal Range</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.testResults.map((result, index) => (
                      <TableRow key={index} className="hover:bg-muted/30">
                        <TableCell className="font-medium">{result.parameter}</TableCell>
                        <TableCell>
                          <span className="font-semibold">{result.value}</span> {result.unit}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {result.normalRange} {result.unit}
                        </TableCell>
                        <TableCell>
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(result.status)}`}>
                            {getStatusIcon(result.status)}
                            <span className="capitalize">{result.status}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="trends">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">📈 Health Trends Over Time</h3>
                {report.name.includes('CBC') && (
                  <TrendChart
                    title="Hemoglobin Levels"
                    data={hemoglobinTrend}
                    normalRange={{ min: 13.5, max: 17.5 }}
                    unit="g/dL"
                    currentValue={parseFloat(report.testResults[0].value)}
                  />
                )}
                {report.name.includes('Lipid') && (
                  <TrendChart
                    title="Total Cholesterol"
                    data={cholesterolTrend}
                    normalRange={{ min: 0, max: 200 }}
                    unit="mg/dL"
                    currentValue={parseFloat(report.testResults[0].value)}
                  />
                )}
                {report.name.includes('Metabolic') && (
                  <TrendChart
                    title="Fasting Glucose"
                    data={glucoseTrend}
                    normalRange={{ min: 70, max: 100 }}
                    unit="mg/dL"
                    currentValue={parseFloat(report.testResults[0].value)}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="compare">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">🔄 Before vs After</h3>
                <ComparisonView
                  oldDate="Nov 10, 2025"
                  newDate={report.date}
                  data={comparisonData}
                />
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* D. AI Explanation (Plain Language) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                💡 Your Results Explained Simply
              </h2>
              
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-border p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary text-primary-foreground flex-shrink-0">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      AI Analysis (Easy Language)
                    </h3>
                    <p className="text-foreground leading-relaxed text-base">
                      {report.aiExplanation}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Personalized Care Plan */}
            {report.carePlan && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  📋 Your Action Plan
                </h2>
                <CarePlan
                  immediate={report.carePlan.immediate}
                  shortTerm={report.carePlan.shortTerm}
                  longTerm={report.carePlan.longTerm}
                />
              </motion.div>
            )}

            {/* Symptom Matcher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                🩺 Symptom-to-Test Matcher
              </h2>
              <SymptomMatcher availableTests={report.testResults.map(r => r.parameter)} />
            </motion.div>

            {/* Doctor Referral */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                👨‍⚕️ Recommended Specialists
              </h2>
              <DoctorReferral recommendedSpecialties={getRecommendedSpecialists()} />
            </motion.div>
          </div>

          {/* Right Column - E. Actionable Health Advice */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">
              🎯 What You Can Do
            </h2>
            
            {/* Lifestyle Changes */}
            {report.recommendations.lifestyle.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-primary" />
                  Lifestyle Changes
                </h3>
                <div className="space-y-3">
                  {report.recommendations.lifestyle.map((item, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-lg border border-border p-4 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-sm text-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Diet Suggestions */}
            {report.recommendations.diet.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Apple className="w-5 h-5 text-accent" />
                  Diet Suggestions
                </h3>
                <div className="space-y-3">
                  {report.recommendations.diet.map((item, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-lg border border-border p-4 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p className="text-sm text-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Consultation Needed */}
            {report.recommendations.consultation.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-warning" />
                  See a Specialist
                </h3>
                <div className="space-y-3">
                  {report.recommendations.consultation.map((item, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-lg border border-border p-4 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-2 h-2 rounded-full bg-warning mt-2 flex-shrink-0" />
                      <p className="text-sm text-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Emergency Indicators */}
            {report.recommendations.emergency.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-destructive/5 rounded-xl border-2 border-destructive/30 p-4"
              >
                <h3 className="text-lg font-semibold text-destructive mb-3 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  ⚠️ Urgent Warning Signs
                </h3>
                <div className="space-y-3">
                  {report.recommendations.emergency.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg border border-destructive/20 p-4 flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground font-medium leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* F. Next Steps Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gradient-to-br from-secondary/30 to-accent/10 rounded-2xl border border-border p-8"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
            🚀 Next Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Button 
              size="lg" 
              className="h-auto py-4 flex flex-col gap-2" 
              onClick={handleDownloadPDF}
            >
              <FileText className="w-6 h-6" />
              <span>Download Doctor Summary</span>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={handleShare}
            >
              <Share2 className="w-6 h-6" />
              <span>Share with Doctor</span>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => onNavigate('upload')}
            >
              <FileUp className="w-6 h-6" />
              <span>Analyze Another Report</span>
            </Button>
          </div>
        </motion.div>

        {/* Back to Dashboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 text-center"
        >
          <Button variant="ghost" onClick={() => onNavigate('dashboard')} size="lg">
            Back to Dashboard
          </Button>
        </motion.div>
      </main>

      {/* AI Chat Widget */}
      <AIChatWidget reportContext={report.aiExplanation} />
    </div>
  );
}
