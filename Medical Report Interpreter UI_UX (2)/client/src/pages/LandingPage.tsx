import { Activity, Upload, PlayCircle, CheckCircle, Shield, Zap, Brain, FileText, Users, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const keyFeatures = [
    {
      icon: Brain,
      title: 'AI Explanation',
      description: 'Smart AI breaks down complex medical terms into simple language anyone can understand',
    },
    {
      icon: Users,
      title: 'Low-literacy Friendly',
      description: 'Designed for everyone, with icons, simple words, and clear visuals',
    },
    {
      icon: Zap,
      title: 'Fast OCR Parsing',
      description: 'Instantly extract data from PDF or image reports in seconds',
    },
    {
      icon: FileText,
      title: 'Doctor-ready Summary',
      description: 'Download a clear summary to share with your healthcare provider',
    },
  ];

  const howItWorksSteps = [
    { step: '1', title: 'Upload', description: 'Upload your lab report (PDF or image)' },
    { step: '2', title: 'Parse', description: 'AI extracts and reads your test results' },
    { step: '3', title: 'Explain', description: 'Get simple explanations for every result' },
    { step: '4', title: 'Take Action', description: 'Receive personalized health advice' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#E8F4FF] to-[#E6F9F5]">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-6 py-5 border-b border-border/50 bg-card/90 backdrop-blur-md sticky top-0 z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-lg">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">MedAssist AI</h1>
              <p className="text-xs text-muted-foreground">Smart Medical Report Interpreter</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => onNavigate('login')}>
              Sign In
            </Button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button onClick={() => onNavigate('signup')} className="shadow-md">
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full mb-6 text-sm border border-accent/20"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-accent"
                />
                AI-Powered Health Insights
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="block"
                >
                  Understand Your
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                >
                  Medical Reports
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="block"
                >
                  In Seconds
                </motion.span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg text-muted-foreground mb-8 leading-relaxed"
              >
                Get simple explanations, personalized health advice, and track your progress—all powered by AI. 
                Built for everyone, from patients to caregivers.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" onClick={() => onNavigate('signup')} className="gap-2 shadow-lg">
                    <PlayCircle className="w-5 h-5" />
                    Get Started Free
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" variant="outline" onClick={() => onNavigate('demo')} className="gap-2">
                    See Demo
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-white">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Patient reviewing medical report with AI assistance"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Floating card - Analysis Complete */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl border border-border p-5 max-w-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-accent text-accent-foreground">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Report Analyzed ✓</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">All values explained in simple terms</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card - AI Assistant */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-2xl border border-border p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary text-primary-foreground">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">AI Assistant</p>
                    <p className="text-xs text-muted-foreground">Working...</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to understand your health
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {howItWorksSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Key Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to understand your medical reports
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-border p-6 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary inline-flex mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="px-6 py-16 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <p className="text-muted-foreground">Reports Analyzed</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-accent mb-2">98%</div>
              <p className="text-muted-foreground">Accuracy Rate</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">&lt;30s</div>
              <p className="text-muted-foreground">Average Processing Time</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary via-[#1E78E0] to-accent rounded-3xl p-12 text-white shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Understand Your Health Better?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Join thousands of patients taking control of their health with AI
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => onNavigate('signup')}
                className="gap-2 shadow-lg"
              >
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onNavigate('demo')}
                className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                <PlayCircle className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-border bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">MedAssist AI</p>
                <p className="text-xs text-muted-foreground">Smart Medical Reports</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">© 2025 MedAssist AI. All rights reserved.</p>
              <p className="text-xs text-muted-foreground mt-1">⚠️ Not a substitute for professional medical advice.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}