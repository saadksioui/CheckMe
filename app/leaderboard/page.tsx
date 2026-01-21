"use client";

import React from 'react';
import { Globe, Hexagon } from 'lucide-react';

const LeaderboardPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <Globe className="text-[#00FFA3] mb-4" size={64} />
      <h2 className="text-2xl font-bold mb-2">Global Ranking</h2>
      <p className="text-slate-500 max-w-sm">Local cache active. Real-time ranking disabled.</p>
    </div>
  );
};

export default LeaderboardPage;