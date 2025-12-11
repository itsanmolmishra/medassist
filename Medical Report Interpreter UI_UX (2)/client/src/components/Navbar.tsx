import { Activity, Home, Upload, History, Settings, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export function Navbar({ onNavigate, darkMode, onToggleDarkMode }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Dashboard', page: 'dashboard' },
    { icon: Upload, label: 'Upload', page: 'upload' },
    { icon: History, label: 'History', page: 'history' },
    { icon: Settings, label: 'Settings', page: 'settings' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 5
              }}
              className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-lg"
            >
              <Activity className="w-6 h-6" />
            </motion.div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">MedAssist AI</h1>
              <p className="text-xs text-muted-foreground">Smart Health Companion</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.page}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => onNavigate(item.page)}
                  className="gap-2 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Button>
              </motion.div>
            ))}

            {onToggleDarkMode && (
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleDarkMode}
                  className="rounded-full"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.page}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => {
                        onNavigate(item.page);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start gap-3"
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Button>
                  </motion.div>
                ))}
                {onToggleDarkMode && (
                  <Button
                    variant="ghost"
                    onClick={onToggleDarkMode}
                    className="w-full justify-start gap-3"
                  >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}