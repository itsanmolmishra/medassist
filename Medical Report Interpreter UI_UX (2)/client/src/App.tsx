import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { UploadPage } from './pages/UploadPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { Toaster } from './components/ui/sonner';
import { OnboardingModal } from './components/OnboardingModal';
import { PrivacyConsent } from './components/PrivacyConsent';

type Page = 
  | 'landing' 
  | 'login' 
  | 'signup' 
  | 'dashboard' 
  | 'upload' 
  | 'processing' 
  | 'analysis' 
  | 'history' 
  | 'settings'
  | 'demo';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedReportId, setSelectedReportId] = useState<string | undefined>();
  const [darkMode, setDarkMode] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPrivacyConsent, setShowPrivacyConsent] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingCompleted = localStorage.getItem('medassist_onboarding_completed');
    if (!onboardingCompleted && currentPage === 'dashboard') {
      setShowOnboarding(true);
    }
  }, [currentPage]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleNavigate = (page: string, reportId?: string) => {
    // Show privacy consent before upload
    if (page === 'upload') {
      const consentGiven = localStorage.getItem('medassist_privacy_consent');
      if (!consentGiven) {
        setShowPrivacyConsent(true);
        return;
      }
    }
    
    setCurrentPage(page as Page);
    setSelectedReportId(reportId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrivacyAccept = () => {
    localStorage.setItem('medassist_privacy_consent', 'true');
    setShowPrivacyConsent(false);
    setCurrentPage('upload');
  };

  const handlePrivacyDecline = () => {
    setShowPrivacyConsent(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      
      case 'signup':
        return <SignupPage onNavigate={handleNavigate} />;
      
      case 'dashboard':
        return (
          <DashboardPage 
            onNavigate={handleNavigate} 
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );
      
      case 'upload':
        return (
          <UploadPage 
            onNavigate={handleNavigate}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );
      
      case 'processing':
        return (
          <ProcessingPage 
            onNavigate={handleNavigate}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );
      
      case 'analysis':
      case 'demo':
        return (
          <AnalysisPage 
            reportId={selectedReportId}
            onNavigate={handleNavigate}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );
      
      case 'history':
        return (
          <HistoryPage 
            onNavigate={handleNavigate}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );
      
      case 'settings':
        return (
          <SettingsPage 
            onNavigate={handleNavigate}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );
      
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      {renderPage()}
      <Toaster />
      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
      <PrivacyConsent isOpen={showPrivacyConsent} onAccept={handlePrivacyAccept} onDecline={handlePrivacyDecline} />
    </>
  );
}