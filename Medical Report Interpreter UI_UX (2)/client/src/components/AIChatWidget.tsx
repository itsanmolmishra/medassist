import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Sparkles, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatWidgetProps {
  reportContext?: string;
}

const quickPrompts = [
  "Why is my glucose high?",
  "What foods should I eat?",
  "How can I improve these results?",
  "Is this serious?",
  "What are next steps?",
];

export function AIChatWidget({ reportContext }: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI health assistant. Ask me anything about your medical report. I'll explain it in simple language! 😊"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector('[data-slot="scroll-area-viewport"]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('glucose') || lowerQuery.includes('sugar')) {
      return "High glucose levels can be caused by diet, stress, or underlying conditions like diabetes. I recommend:\n\n1. Reduce sugar and refined carbs\n2. Increase fiber intake (vegetables, whole grains)\n3. Exercise regularly (30 min daily walk)\n4. Consult your doctor for proper diagnosis\n\nWould you like specific meal suggestions?";
    }
    
    if (lowerQuery.includes('food') || lowerQuery.includes('eat') || lowerQuery.includes('diet')) {
      return "Based on your results, here's what I recommend:\n\n✅ INCLUDE:\n• Leafy greens (spinach, kale)\n• Lean proteins (chicken, fish)\n• Whole grains (brown rice, oats)\n• Fresh fruits (berries, apples)\n• Nuts and seeds\n\n❌ LIMIT:\n• Processed foods\n• Sugary drinks\n• White bread/pasta\n• Fried foods\n\nStay hydrated with 8+ glasses of water daily!";
    }
    
    if (lowerQuery.includes('serious') || lowerQuery.includes('worried') || lowerQuery.includes('concern')) {
      return "Your results show some values that need attention, but they're manageable with lifestyle changes. Here's what to know:\n\n🟢 Not an emergency\n🟡 Needs monitoring\n🔵 Can improve with diet & exercise\n\nI recommend consulting your doctor for a personalized plan. Most people see improvement within 2-3 months with proper care.";
    }
    
    if (lowerQuery.includes('next') || lowerQuery.includes('what should') || lowerQuery.includes('what do')) {
      return "Here's your action plan:\n\n📅 NEXT 24 HOURS:\n• Start drinking more water\n• Plan healthy meals for the week\n\n📅 THIS WEEK:\n• Schedule doctor appointment\n• Begin daily 30-min walks\n• Keep a food diary\n\n📅 THIS MONTH:\n• Follow doctor's advice\n• Retest in 4-6 weeks\n• Track your progress\n\nConsistent small steps lead to big improvements!";
    }
    
    if (lowerQuery.includes('improve') || lowerQuery.includes('better')) {
      return "Great question! Here are proven ways to improve your results:\n\n💪 EXERCISE: 30 mins daily (walking, swimming, cycling)\n🥗 NUTRITION: More vegetables, less processed food\n😴 SLEEP: 7-8 hours consistently\n🧘 STRESS: Meditation, deep breathing, yoga\n💊 MEDICATION: Follow doctor's prescriptions\n📊 MONITORING: Track your progress weekly\n\nMost people see significant improvement in 8-12 weeks!";
    }

    return "I understand your question. Based on your report, I recommend:\n\n1. Follow the personalized advice on this page\n2. Maintain a healthy diet and exercise routine\n3. Consult with your doctor for specific guidance\n4. Monitor your symptoms and retest as advised\n\nIs there a specific aspect of your results you'd like me to explain in more detail?";
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              size="lg"
              onClick={() => setIsOpen(true)}
              className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-shadow"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-accent rounded-full animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] bg-card rounded-2xl border border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Health Assistant</h3>
                  <p className="text-xs text-white/80">Ask me anything!</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Prompts */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.slice(0, 3).map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(prompt)}
                      className="text-xs bg-muted hover:bg-muted/80 text-foreground px-3 py-1.5 rounded-full transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button type="submit" size="icon" disabled={isTyping || !input.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}