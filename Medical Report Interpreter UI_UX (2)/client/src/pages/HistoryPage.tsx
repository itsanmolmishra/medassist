import { Search, Filter, Calendar, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Navbar } from '../components/Navbar';
import { ReportCard } from '../components/ReportCard';
import { motion } from 'motion/react';
import { mockReports } from '../lib/mockData';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

interface HistoryPageProps {
  onNavigate: (page: string, reportId?: string) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export function HistoryPage({ onNavigate, darkMode, onToggleDarkMode }: HistoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={onNavigate} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Report History
          </h1>
          <p className="text-muted-foreground">
            View and manage all your medical reports
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border border-border p-6 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="h-12">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reports</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="attention">Attention Needed</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" className="h-12 gap-2">
                <Calendar className="w-4 h-4" />
                Date Range
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Reports</p>
            <p className="text-2xl font-bold text-foreground">{mockReports.length}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Normal</p>
            <p className="text-2xl font-bold text-accent">
              {mockReports.filter(r => r.status === 'normal').length}
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Attention Needed</p>
            <p className="text-2xl font-bold text-warning">
              {mockReports.filter(r => r.status === 'attention').length}
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Critical</p>
            <p className="text-2xl font-bold text-destructive">
              {mockReports.filter(r => r.status === 'critical').length}
            </p>
          </div>
        </motion.div>

        {/* Reports Grid */}
        {filteredReports.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <ReportCard
                  {...report}
                  onClick={() => onNavigate('analysis', report.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16 bg-card rounded-xl border border-border"
          >
            <div className="inline-flex p-6 rounded-full bg-muted mb-4">
              <FileText className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No reports found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={() => setSearchQuery('')} variant="outline">
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Back Button */}
        <div className="text-center mt-8">
          <Button variant="ghost" onClick={() => onNavigate('dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}
