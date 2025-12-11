import { useState } from 'react';
import { Volume2, VolumeX, Pause } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface VoiceReaderProps {
  text: string;
  label?: string;
}

export function VoiceReader({ text, label = "Read Aloud" }: VoiceReaderProps) {
  const [isReading, setIsReading] = useState(false);

  const handleReadAloud = () => {
    if (!('speechSynthesis' in window)) {
      toast.error('Voice reading not supported in your browser');
      return;
    }

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsReading(true);
      toast.success('Reading aloud...');
    };

    utterance.onend = () => {
      setIsReading(false);
    };

    utterance.onerror = () => {
      setIsReading(false);
      toast.error('Failed to read text');
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleReadAloud}
      className="gap-2"
    >
      {isReading ? (
        <>
          <Pause className="w-4 h-4" />
          Stop Reading
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4" />
          {label}
        </>
      )}
    </Button>
  );
}
