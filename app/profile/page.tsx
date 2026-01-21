"use client";

import React from 'react';
import Profile from '../components/Profile';

const ProfilePage: React.FC = () => {
  const userProfile = {
    login: "ft_student",
    level: 4.42,
    correction_points: 8,
    coalition: "HIVE",
    campus: "Paris",
    image_url: "https://picsum.photos/seed/42/200/200"
  };

  const stats = {
    level: 4.42,
    xp: 420,
    maxXp: 1000,
    rigor: 85,
    pythonic: 78,
    architecture: 92,
    algorithm: 88
  };

  return <Profile stats={stats} userProfile={userProfile} />;
};

export default ProfilePage;