import React, { useEffect, useRef, useState } from 'react';
import './Cursor.css';

const Cursor = () => {
  const cursorRef = useRef(null);
  const positionRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      
      // Check if hovering over clickable element
      const target = e.target;
      const isClickable = target.closest('a, button, [role="button"]');
      setIsHovering(!!isClickable);
    };

    const render = () => {
      // Lerp
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.15;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove);
    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
    />
  );
};

export default Cursor;
