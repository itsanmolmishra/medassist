import { User, Bell, Lock, Trash2, Moon, Sun, Activity, Globe, Eye, Type } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Navbar } from '../components/Navbar';
import { Switch } from '../components/ui/switch';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface SettingsPageProps {
  onNavigate: (page: string) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export function SettingsPage({ onNavigate, darkMode, onToggleDarkMode }: SettingsPageProps) {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [language, setLanguage] = useState('en');
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={onNavigate} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl border border-border p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <User className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
          </div>

          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1">
              <Button variant="outline" size="sm">Change Photo</Button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Full Name
              </label>
              <Input defaultValue="John Doe" className="h-12" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Email Address
              </label>
              <Input defaultValue="john.doe@email.com" type="email" className="h-12" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Age
                </label>
                <Input defaultValue="35" type="number" className="h-12" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Gender
                </label>
                <Input defaultValue="Male" className="h-12" />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button>Save Changes</Button>
          </div>
        </motion.div>

        {/* Health Metrics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Health Metrics</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Height (cm)
              </label>
              <Input defaultValue="175" type="number" className="h-12" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Weight (kg)
              </label>
              <Input defaultValue="75" type="number" className="h-12" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Blood Group
              </label>
              <Input defaultValue="A+" className="h-12" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Allergies
              </label>
              <Input placeholder="None" className="h-12" />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button>Update Metrics</Button>
          </div>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl border border-border p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-warning/10 text-warning">
              <Bell className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-foreground">Push Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive alerts about your health reports
                </p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between py-3 border-t border-border">
              <div>
                <p className="font-medium text-foreground">Email Updates</p>
                <p className="text-sm text-muted-foreground">
                  Get weekly health tips and insights
                </p>
              </div>
              <Switch checked={emailUpdates} onCheckedChange={setEmailUpdates} />
            </div>
          </div>
        </motion.div>

        {/* Appearance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl border border-border p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
              <Switch checked={darkMode} onCheckedChange={onToggleDarkMode} />
            </div>
          </div>
        </motion.div>

        {/* Accessibility Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-card rounded-2xl border border-border p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <Eye className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Accessibility</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-foreground">High Contrast Mode</p>
                <p className="text-sm text-muted-foreground">
                  Increase contrast for better visibility
                </p>
              </div>
              <Switch checked={highContrast} onCheckedChange={setHighContrast} />
            </div>

            <div className="flex items-center justify-between py-3 border-t border-border">
              <div>
                <p className="font-medium text-foreground">Large Text Mode</p>
                <p className="text-sm text-muted-foreground">
                  Increase text size for easier reading
                </p>
              </div>
              <Switch checked={largeText} onCheckedChange={setLargeText} />
            </div>

            <div className="py-3 border-t border-border">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-foreground">Language</p>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred language
                  </p>
                </div>
                <Globe className="w-5 h-5 text-muted-foreground" />
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                  <SelectItem value="es">Español (Spanish)</SelectItem>
                  <SelectItem value="fr">Français (French)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl border border-border p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Security</h2>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start h-12">
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start h-12">
              <Lock className="w-4 h-4 mr-2" />
              Two-Factor Authentication
            </Button>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-destructive/5 rounded-2xl border border-destructive/20 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
              <Trash2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-destructive">Danger Zone</h2>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. All your reports and data will be permanently deleted.
          </p>

          <Button variant="destructive" className="gap-2">
            <Trash2 className="w-4 h-4" />
            Delete Account
          </Button>
        </motion.div>

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