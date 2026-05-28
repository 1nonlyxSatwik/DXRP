import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

const PageTransition = () => {
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(false);
  const [stage, setStage] = useState('idle'); // 'idle', 'in', 'out'

  useEffect(() => {
    if (stage === 'idle') {
      // Start the transition in
      setTransitioning(true);
      setStage('in');
      
      // After slide in completes (500ms), start slide out
      setTimeout(() => {
        setStage('out');
        
        // After slide out completes (500ms), idle again
        setTimeout(() => {
          setStage('idle');
          setTransitioning(false);
        }, 500);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (!transitioning) return null;

  return (
    <div className={`page-transition-panel ${stage}`} />
  );
};

export default PageTransition;
