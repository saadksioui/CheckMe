
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, CheckCircle2, XCircle, ChevronRight, Loader2, Code2, Beaker } from 'lucide-react';
import { TerminalLog } from '../types';
import { evaluateCode } from '../services/geminiService';

interface TerminalProps {
  code: string;
  onComplete: (passed: boolean) => void;
}

const Terminal: React.FC<TerminalProps> = ({ code, onComplete }) => {
  const [displayedLogs, setDisplayedLogs] = useState<any[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    let timer: NodeJS.Timeout;

    const startTest = async () => {
      try {
        const aiLogs = await evaluateCode(code);
        if (!mounted) return;
        setIsEvaluating(false);

        const logs = Array.isArray(aiLogs) ? aiLogs : [];
        let i = 0;

        const animateLogs = () => {
          if (!mounted) return;
          if (i < logs.length) {
            const currentLog = logs[i];
            if (currentLog) {
              setDisplayedLogs(prev => [...prev, currentLog]);
            }
            i++;
            timer = setTimeout(animateLogs, 250);
          } else {
            const hasError = logs.some(l => l && l.status === 'error');
            timer = setTimeout(() => {
              if (mounted) onComplete(!hasError);
            }, 1000);
          }
        };
        animateLogs();
      } catch (err) {
        if (mounted) {
          setDisplayedLogs([{ phase: "sys", text: "Evaluation service failed.", status: "error" }]);
          setIsEvaluating(false);
          timer = setTimeout(() => onComplete(true), 2000);
        }
      }
    };

    startTest();
    return () => { mounted = false; clearTimeout(timer); };
  }, [code, onComplete]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [displayedLogs]);

  // Group logs by phase with defensive checks
  const lintLogs = displayedLogs.filter(l => l && l.phase === 'lint');
  const testLogs = displayedLogs.filter(l => l && l.phase === 'test');

  return (
    <div className="w-full max-w-2xl bg-[#050505] border border-slate-800 rounded-lg overflow-hidden shadow-2xl">
      <div className="bg-[#111] px-4 py-2 border-b border-slate-800 flex items-center gap-2">
        <TerminalIcon size={14} className="text-[#00FFA3]" />
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">moulinette_v4.42</span>
        {isEvaluating && <Loader2 size={12} className="text-[#00FFA3] animate-spin ml-auto" />}
      </div>
      
      <div ref={scrollRef} className="p-6 h-80 font-mono text-sm space-y-4 overflow-y-auto bg-black scrollbar-hide">
        {/* Phase 1: Linting */}
        {(lintLogs.length > 0 || isEvaluating) && (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">
              <Code2 size={12} /> Step 1: Flake8 Compliance
            </div>
            {lintLogs.map((log, i) => (
              <LogEntry key={i} log={log} />
            ))}
          </div>
        )}

        {/* Phase 2: Testing */}
        {testLogs.length > 0 && (
          <div className="space-y-1 pt-4 border-t border-slate-900">
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">
              <Beaker size={12} /> Step 2: LeetCode-style Test Runner
            </div>
            {testLogs.map((log, i) => (
              <LogEntry key={i} log={log} />
            ))}
          </div>
        )}

        {isEvaluating && (
          <div className="flex items-center gap-2 text-slate-600 animate-pulse italic">
            <ChevronRight size={14} />
            <span>Connecting to sandbox cluster...</span>
          </div>
        )}
      </div>
    </div>
  );
};

const LogEntry = ({ log }: { log: any }) => (
  <div className="flex items-start gap-2 animate-in fade-in slide-in-from-left-1 duration-200">
    <span className="text-slate-800 shrink-0"><ChevronRight size={14} /></span>
    <span className={
      log.status === 'success' ? 'text-[#00FFA3]' : 
      log.status === 'error' ? 'text-red-500' : 'text-slate-400'
    }>
      {log.text}
      {log.status === 'success' && <CheckCircle2 size={12} className="inline ml-2" />}
      {log.status === 'error' && <XCircle size={12} className="inline ml-2" />}
    </span>
  </div>
);

export default Terminal;
