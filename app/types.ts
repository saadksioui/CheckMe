
export enum AppView {
  DASHBOARD = 'dashboard',
  DEFENSE = 'defense',
  LEADERBOARD = 'leaderboard',
  PROFILE = 'profile',
}

export interface ChatMessage {
  role: 'ai' | 'user';
  content: string;
}

export interface UserStats {
  level: number;
  xp: number;
  maxXp: number;
  rigor: number;
  pythonic: number;
  architecture: number;
  algorithm: number;
}

export interface TerminalLog {
  text: string;
  status: 'info' | 'success' | 'error';
}

export interface Project {
  _id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: number;
  testSuiteCode: string;
  questions: Array<{
    q: string;
    answers: string[];
  }>;
}
