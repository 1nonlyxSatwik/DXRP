import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-top">
        <div className="footer-mantra">
          <p>no restocks. no apologies.</p>
          <p>Made to be worn. Or judged. Or both.</p>
        </div>
      </div>
      
      <div className="footer-middle">
        <div className="footer-year">©2026</div>
        
        <div className="footer-links-container">
          <div className="footer-column">
            <Link to="#">Privacy Policy</Link>
          </div>
          
          <div className="footer-column">
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">Dribbble</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter (X)</a>
          </div>
          
          <div className="footer-column">
            <Link to="#">Work</Link>
            <Link to="#">Services</Link>
            <Link to="#">About</Link>
            <Link to="#">Careers</Link>
            <Link to="#">Let's talk</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
