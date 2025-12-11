import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatusBadgeProps {
  status: 'normal' | 'attention' | 'critical';
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = {
    normal: {
      icon: CheckCircle,
      label: 'Normal',
      className: 'bg-accent/10 text-accent border-accent/30',
    },
    attention: {
      icon: AlertTriangle,
      label: 'Needs Attention',
      className: 'bg-warning/10 text-warning border-warning/30',
    },
    critical: {
      icon: AlertCircle,
      label: 'Critical',
      className: 'bg-destructive/10 text-destructive border-destructive/30',
    },
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1 gap-1',
    md: 'text-sm px-3 py-1.5 gap-1.5',
    lg: 'text-base px-4 py-2 gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const { icon: Icon, label, className } = config[status];

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ 
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center ${sizeClasses[size]} ${className} rounded-full border font-medium`}
    >
      <motion.div
        animate={status === 'critical' ? {
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        } : {}}
        transition={{
          duration: 2,
          repeat: status === 'critical' ? Infinity : 0,
          repeatDelay: 1
        }}
      >
        <Icon className={iconSizes[size]} />
      </motion.div>
      <span>{label}</span>
    </motion.div>
  );
}