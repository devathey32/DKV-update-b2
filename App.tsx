import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Users, Zap, Timer, Sparkles, LayoutGrid, UsersRound, Menu, UserCheck } from 'lucide-react';
import { HeroSection } from './components/HeroSection';
import { InfoCard } from './components/InfoCard';
import { ScheduleTab } from './components/ScheduleTab';
import { StudentPicketTab } from './components/StudentPicketTab';
import { TeacherTab } from './components/TeacherTab';
import { SubstituteTab } from './components/SubstituteTab';
import { PicketTab } from './components/PicketTab';
import { LogModal } from './components/LogModal';
import { Sidebar } from './components/Sidebar';
import { PJOKInfoCard } from './components/PJOKInfoCard';
import { TabType } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('jadwal');
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (newTab: TabType) => {
    setActiveTab(newTab);
  };

  useEffect(() => {
    if (contentRef.current) {
      const header = contentRef.current.querySelector('h2');
      if (header) {
        header.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeTab]);

  // Menu Configuration
  const tabs = [
    { id: 'jadwal', label: 'Jadwal', icon: <Calendar size={20} /> },
    { id: 'piketKelas', label: 'Piket Kelas', icon: <Sparkles size={20} /> },
    { id: 'guru', label: 'Guru', icon: <Users size={20} /> },
    { id: 'pengganti', label: 'Team Teaching', icon: <Timer size={20} /> },
    { id: 'piket', label: 'Guru Piket', icon: <UserCheck size={20} /> },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0f172a] font-sans selection:bg-primary selection:text-white">
      
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 min-h-screen flex flex-col">
        
        {/* Top Actions */}
        <div className="flex justify-between items-center py-4">
           <div className="flex items-center gap-3">
             <button
               onClick={() => setIsSidebarOpen(true)}
               className="bg-white/5 hover:bg-white/10 text-slate-300 p-2 rounded-full transition-all duration-fast ease-smooth border border-white/5 active:scale-95"
             >
               <Menu size={18} />
             </button>
             <div className="text-white font-heading font-semibold tracking-wide text-sm">XI DKV 2</div>
           </div>
           <button
             onClick={() => setIsLogOpen(true)}
             className="bg-white/5 hover:bg-white/10 text-slate-300 p-2 rounded-full transition-all duration-fast ease-smooth border border-white/5 active:scale-95"
           >
             <Sparkles size={18} />
           </button>
        </div>

        {/* Hero Section */}
        <HeroSection />

        {/* Info Cards (Always Visible) */}
        <div>
          <InfoCard />
        </div>

        {/* Content Area */}
        <div className="flex-1" key={activeTab} ref={contentRef}>
          {activeTab === 'jadwal' && <ScheduleTab onNavigateToTeacher={() => handleTabChange('guru')} />}
          {activeTab === 'piketKelas' && <StudentPicketTab />}
          {activeTab === 'guru' && <TeacherTab />}
          {activeTab === 'pengganti' && <SubstituteTab />}
          {activeTab === 'piket' && <PicketTab />}
        </div>

        {/* Footer Credit */}
        <div className="py-6 pb-28 md:pb-10">
          <div className="fixed bottom-28 md:bottom-24 left-4 z-40">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
              <p className="font-script text-sm text-white hover:text-slate-200 transition-colors cursor-default">
                By Deva
              </p>
            </div>
          </div>
        </div>

        {/* Floating Dock Navigation (Bottom for Mobile, Sticky for Desktop) */}
        <div className="fixed bottom-10 md:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
          <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex justify-between items-center shadow-2xl shadow-black/50">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as TabType)}
                  className={`
                    relative flex flex-col items-center justify-center w-full py-2 rounded-xl transition-all duration-normal ease-smooth active:scale-95
                    ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'}
                  `}
                >
                  {/* Glow Effect behind active icon */}
                  {isActive && (
                    <div className="absolute inset-0 bg-primary/20 blur-md rounded-xl transition-opacity duration-fast"></div>
                  )}

                  <div className={`relative z-10 transition-transform duration-normal ease-smooth ${isActive ? '-translate-y-1' : ''}`}>
                    {tab.icon}
                  </div>

                  {false && (
                    <span className="absolute -bottom-1 text-[10px] font-bold tracking-wide animate-fade-in">
                      {tab.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      <LogModal isOpen={isLogOpen} onClose={() => setIsLogOpen(false)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <PJOKInfoCard />
    </div>
  );
}

export default App;