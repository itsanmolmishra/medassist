import { LucideIcon } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 bg-card rounded-2xl border border-border"
    >
      <div className="inline-flex p-6 rounded-full bg-muted mb-6">
        <Icon className="w-12 h-12 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-semibold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="lg">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
