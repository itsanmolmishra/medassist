import { Shield, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function PrivacyBanner() {
  const [isVisible, setIsVisible] = useState(() => {
    return !localStorage.getItem('medassist_privacy_banner_dismissed');
  });

  const handleDismiss = () => {
    localStorage.setItem('medassist_privacy_banner_dismissed', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <Shield className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">
                  <strong>🔒 Privacy Protected:</strong> Your reports are stored securely and can be deleted anytime. 
                  We never share your data without consent. This app is for educational purposes only.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-primary-foreground hover:bg-primary-foreground/20 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
