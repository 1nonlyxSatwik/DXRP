import React, { useEffect, useRef, useState } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import { currency } from '../../config';

const Item = (props) => {
  const [imgError, setImgError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const currentCard = cardRef.current;

    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef} 
      className={`product-card ${isVisible ? 'visible' : ''}`}
    >
      <Link to={`/product/${props.slug}`} className="card-image-link" onClick={() => window.scrollTo(0, 0)}>
        <div className="image-container">
          {props.image && !imgError ? (
            <>
              <img
                src={props.image}
                alt={props.name}
                className="img-primary"
                onError={() => setImgError(true)}
              />
              {props.imageHover && (
                <img
                  src={props.imageHover}
                  alt={props.name}
                  className="img-hover"
                />
              )}
            </>
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#111111' }} />
          )}
        </div>
      </Link>
      <div className="card-info">
        <div className="card-header">
          <p className="product-name">{props.name}</p>
          <div className="product-price">{currency}{props.price}</div>
        </div>
        <p className="product-category">fits</p>
      </div>
    </div>
  );
};

export default Item;
