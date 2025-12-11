import { Shield, Lock, Eye, Trash2, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { useState } from 'react';

interface PrivacyConsentProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export function PrivacyConsent({ isOpen, onAccept, onDecline }: PrivacyConsentProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  const canProceed = agreedToTerms && agreedToPrivacy;

  return (
    <Dialog open={isOpen} onOpenChange={onDecline}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle className="text-2xl">Privacy & Data Protection</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            Your privacy and data security are our top priorities. Please review the following:
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Privacy Features */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/10">
              <Lock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Secure Storage</h4>
                <p className="text-sm text-muted-foreground">
                  Your reports are encrypted and stored securely. Only you can access them.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/10">
              <Eye className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">No Sharing</h4>
                <p className="text-sm text-muted-foreground">
                  We never share your medical data with third parties without your explicit consent.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/10">
              <Trash2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Delete Anytime</h4>
                <p className="text-sm text-muted-foreground">
                  You can delete your reports and data at any time from Settings.
                </p>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="border-l-4 border-warning bg-warning/10 p-4 rounded-r-lg">
            <h4 className="font-semibold text-foreground mb-2">⚠️ Important Notice</h4>
            <p className="text-sm text-muted-foreground mb-2">
              MedAssist AI is designed for educational and informational purposes. It is NOT meant for:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Collecting Personally Identifiable Information (PII)</li>
              <li>• Storing highly sensitive medical records</li>
              <li>• Replacing professional medical advice</li>
              <li>• Emergency medical situations</li>
            </ul>
          </div>

          {/* Terms */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Before you continue:</h4>
            
            <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <Checkbox 
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-foreground cursor-pointer flex-1">
                I understand this is an educational tool and not a substitute for professional medical advice
              </label>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <Checkbox 
                id="privacy"
                checked={agreedToPrivacy}
                onCheckedChange={(checked) => setAgreedToPrivacy(checked as boolean)}
              />
              <label htmlFor="privacy" className="text-sm text-foreground cursor-pointer flex-1">
                I agree to the Privacy Policy and understand my data will be stored securely and can be deleted anytime
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={onDecline} className="flex-1">
            Decline
          </Button>
          <Button 
            onClick={onAccept} 
            disabled={!canProceed}
            className="flex-1 gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Accept & Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
