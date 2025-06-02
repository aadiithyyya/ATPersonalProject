import React from 'react';
import '../styles/Header.css';
import { FaHeart, FaStar, FaInfinity } from 'react-icons/fa';
import { PiSparkleFill } from 'react-icons/pi';
import { LuFlower2 } from 'react-icons/lu';

function Header() {
  return (
    <header className="header">
      <h1 className="header-title">
        Aadi <FaHeart className="header-icon heart" /> Thara
      </h1>
      <p className="header-subtitle">
        A cute lil jilo app ~ made with <PiSparkleFill className="header-icon sparkle" /> and ❤️
      </p>
      <p className="header-author">
        Built by <a href="https://linkedin.com/in/aadiithyyya" target="_blank" rel="noopener noreferrer">Aadi</a> 
        &nbsp;for his boo 🐰
      </p>
      <div className="header-icons">
        <LuFlower2 />
        <FaStar />
        <FaInfinity />
        <FaHeart />
      </div>
    </header>
  );
}

export default Header;
