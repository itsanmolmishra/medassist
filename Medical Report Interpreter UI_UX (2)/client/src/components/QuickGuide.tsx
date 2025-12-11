import { FileUp, Brain, CheckCircle, Download, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { useState } from 'react';

export function QuickGuide() {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      icon: FileUp,
      title: 'Upload Report',
      description: 'Upload your medical lab report as PDF or image',
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Our AI processes and interprets your results',
    },
    {
      icon: CheckCircle,
      title: 'Get Insights',
      description: 'Receive easy-to-understand explanations',
    },
    {
      icon: Download,
      title: 'Take Action',
      description: 'Download summary and get health recommendations',
    },
  ];

  if (!isOpen) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="lg"
          onClick={() => setIsOpen(true)}
          className="rounded-full shadow-lg gap-2"
        >
          <HelpCircle className="w-5 h-5" />
          Quick Guide
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-50 bg-card rounded-2xl border border-border shadow-2xl p-6 max-w-md"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">How It Works</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
              <step.icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
