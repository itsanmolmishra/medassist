import React, { useEffect, useState } from 'react';
import { FileText, AlertTriangle, Upload, History } from 'lucide-react';
import { Button } from '../components/ui/button';
import { StatsCard } from '../components/StatsCard';
import { ReportCard } from '../components/ReportCard';
import { Navbar } from '../components/Navbar';
import { motion } from 'motion/react';
import { mockReports, type Report } from '../lib/mockData';
import { GamificationBadge } from '../components/GamificationBadge';
import { PrivacyBanner } from '../components/PrivacyBanner';
import { api, type BackendReport } from '../lib/api';
import { toast } from 'sonner';

interface DashboardPageProps {
  onNavigate: (page: string, reportId?: string) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export function DashboardPage({ onNavigate, darkMode, onToggleDarkMode }: DashboardPageProps) {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [loading, setLoading] = useState(false);

  const mapStatus = (status?: string): 'normal' | 'attention' | 'critical' => {
    if (!status || status === 'unknown') return 'attention';
    if (status === 'normal') return 'normal';
    if (status === 'high') return 'critical';
    if (status === 'low') return 'attention';
    return 'attention';
  };

  const mapBackendToReport = (b: BackendReport): Report => ({
    id: b.id,
    name: b.summary ? `Report: ${b.summary}` : 'Lab Report',
    date: b.createdAt ? new Date(b.createdAt).toDateString() : 'Today',
    status: mapStatus(b.status),
    patientName: 'You',
    patientAge: 30,
    patientGender: '—',
    testResults: (b.tests || []).map((t) => ({
      parameter: t.name || 'Test',
      value: t.value?.toString() ?? '-',
      normalRange: t.name?.toLowerCase().includes('glucose') ? '70-100' : '<200',
      unit: t.unit || 'mg/dL',
      status: mapStatus(t.status),
    })),
    aiExplanation: b.explanation || b.summary || 'Processed report',
    recommendations: { lifestyle: b.advice || [], diet: [], consultation: [], emergency: [] },
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await api.listReports(1, 5);
        const mapped = (data.reports || []).map(mapBackendToReport);
        if (mapped.length) {
          setReports(mapped);
        }
      } catch (err: any) {
        console.warn('Using mock reports', err?.message);
        toast.error('Could not fetch reports, showing sample data');
        setReports(mockReports);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const recentReports = reports.slice(0, 3);
  const abnormalCount = reports.filter(r => r.status !== 'normal').length;

  return (
    <div className="min-h-screen bg-background">
      <PrivacyBanner />
      <Navbar onNavigate={onNavigate} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your medical reports and health insights
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            icon={FileText}
            title="Total Reports"
            value={mockReports.length}
            variant="primary"
          />
          <StatsCard
            icon={AlertTriangle}
            title="Abnormal Markers"
            value={abnormalCount}
            variant="warning"
          />
          <StatsCard
            icon={History}
            title="Days Since Last Check"
            value="2"
            variant="accent"
          />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          <Button
            size="lg"
            onClick={() => onNavigate('upload')}
            className="h-24 text-lg gap-3 hover:scale-105 transition-transform"
          >
            <Upload className="w-6 h-6" />
            Upload New Report
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate('history')}
            className="h-24 text-lg gap-3 hover:scale-105 transition-transform"
          >
            <History className="w-6 h-6" />
            View Report History
          </Button>
        </motion.div>

        {/* Recent Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-1">
                Recent Reports
              </h2>
              <p className="text-sm text-muted-foreground">
                Your latest analyzed medical reports
              </p>
            </div>
            <Button variant="ghost" onClick={() => onNavigate('history')}>
              View All
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <ReportCard
                  {...report}
                  onClick={() => onNavigate('analysis', report.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gamification Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-8"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-1">
              🏆 Your Progress
            </h2>
            <p className="text-sm text-muted-foreground">
              Keep tracking your health to unlock achievements
            </p>
          </div>
          <GamificationBadge />
        </motion.div>

        {/* Health Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="mt-8 bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl border border-border p-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-accent text-accent-foreground">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Health Reminder
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                You have some markers that need attention in your recent lipid profile. 
                Consider scheduling a follow-up appointment with your healthcare provider.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}