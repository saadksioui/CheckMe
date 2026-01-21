
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShieldCheck,
  Trophy,
  User,
  LogOut,
  Hexagon
} from 'lucide-react';
import { UserStats } from '../types';
import XPBar from './XPBar';

interface SidebarProps {
  stats: UserStats;
  userProfile?: any;
}

const Sidebar: React.FC<SidebarProps> = ({ stats, userProfile }) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { id: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: '/defense', label: 'Defense', icon: ShieldCheck },
    { id: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="w-64 bg-black border-r border-slate-800 flex flex-col h-full">
      <div className="p-8 flex items-center gap-3">
        <Hexagon className="text-[#00FFA3]" size={32} />
        <h1 className="text-xl font-bold tracking-tighter text-white">
          check<span className="text-[#00FFA3]">ME</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              pathname === item.id
                ? 'bg-slate-900 text-[#00FFA3] border border-[#00FFA3]/20 shadow-[0_0_10px_rgba(0,255,163,0.1)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
            }`}
          >
            <item.icon size={18} className={pathname === item.id ? 'text-[#00FFA3]' : 'group-hover:text-white'} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4">
        <div className="glass p-4 rounded-xl border border-slate-800 relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-[#00FFA3] flex items-center justify-center bg-slate-900 overflow-hidden">
                <img src={userProfile?.image_url || "https://picsum.photos/seed/42/100/100"} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#00FFA3] border-2 border-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate text-white">{userProfile?.login || 'ft_user'}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Level {stats.level.toFixed(2)}</p>
            </div>
          </div>
          
          <XPBar current={stats.xp} max={stats.maxXp} label="Level Progress" />
          
          <button 
            onClick={() => window.location.reload()}
            className="w-full mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 hover:text-red-400 transition-colors uppercase tracking-widest"
          >
            <LogOut size={12} />
            <span>Terminate</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
