
import React, { useState } from 'react';
import { Upload, FileCode, ArrowRight, Zap, RefreshCw, AlertCircle, FileCheck } from 'lucide-react';
import Terminal from './Terminal.tsx';
import XPBar from './XPBar.tsx';

interface DashboardProps {
  onSuccess: (code: string) => void;
  xp: number;
}

const Dashboard: React.FC<DashboardProps> = ({ onSuccess, xp }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [codeContent, setCodeContent] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setCodeContent(event.target?.result as string);
        setIsFailed(false);
        setIsComplete(false);
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleRunTests = () => {
    if (!codeContent) return;
    setIsRunning(true);
  };

  const handleTestComplete = (passed: boolean) => {
    setIsRunning(false);
    if (passed) {
      setIsComplete(true);
      setIsFailed(false);
    } else {
      setIsFailed(true);
      setIsComplete(false);
    }
  };

  return (
    <div className="flex-1 p-8 space-y-8 overflow-y-auto">
      <header>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Defense Dashboard</h2>
        <p className="text-slate-400">Upload your <code className="text-[#00FFA3]">.py</code> file to start the 42 simple test suite.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {!isRunning && !isComplete && !isFailed ? (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00FFA3] to-slate-900 rounded-xl blur opacity-10 group-hover:opacity-25 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative glass rounded-xl p-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-[#00FFA3] transition-colors h-80">
                <input
                  type="file"
                  accept=".py"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <div className="bg-slate-900 p-4 rounded-full mb-4">
                  <Upload className="text-[#00FFA3]" size={32} />
                </div>
                {file ? (
                  <div className="text-center">
                    <p className="text-[#00FFA3] font-mono mb-2">{file.name}</p>
                    <p className="text-xs text-slate-500">Ready for processing</p>
                    <button 
                      onClick={handleRunTests}
                      className="mt-6 px-6 py-2 bg-[#00FFA3] text-black font-bold rounded-lg hover:bg-white transition-colors flex items-center gap-2"
                    >
                      <Zap size={16} /> Run Evaluation
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-lg font-bold mb-1">Drop your python script here</p>
                    <p className="text-sm text-slate-500">Only .py files are supported for this piscine.</p>
                  </div>
                )}
              </div>
            </div>
          ) : isRunning ? (
            <div className="flex justify-center py-12">
              <Terminal code={codeContent} onComplete={handleTestComplete} />
            </div>
          ) : isFailed ? (
            <div className="glass rounded-xl p-8 border border-red-500/30 bg-red-500/5 flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertCircle className="text-red-500" size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Evaluation Failed</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Your code did not meet the 42 Norm standards. Review the errors in the terminal and try again.
                </p>
              </div>
              <button 
                onClick={() => { setIsFailed(false); setFile(null); }}
                className="px-8 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all flex items-center gap-2"
              >
                <RefreshCw size={18} /> Retry Upload
              </button>
            </div>
          ) : (
            <div className="glass rounded-xl p-8 border border-[#00FFA3]/30 bg-[#00FFA3]/5 flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-[#00FFA3]/20 flex items-center justify-center">
                <FileCheck className="text-[#00FFA3]" size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Tests Passed Successfully!</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Your code complies with the Norm and passed the simple test suite. 
                  You are now eligible for peer defense.
                </p>
              </div>
              <div className="w-full max-w-sm">
                <XPBar current={xp + 120} max={1000} label="New XP Reward: +120" />
              </div>
              <button 
                onClick={() => onSuccess(codeContent)}
                className="px-8 py-3 bg-[#00FFA3] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,255,163,0.5)] transition-all flex items-center gap-2 group"
              >
                Proceed to Defense <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-6 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <FileCode className="text-slate-500" size={20} />
                <h4 className="font-bold">42 Norm Compliance</h4>
              </div>
              <p className="text-sm text-slate-400">Checks for ft_header, forbidden imports, and code structure rules.</p>
            </div>
            <div className="glass p-6 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="text-slate-500" size={20} />
                <h4 className="font-bold">Simple Regression</h4>
              </div>
              <p className="text-sm text-slate-400">Runs your logic against a predefined set of mock test inputs.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-xl border border-slate-800">
            <h4 className="font-bold mb-4 uppercase text-[10px] tracking-widest text-slate-500">Current Task</h4>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[#00FFA3] font-bold">
                00
              </div>
              <div>
                <p className="text-sm font-bold">Exercise 00: Data Toolset</p>
                <p className="text-xs text-slate-500">Python for Data Science</p>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <span className="text-[10px] bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-400 font-bold">PISCINE</span>
              <span className="text-[10px] bg-[#00FFA3]/10 px-2 py-1 rounded border border-[#00FFA3]/20 text-[#00FFA3] font-bold">URGENT</span>
            </div>
          </div>

          <div className="glass p-6 rounded-xl border border-slate-800">
            <h4 className="font-bold mb-4 uppercase text-[10px] tracking-widest text-slate-500">Evaluation History</h4>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#00FFA3]" />
                    <span className="text-xs text-slate-300">Ex0{i - 1} - Final Check</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">100%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
