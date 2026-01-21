
import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Camera, Shield, Save } from 'lucide-react';
import { UserStats } from '../types.ts';

interface ProfileProps {
  stats: UserStats;
  userProfile?: any;
}

const Profile: React.FC<ProfileProps> = ({ stats, userProfile }) => {
  const [profileImg, setProfileImg] = useState(userProfile?.image_url || 'https://picsum.photos/seed/42/400/400');

  const radarData = [
    { subject: 'Rigor', A: stats.rigor, fullMark: 100 },
    { subject: 'Pythonic', A: stats.pythonic, fullMark: 100 },
    { subject: 'Arch', A: stats.architecture, fullMark: 100 },
    { subject: 'Algo', A: stats.algorithm, fullMark: 100 },
    { subject: 'Social', A: 42, fullMark: 100 },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImg(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 p-8 space-y-8 overflow-y-auto">
      <header>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Student Profile</h2>
        <p className="text-slate-400">Manage your credentials and track your piscine growth.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Avatar Studio */}
          <div className="glass rounded-2xl p-8 border border-slate-800 relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="relative group">
                <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl relative">
                  <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <label className="absolute -bottom-2 -right-2 p-3 bg-[#00FFA3] text-black rounded-xl cursor-pointer hover:scale-110 transition-transform shadow-lg">
                  <Camera size={20} />
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2 text-[#00FFA3]">
                  <Shield size={18} />
                  <span className="text-sm font-bold uppercase tracking-widest">42 Digital Identity</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{userProfile?.login || 'ft_student'}</h3>
                <p className="text-sm text-slate-400">Your profile is currently running in local mode. AI profile customization is disabled.</p>
                <div className="flex gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-lg px-6 py-3 text-center min-w-[100px]">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Campus</p>
                    <p className="text-sm font-bold text-white">{userProfile?.campus}</p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-lg px-6 py-3 text-center min-w-[100px]">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Coalition</p>
                    <p className="text-sm font-bold text-[#00FFA3]">{userProfile?.coalition}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass p-6 rounded-xl border border-slate-800 text-center">
              <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase">Level</p>
              <p className="text-2xl font-bold text-white">{stats.level}</p>
            </div>
            <div className="glass p-6 rounded-xl border border-slate-800 text-center">
              <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase">Evaluation Points</p>
              <p className="text-2xl font-bold text-[#00FFA3]">{userProfile?.correction_points}</p>
            </div>
            <div className="glass p-6 rounded-xl border border-slate-800 text-center">
              <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase">Correction Score</p>
              <p className="text-2xl font-bold text-emerald-400">125%</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 border border-slate-800 flex flex-col items-center">
          <h4 className="font-bold mb-6 uppercase text-[10px] tracking-widest text-slate-500 self-start">Skill Radar</h4>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} axisLine={false} tick={false} />
                <Radar
                  name={userProfile?.login || "ft_user"}
                  dataKey="A"
                  stroke="#00FFA3"
                  fill="#00FFA3"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 w-full space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Rigor Score</span>
              <span className="text-[#00FFA3] font-bold">{stats.rigor}%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Pythonic Mastery</span>
              <span className="text-[#00FFA3] font-bold">{stats.pythonic}%</span>
            </div>
          </div>
          <button className="mt-auto w-full py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 text-white">
            <Save size={14} /> Update Signature
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
