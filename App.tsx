
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Examples from './components/Examples';
import Features from './components/Features';
import Steps from './components/Steps';
import Order from './components/Order';
import BottomNav from './components/BottomNav';
import LoginGate from './components/LoginGate';
import AdminDashboard from './components/AdminDashboard';
import PersonalPage from './components/PersonalPage';
import LinksPage from './components/LinksPage';
import { dbAPI } from './services/dbService';
import { AdminConfig, UserPageData } from './types';

const App: React.FC = () => {
  const [config, setConfig] = useState<AdminConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [path, setPath] = useState(window.location.pathname);
  const [activeSection, setActiveSection] = useState<'home' | 'examples' | 'features' | 'steps' | 'order'>('home');
  const [currentUser, setCurrentUser] = useState<UserPageData | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // جلب البيانات من "قاعدة البيانات" عند التشغيل
  useEffect(() => {
    const initDB = async () => {
      const data = await dbAPI.getConfig();
      setConfig(data);
      setIsLoading(false);
    };
    initDB();
  }, []);

  useEffect(() => {
    const handleLocationChange = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (newPath: string) => {
    window.history.pushState({}, '', newPath);
    setPath(newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = async (pass: string) => {
    if (path === '/admin') {
      const success = await dbAPI.authenticateAdmin(pass);
      if (success) {
        setIsAdminLoggedIn(true);
      } else {
        alert('رمز الإدمن غير صحيح');
      }
      return;
    }

    const user = await dbAPI.authenticateUser(pass);
    if (user) {
      setCurrentUser(user);
      navigate('/view');
    } else {
      alert('الرمز غير صحيح');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentUser(null);
    navigate('/');
  };

  // شاشة التحميل (Splash Screen) - تم تعديلها لتظهر قلب نابض فقط بدون خلفية
  if (isLoading || !config) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
        <div className="text-7xl sm:text-8xl animate-heartbeat select-none">
          ❤️
        </div>
        <style>{`
          @keyframes heartbeat {
            0% { transform: scale(1); }
            14% { transform: scale(1.15); }
            28% { transform: scale(1); }
            42% { transform: scale(1.15); }
            70% { transform: scale(1); }
          }
          .animate-heartbeat {
            animation: heartbeat 1.5s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  const renderContent = () => {
    if (path === '/links') return <LinksPage />;

    if (path === '/admin') {
      return isAdminLoggedIn ? (
        <AdminDashboard config={config} setConfig={setConfig} onLogout={handleLogout} />
      ) : (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <LoginGate onLogin={handleLogin} onBack={() => navigate('/')} />
        </div>
      );
    }

    if (path === '/view' && currentUser) {
      return <PersonalPage data={currentUser} onLogout={handleLogout} />;
    }

    return (
      <div className="flex flex-col items-center">
        <Navbar onLoginClick={() => {}} hideLogin={true} />
        <main className="w-full max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-32 animate-in fade-in duration-700">
          {activeSection === 'home' && <Hero content={config.landing} onCategoryClick={() => setActiveSection('order')} />}
          {activeSection === 'examples' && <Examples items={config.landing.examples} onItemClick={handleLogin} />}
          {activeSection === 'features' && <Features onCtaClick={() => setActiveSection('order')} />}
          {activeSection === 'steps' && <Steps steps={config.landing.steps} />}
          {activeSection === 'order' && <Order />}
        </main>
        <BottomNav active={activeSection} setActive={setActiveSection} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 overflow-x-hidden font-['Cairo']" dir="rtl">
      {renderContent()}
    </div>
  );
};

export default App;
