"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Defense from '../components/Defense';

const DefenseContent: React.FC = () => {
  const searchParams = useSearchParams();
  const [code, setCode] = useState('');

  useEffect(() => {
    const codeParam = searchParams.get('code');
    if (codeParam) {
      setCode(decodeURIComponent(codeParam));
    }
  }, [searchParams]);

  return <Defense code={code} />;
};

const DefensePage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DefenseContent />
    </Suspense>
  );
};

export default DefensePage;