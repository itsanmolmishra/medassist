import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

type AlertType = 'success' | 'warning' | 'error' | 'info';

interface HealthAlertProps {
  type: AlertType;
  title: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function HealthAlert({ 
  type, 
  title, 
  message, 
  dismissible = true,
  onDismiss 
}: HealthAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20',
      iconColor: 'text-accent',
      textColor: 'text-accent-foreground',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      iconColor: 'text-warning',
      textColor: 'text-warning-foreground',
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/20',
      iconColor: 'text-destructive',
      textColor: 'text-destructive-foreground',
    },
    info: {
      icon: Info,
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      iconColor: 'text-primary',
      textColor: 'text-primary-foreground',
    },
  };

  const { icon: Icon, bgColor, borderColor, iconColor } = config[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`${bgColor} ${borderColor} border rounded-xl p-4 mb-4`}
        >
          <div className="flex items-start gap-3">
            <div className={`${iconColor} flex-shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground mb-1">
                {title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {message}
              </p>
            </div>

            {dismissible && (
              <button
                onClick={handleDismiss}
                className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
