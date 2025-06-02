import React from 'react';
import { FaHeart, FaStar, FaInfinity } from 'react-icons/fa';
import { PiSparkleFill } from 'react-icons/pi';
import { LuFlower2 } from 'react-icons/lu';

function Header() {
  return (
    <header className="header">
      <h1 style={{ fontSize: '2.8rem', color: '#a44cd4' }}>
        Aadi <FaHeart style={{ color: '#ff5eaa' }} /> Thara
      </h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#666' }}>
        A cute lil jilo app ~ made with <PiSparkleFill style={{ color: '#ffcce0' }} /> and ❤️
      </p>
      <p style={{ fontSize: '0.95rem', color: '#999' }}>
        Built by <a href="https://linkedin.com/in/aadiithyyya" target="_blank" rel="noopener noreferrer" style={{ color: '#a44cd4', textDecoration: 'none', fontWeight: 'bold' }}>Aadi</a> 
        &nbsp;for his boo 🐰
      </p>
      <div style={{ marginTop: '1rem', fontSize: '1.4rem', color: '#ff85c1' }}>
        <LuFlower2 style={{ margin: '0 6px' }} />
        <FaStar style={{ margin: '0 6px' }} />
        <FaInfinity style={{ margin: '0 6px' }} />
        <FaHeart style={{ margin: '0 6px' }} />
      </div>
    </header>
  );
}

export default Header;
