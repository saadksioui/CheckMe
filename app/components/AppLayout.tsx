"use client";

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { UserStats } from '../types';

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

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [stats] = useState<UserStats>(INITIAL_STATS);
  const [userProfile] = useState<any>(INITIAL_PROFILE);
  const [secretMode, setSecretMode] = useState(false);

  return (
    <div className="flex h-screen w-full bg-black overflow-hidden font-sans">
      <Sidebar
        stats={stats}
        userProfile={userProfile}
      />

      <main className="flex-1 flex flex-col relative">
        <div className="h-16 border-b border-slate-800 flex items-center px-8 bg-black/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#00FFA3] bg-[#00FFA3]/10 px-2 py-0.5 rounded border border-[#00FFA3]/20">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FFA3] animate-ping" />
              LOCAL MODE: {userProfile?.campus?.toUpperCase()}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-6">
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
          {children}
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

export default AppLayout;