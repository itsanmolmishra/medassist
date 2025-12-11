import { Navbar } from '../components/Navbar';
import { motion } from 'motion/react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProcessingPageProps {
  onNavigate: (page: string, reportId?: string) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'complete';
}

export function ProcessingPage({ onNavigate, darkMode, onToggleDarkMode }: ProcessingPageProps) {
  const [steps, setSteps] = useState<ProcessStep[]>([
    {
      id: 1,
      title: 'Extracting Text (OCR)',
      description: 'Using advanced OCR to read your report',
      status: 'processing',
    },
    {
      id: 2,
      title: 'Identifying Lab Terms',
      description: 'Recognizing medical parameters and values',
      status: 'pending',
    },
    {
      id: 3,
      title: 'Comparing with Normal Ranges',
      description: 'Checking against standard medical values',
      status: 'pending',
    },
    {
      id: 4,
      title: 'Creating Easy-to-Read Explanations',
      description: 'Translating medical jargon into simple language',
      status: 'pending',
    },
    {
      id: 5,
      title: 'Generating Health Advice',
      description: 'Creating personalized recommendations for you',
      status: 'pending',
    },
  ]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    steps.forEach((step, index) => {
      const timer = setTimeout(() => {
        setSteps((prev) =>
          prev.map((s) =>
            s.id === step.id
              ? { ...s, status: 'processing' }
              : s.id < step.id
              ? { ...s, status: 'complete' }
              : s
          )
        );
      }, index * 1800);

      timers.push(timer);
    });

    const completeTimer = setTimeout(() => {
      setSteps((prev) => prev.map((s) => ({ ...s, status: 'complete' })));
      
      setTimeout(() => {
        onNavigate('analysis', '1');
      }, 1000);
    }, steps.length * 1800);

    timers.push(completeTimer);

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={onNavigate} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />

      <main className="max-w-3xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-6 rounded-full bg-primary/10 text-primary mb-6 animate-pulse-slow">
            <Loader2 className="w-16 h-16 animate-spin" />
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Analyzing Your Report
          </h1>
          <p className="text-lg text-muted-foreground">
            Our AI is processing your medical report. This usually takes a few seconds.
          </p>
        </motion.div>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex items-start gap-4 bg-card rounded-xl border border-border p-6">
                <div className="flex-shrink-0">
                  {step.status === 'complete' ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-6 h-6" />
                    </motion.div>
                  ) : step.status === 'processing' ? (
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-current" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {step.status === 'processing' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-shrink-0"
                  >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                      Processing
                    </span>
                  </motion.div>
                )}

                {step.status === 'complete' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-shrink-0"
                  >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                      Complete
                    </span>
                  </motion.div>
                )}
              </div>

              {index < steps.length - 1 && (
                <div className="absolute left-[1.875rem] top-[5.5rem] bottom-[-1.5rem] w-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 bg-secondary/30 rounded-xl border border-border p-6 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Please wait...</strong> This process is completely automated 
            and your data remains secure and encrypted throughout.
          </p>
        </motion.div>
      </main>
    </div>
  );
}