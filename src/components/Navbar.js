// components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" end className="nav-link">Miss You & Mood</NavLink>
      <NavLink to="/feature2" className="nav-link">Memory Calendar</NavLink>
      <NavLink to="/feature3" className="nav-link">Bucket List</NavLink>
    </nav>
  );
};

export default Navbar;
