import { Upload, FileText, Image as ImageIcon, CheckCircle, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Navbar } from '../components/Navbar';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';
import { api } from '../lib/api';

interface UploadPageProps {
  onNavigate: (page: string) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export function UploadPage({ onNavigate, darkMode, onToggleDarkMode }: UploadPageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      handleFileUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setUploadProgress(0);
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      toast.error('Please select a file first.');
      return;
    }
    try {
      setIsProcessing(true);
      setUploadProgress(20);
      const uploadResp = await api.uploadReport(uploadedFile);
      setUploadProgress(60);
      const processed = await api.processReport(uploadResp.reportId);
      setUploadProgress(100);

      // Persist latest processed report for analysis page
      localStorage.setItem('latestReportId', uploadResp.reportId);
      localStorage.setItem('latestReportData', JSON.stringify(processed));

      toast.success('Report processed successfully!');
      onNavigate('analysis', uploadResp.reportId);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Failed to process report');
      setUploadProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={onNavigate} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Upload Your Medical Report
          </h1>
          <p className="text-lg text-muted-foreground">
            We'll analyze it using AI and provide easy-to-understand insights
          </p>
        </motion.div>

        {!uploadedFile ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-2xl p-12 transition-all
                ${isDragging 
                  ? 'border-primary bg-primary/5 scale-105' 
                  : 'border-border bg-card hover:border-primary/50'
                }
              `}
            >
              <div className="text-center">
                <div className="inline-flex p-6 rounded-full bg-primary/10 text-primary mb-6">
                  <Upload className="w-12 h-12" />
                </div>
                
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  Drop your report here
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Supports PDF and image files (JPG, PNG). Your data is encrypted and secure.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <label htmlFor="pdf-upload">
                    <input
                      id="pdf-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <Button asChild size="lg" className="gap-2 cursor-pointer">
                      <span>
                        <FileText className="w-5 h-5" />
                        Upload PDF
                      </span>
                    </Button>
                  </label>

                  <label htmlFor="image-upload">
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <Button asChild size="lg" variant="outline" className="gap-2 cursor-pointer">
                      <span>
                        <ImageIcon className="w-5 h-5" />
                        Upload Image
                      </span>
                    </Button>
                  </label>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="bg-card rounded-xl border border-border p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-foreground mb-1">Instant Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  AI processes your report in seconds
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-foreground mb-1">Secure & Private</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is encrypted end-to-end
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-warning/10 text-warning flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-foreground mb-1">Easy to Understand</h3>
                <p className="text-sm text-muted-foreground">
                  Plain English explanations
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl border border-border p-8"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  {uploadedFile.type === 'application/pdf' ? (
                    <FileText className="w-8 h-8" />
                  ) : (
                    <ImageIcon className="w-8 h-8" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {uploadedFile.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
                className="text-destructive hover:text-destructive"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {uploadProgress < 100 ? (
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Uploading...</span>
                  <span className="text-foreground font-medium">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-accent mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Ready to analyze!</span>
                </div>
                
                <div className="bg-secondary/30 rounded-lg p-4 mb-6 border border-border">
                  <p className="text-sm text-foreground">
                    <strong>What happens next:</strong>
                  </p>
                  <ol className="text-sm text-muted-foreground mt-2 ml-4 space-y-1 list-decimal">
                    <li>AI extracts text using OCR technology</li>
                    <li>Medical terms and values are identified</li>
                    <li>Values are compared against normal ranges</li>
                    <li>Easy-to-understand explanations are generated</li>
                  </ol>
                </div>

                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    onClick={handleAnalyze}
                    className="flex-1 h-14 gap-2"
                    disabled={isProcessing}
                  >
                    <Upload className="w-5 h-5" />
                    {isProcessing ? 'Processing...' : 'Analyze Report'}
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={handleRemoveFile}
                    className="h-14"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Back Button */}
        <div className="text-center mt-8">
          <Button variant="ghost" onClick={() => onNavigate('dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}
