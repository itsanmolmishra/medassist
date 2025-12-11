import { CheckCircle2, Circle } from 'lucide-react';
import { motion } from 'motion/react';

interface Step {
  label: string;
  status: 'complete' | 'active' | 'pending';
}

interface StepIndicatorProps {
  steps: Step[];
}

export function StepIndicator({ steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between max-w-2xl mx-auto">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {step.status === 'complete' ? (
                <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              ) : step.status === 'active' ? (
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center animate-pulse">
                  <Circle className="w-5 h-5 fill-current" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                  <Circle className="w-5 h-5" />
                </div>
              )}
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className={`text-xs mt-2 text-center ${
                step.status === 'active'
                  ? 'text-foreground font-medium'
                  : step.status === 'complete'
                  ? 'text-accent'
                  : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </motion.p>
          </div>
          
          {index < steps.length - 1 && (
            <div className="flex-1 h-0.5 mx-2 bg-border relative overflow-hidden">
              {(step.status === 'complete' || steps[index + 1]?.status === 'complete') && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="absolute inset-0 bg-accent"
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
