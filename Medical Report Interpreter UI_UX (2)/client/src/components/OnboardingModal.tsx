import { useState } from 'react';
import { X, FileUp, Activity, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const slides = [
  {
    icon: Activity,
    title: 'Welcome to MedAssist AI',
    description: 'Your personal medical report interpreter and health advisor',
    details: [
      'Understand your lab reports in simple language',
      'Get personalized health advice',
      'Track your health progress over time',
    ],
  },
  {
    icon: FileUp,
    title: 'How to Upload Reports',
    description: 'Simple and secure report upload process',
    details: [
      'Take a photo of your report or upload PDF',
      'Our AI extracts and analyzes the data',
      'Get results in under 30 seconds',
    ],
  },
  {
    icon: CheckCircle,
    title: 'How AI Helps You',
    description: 'Smart insights for better health decisions',
    details: [
      'Plain language explanations of medical terms',
      'Personalized diet and lifestyle recommendations',
      'Track trends and compare multiple reports',
    ],
  },
];

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      localStorage.setItem('medassist_onboarding_completed', 'true');
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('medassist_onboarding_completed', 'true');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">
          {slides[currentSlide].title}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {slides[currentSlide].description}
        </DialogDescription>
        
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Skip onboarding"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                  {(() => {
                    const IconComponent = slides[currentSlide].icon;
                    return <IconComponent className="w-16 h-16 text-primary" />;
                  })()}
                </div>
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-3">
                {slides[currentSlide].title}
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                {slides[currentSlide].description}
              </p>

              <div className="space-y-4 mb-8">
                {slides[currentSlide].details.map((detail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 text-left p-4 rounded-lg bg-muted/30"
                  >
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-foreground">{detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            <Button onClick={handleNext} className="gap-2">
              {currentSlide === slides.length - 1 ? (
                <>
                  Get Started
                  <CheckCircle className="w-4 h-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}