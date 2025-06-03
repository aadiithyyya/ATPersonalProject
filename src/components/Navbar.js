import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { FaHeart, FaCalendarAlt, FaMapMarkedAlt, FaCommentDots } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" end className="nav-link">
        <FaHeart className="nav-icon" /> Miss You
      </NavLink>
      <NavLink to="/feature2" className="nav-link">
        <FaCalendarAlt className="nav-icon" /> Timeline
      </NavLink>
      <NavLink to="/feature3" className="nav-link">
        <FaMapMarkedAlt className="nav-icon" /> Bucket Lists
      </NavLink>
      <NavLink to="/feature4" className="nav-link">
        <FaCommentDots className="nav-icon" /> YapZone
      </NavLink>
      <NavLink to="/polls" className="nav-link">
        <FaCommentDots className="nav-icon" /> What to Do?
      </NavLink>
    </nav>
  );
};

export default Navbar;
