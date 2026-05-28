import React, { useEffect, useState } from 'react';
import './Preloader.css';
import { PRODUCTS } from '../../constants/products';

const Preloader = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    sessionStorage.removeItem('preloaderShown');
    
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setCounter(count);
      if (count >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setSlideOut(true);
          setTimeout(() => {
            onComplete();
            sessionStorage.setItem('preloaderShown', 'true');
          }, 800);
        }, 300);
      }
    }, 20);

    const imageInterval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 150);

    return () => {
      clearInterval(interval);
      clearInterval(imageInterval);
    };
  }, [onComplete]);

  return (
    <div className={`preloader ${slideOut ? 'slide-out' : ''}`}>
      <div className="preloader-bg-images">
        {PRODUCTS.map((product, idx) => (
          <img
            key={product.id}
            src={product.image}
            alt=""
            className={`preloader-img ${idx === imageIndex ? 'active' : ''}`}
          />
        ))}
      </div>
      <div className="preloader-content">
        <div className="preloader-logo">DXRP</div>
        <div className="preloader-counter">
          {counter.toString().padStart(3, '0')}
        </div>
      </div>
    </div>
  );
};

export default Preloader;
