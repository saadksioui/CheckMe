"use client";
import { Project } from '@/app/types';
import { BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react'

const DashProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [loadingProjects, setLoadingProjects] = useState(true);


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
      };

    return (
        <div className="flex-1 p-8 space-y-8 overflow-y-auto">
            <header>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Projects</h2>
                <p className="text-slate-400">Click on a project to start the correction</p>
            </header>
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
                            <div className="text-xs text-[#00FFA3] font-bold uppercase">Click to Test</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DashProjects