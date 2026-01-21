"use client";

import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';

const DashboardPage: React.FC = () => {
  const [xp, setXp] = useState(420);

  const handleUploadSuccess = (code: string) => {
    setXp(prev => prev + 120);
    // Navigate to defense with code
    window.location.href = `/defense?code=${encodeURIComponent(code)}`;
  };

  return <Dashboard onSuccess={handleUploadSuccess} xp={xp} />;
};

export default DashboardPage;