import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface FloatingButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export function FloatingButton({ 
  icon: Icon, 
  label, 
  onClick, 
  variant = 'primary',
  className = ''
}: FloatingButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/50',
    secondary: 'bg-gradient-to-br from-accent to-accent/80 text-accent-foreground shadow-lg shadow-accent/50',
    accent: 'bg-gradient-to-br from-warning to-warning/80 text-warning-foreground shadow-lg shadow-warning/50',
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ 
        scale: 1.1,
        rotate: [0, -5, 5, -5, 0]
      }}
      whileTap={{ scale: 0.9 }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        },
        hover: {
          duration: 0.3
        }
      }}
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full ${variants[variant]} flex items-center gap-3 group ${className}`}
      aria-label={label}
    >
      <Icon className="w-6 h-6" />
      <motion.span
        initial={{ width: 0, opacity: 0 }}
        whileHover={{ width: 'auto', opacity: 1 }}
        className="overflow-hidden whitespace-nowrap font-medium"
      >
        {label}
      </motion.span>
    </motion.button>
  );
}
