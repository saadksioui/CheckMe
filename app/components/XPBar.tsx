
import React from 'react';
import { motion } from 'framer-motion';

interface XPBarProps {
  current: number;
  max: number;
  label?: string;
}

const XPBar: React.FC<XPBarProps> = ({ current, max, label = "XP Progress" }) => {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-slate-500">
        <span>{label}</span>
        <span className="text-[#00FFA3]">{current} / {max}</span>
      </div>
      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-[#00FFA3] relative shadow-[0_0_10px_#00FFA3]"
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
};

export default XPBar;
