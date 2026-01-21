
import React, { useState } from 'react';
import Sidebar from './components/Sidebar.tsx';
import Dashboard from './components/Dashboard.tsx';
import Defense from './components/Defense.tsx';
import Profile from './components/Profile.tsx';
import { AppView, UserStats } from './types.ts';
import { Globe, Hexagon } from 'lucide-react';

const INITIAL_PROFILE = {
  login: "ft_student",
  level: 4.42,
  correction_points: 8,
  coalition: "HIVE",
  campus: "Paris",
  image_url: "https://picsum.photos/seed/42/200/200"
};

const INITIAL_STATS: UserStats = {
  level: 4.42,
  xp: 420,
  maxXp: 1000,
  rigor: 85,
  pythonic: 78,
  architecture: 92,
  algorithm: 88
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [userProfile] = useState<any>(INITIAL_PROFILE);
  const [uploadedCode, setUploadedCode] = useState<string>('');
  const [secretMode, setSecretMode] = useState(false);

  const handleUploadSuccess = (code: string) => {
    setUploadedCode(code);
    setCurrentView(AppView.DEFENSE);
    setStats(prev => ({ ...prev, xp: (prev.xp + 120) % 1000 }));
  };

  return (
    <div className="flex h-screen w-full bg-black overflow-hidden font-sans">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        stats={stats} 
        userProfile={userProfile}
      />
      
      <main className="flex-1 flex flex-col relative">
        <div className="h-16 border-b border-slate-800 flex items-center px-8 bg-black/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#00FFA3] bg-[#00FFA3]/10 px-2 py-0.5 rounded border border-[#00FFA3]/20">
              <div className="w-1 h-1 rounded-full bg-[#00FFA3] animate-ping" />
              LOCAL MODE: {userProfile?.campus?.toUpperCase()}
            </div>
          </div>
          
          <div className="ml-auto flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Correction Points</span>
              <span className="text-xs font-mono text-[#00FFA3]">{userProfile?.correction_points}₳</span>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold text-white">{userProfile?.login}</p>
                <p className="text-[10px] text-[#00FFA3] uppercase font-bold">{userProfile?.coalition}</p>
              </div>
              <img src={userProfile?.image_url} className="w-10 h-10 rounded-lg border border-slate-800 object-cover" />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {currentView === AppView.DASHBOARD && <Dashboard onSuccess={handleUploadSuccess} xp={stats.xp} />}
          {currentView === AppView.DEFENSE && <Defense code={uploadedCode} />}
          {currentView === AppView.PROFILE && <Profile stats={stats} userProfile={userProfile} />}
          {currentView === AppView.LEADERBOARD && (
             <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <Globe className="text-[#00FFA3] mb-4" size={64} />
                <h2 className="text-2xl font-bold mb-2">Global Ranking</h2>
                <p className="text-slate-500 max-w-sm">Local cache active. Real-time ranking disabled.</p>
             </div>
          )}
        </div>

        <footer className="h-10 border-t border-slate-800 px-8 flex items-center justify-between text-[10px] text-slate-600 font-mono bg-black">
          <div>checkME v3.1.2 // STABLE (LOCAL)</div>
          <button 
            onClick={() => setSecretMode(!secretMode)}
            className={`flex items-center gap-2 hover:text-white transition-colors ${secretMode ? 'text-[#00FFA3]' : ''}`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${secretMode ? 'bg-[#00FFA3] shadow-[0_0_5px_#00FFA3]' : 'bg-slate-700'}`} />
            PRO_DEBUG_MODE
          </button>
        </footer>
      </main>
    </div>
  );
};

export default App;
