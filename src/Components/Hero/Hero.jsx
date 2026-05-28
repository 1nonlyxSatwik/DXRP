import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Cap at 50vh for the effect
      const maxScroll = windowHeight * 0.5;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Map progress (0 to 1) to transform values
  // scale(1) -> scale(0.85)
  const scale = 1 - (0.15 * scrollProgress);
  // opacity(1) -> opacity(0)
  const opacity = 1 - scrollProgress;

  return (
    <section className="hero-section">
      <div className="hero-wordmark-container">
        <h1 
          className="hero-wordmark"
          style={{ 
            transform: `scale(${scale})`,
            opacity: opacity
          }}
        >
          DXRP
        </h1>
      </div>
      
      <div className="hero-vertical-line"></div>
      
      <div className="hero-label left">DISRUPT. REDEFINE. PROGRESS.</div>
      <div className="hero-label right">SS26 COLLECTION</div>
    </section>
  );
};

export default Hero;
