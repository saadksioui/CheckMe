"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Code, MessageSquare, Shield, AlertTriangle, User, Hexagon, ArrowLeft, BookOpen } from 'lucide-react';
import { ChatMessage, Project } from '../types';

interface DefenseProps {
  code: string;
}

const Defense: React.FC<DefenseProps> = ({ code }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setMessages([]); // Reset messages for new project
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setMessages([]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const messageToSend = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/defense/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSend, projectId: selectedProject?._id || '507f1f77bcf86cd799439011' }), // Use selected project ID
      });

      if (!response.ok) {
        throw new Error('Failed to get response from API');
      }

      const data = await response.json();
      const aiMessage: ChatMessage = { role: 'ai', content: data.reply };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = { role: 'ai', content: 'Sorry, there was an error processing your message. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingProjects) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-[#00FFA3]">Loading projects...</div>
      </div>
    );
  }

  if (!selectedProject) {
    return (
      <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-8 text-white">Defense Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => handleProjectSelect(project)}
                className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-[#00FFA3] transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#00FFA3]/10 border border-[#00FFA3]/20 flex items-center justify-center group-hover:bg-[#00FFA3]/20 transition-colors">
                    <BookOpen className="text-[#00FFA3]" size={24} />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500 font-bold">DIFFICULTY</div>
                    <div className="text-sm text-[#00FFA3] font-bold">{project.difficulty}/10</div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-3">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">{project.slug}</span>
                  <div className="text-xs text-[#00FFA3] font-bold uppercase">Click to Defend</div>
                </div>
              </div>
            ))}
          </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="w-1/2 border-r border-slate-800 flex flex-col">
        <div className="p-4 bg-slate-900 flex items-center gap-2 border-b border-slate-800">
          <button
            onClick={handleBackToProjects}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ArrowLeft size={16} className="text-slate-400" />
          </button>
          <Code size={16} className="text-[#00FFA3]" />
          <span className="text-xs font-mono text-slate-400">{selectedProject.slug}.py</span>
          <div className="ml-auto flex gap-2">
            <span className="text-[10px] text-slate-500 px-2 py-0.5 border border-slate-700 rounded">UTF-8</span>
            <span className="text-[10px] text-slate-500 px-2 py-0.5 border border-slate-700 rounded">PYTHON 3.10</span>
          </div>
        </div>
        <div className="flex-1 bg-black p-6 overflow-y-auto font-mono text-sm leading-relaxed text-slate-300 relative scanline">
          <pre>
            {code || "# No code uploaded yet. Please go to Dashboard."}
          </pre>
        </div>
      </div>

      {/* Chat UI (Right) */}
      <div className="w-1/2 flex flex-col bg-slate-950">
        <div className="p-4 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Shield className="text-[#00FFA3]" size={20} />
            </div>
            <div>
              <p className="text-sm font-bold">{selectedProject.title} - AI Peer Reviewer</p>
              <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold">Rank: Evaluator</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-[10px] text-slate-500 font-bold">RIGOR</p>
              <p className="text-xs text-[#00FFA3] font-bold">9.5</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-slate-500 font-bold">MOOD</p>
              <p className="text-xs text-red-500 font-bold">STRICT</p>
            </div>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex-1 p-6 space-y-6 overflow-y-auto"
        >
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
              <MessageSquare size={48} className="text-slate-600" />
              <p className="text-sm max-w-xs">The Peer Reviewer is waiting for your explanation. Start by explaining your implementation logic.</p>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                  msg.role === 'ai' ? 'bg-[#00FFA3]/20 border border-[#00FFA3]/30' : 'bg-slate-800 border border-slate-700'
                }`}>
                  {msg.role === 'ai' ? <Hexagon size={14} className="text-[#00FFA3]" /> : <User size={14} className="text-slate-300" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'ai' 
                    ? 'bg-slate-900 border-l-4 border-[#00FFA3] text-slate-200' 
                    : 'bg-[#00FFA3] text-black font-medium'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-900 p-4 rounded-2xl flex gap-2 items-center">
                <div className="w-1.5 h-1.5 bg-[#00FFA3] rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-[#00FFA3] rounded-full animate-bounce [animation-delay:-.15s]" />
                <div className="w-1.5 h-1.5 bg-[#00FFA3] rounded-full animate-bounce [animation-delay:-.3s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Defend your code..."
              className="w-full bg-black border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FFA3] pr-12 transition-all"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#00FFA3] text-black rounded-lg hover:scale-105 transition-transform"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500 font-bold">
            <AlertTriangle size={10} />
            <span>CAUTION: Evaluator can fail you for lack of clarity.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Defense;
