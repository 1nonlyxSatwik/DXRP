import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  const totalItems = getTotalCartItems();
  const [animateCart, setAnimateCart] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 200);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-left">
        <Link to='/' style={{ textDecoration: 'none' }} className="nav-logo">
          DXRP
        </Link>
      </div>

      <div className="nav-right">
        <Link to='/' className="nav-link">Drop</Link>
        <Link to='/bag' className={`nav-link nav-cart-btn ${animateCart ? 'pulse' : ''}`}>
          bag (<span className={animateCart ? 'animating-number' : ''}>{totalItems}</span>)
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
