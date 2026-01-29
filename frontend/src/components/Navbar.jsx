import React from 'react';
import logo from "../images/logo.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-[100px] h-[80px] bg-[#141414] border-b border-[#222]">
      <Link to="/"><img src={logo} className="w-[150px]" alt="Logo" /></Link>
      <div className="flex items-center gap-8 text-gray-400">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <Link to="/about" className="hover:text-white transition-colors">About</Link>
        <div className="w-10 h-10 rounded-full bg-[#00AEEF] flex items-center justify-center text-white font-bold">
          {localStorage.getItem("userId")?.substring(0, 1).toUpperCase() || "U"}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
