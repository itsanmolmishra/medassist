import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  trend?: string;
  variant?: 'primary' | 'accent' | 'warning';
}

export function StatsCard({ icon: Icon, title, value, trend, variant = 'primary' }: StatsCardProps) {
  const variantClasses = {
    primary: 'from-primary/20 to-primary/5 text-primary border-primary/20',
    accent: 'from-accent/20 to-accent/5 text-accent border-accent/20',
    warning: 'from-warning/20 to-warning/5 text-warning border-warning/20',
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
          className={`p-3 rounded-xl bg-gradient-to-br ${variantClasses[variant]} border`}
        >
          <Icon className="w-6 h-6" />
        </motion.div>
        {trend && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
          >
            {trend}
          </motion.span>
        )}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-sm text-muted-foreground mb-1"
      >
        {title}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="text-3xl font-bold text-foreground"
      >
        {value}
      </motion.p>
    </motion.div>
  );
}