import { FileText, Calendar, User } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { motion } from 'motion/react';

interface ReportCardProps {
  name: string;
  date: string;
  status: 'normal' | 'attention' | 'critical';
  patientName: string;
  onClick?: () => void;
}

export function ReportCard({ name, date, status, patientName, onClick }: ReportCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.03, 
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={onClick}
      className="bg-card border border-border rounded-xl p-5 cursor-pointer hover:border-primary/50 transition-colors group"
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          <FileText className="w-5 h-5" />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <StatusBadge status={status} />
        </motion.div>
      </div>

      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors"
      >
        {name}
      </motion.h3>

      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <User className="w-4 h-4" />
          <span>{patientName}</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        className="h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4 origin-left"
      />
    </motion.div>
  );
}