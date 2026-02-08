// import React from 'react';
// import logo from "../images/logo.png";
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <div className="flex items-center justify-between px-[100px] h-[80px] bg-[#141414] border-b border-[#222]">
//       <Link to="/"><img src={logo} className="w-[150px]" alt="Logo" /></Link>
//       <div className="flex items-center gap-8 text-gray-400">
//         <Link to="/" className="hover:text-white transition-colors">Home</Link>
//         <Link to="/about" className="hover:text-white transition-colors">About</Link>
//         <div className="w-10 h-10 rounded-full bg-[#00AEEF] flex items-center justify-center text-white font-bold">
//           {localStorage.getItem("userId")?.substring(0, 1).toUpperCase() || "U"}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


























































import React from 'react';
import logo from "../images/logo.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Extract initial from storage for the profile icon
  const userInitial = localStorage.getItem("userName")?.substring(0, 1).toUpperCase() || 
                      localStorage.getItem("userId")?.substring(0, 1).toUpperCase() || "U";

  return (
    /* Increased height to h-[100px] and added backdrop-blur for a premium look */
    <div className="navbar sticky top-0 z-[1000] flex items-center justify-between px-[100px] h-[100px] bg-[#0b0b0b]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      
      {/* Brand Logo - Increased size for visibility */}
      <Link to="/" className="hover:scale-105 transition-transform duration-300">
        <img src={logo} className="w-[180px] object-contain" alt="Logo" />
      </Link>

      <div className="flex items-center gap-12">
        {/* Navigation Links with larger text and spacing */}
        <div className="flex items-center gap-10 text-[16px] font-semibold tracking-wide uppercase">
          <Link to="/" className="text-gray-400 hover:text-[#00AEEF] transition-all relative group py-2">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#00AEEF] rounded-full transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/about" className="text-gray-400 hover:text-[#00AEEF] transition-all relative group py-2">
            About
            <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#00AEEF] rounded-full transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Enhanced User Profile Section */}
        <div className="flex items-center gap-5 pl-8 border-l-2 border-white/10">
          <div className="flex flex-col items-end">
             <span className="text-[11px] text-[#00AEEF] uppercase font-black tracking-widest leading-none mb-1">Developer</span>
             <span className="text-sm font-bold text-gray-400 uppercase tracking-tighter">Pro Account</span>
          </div>
          
          {/* Larger Profile Squircle with Glow */}
          <div className="w-14 h-14 rounded-[20px] bg-gradient-to-tr from-[#00AEEF] via-[#0091c7] to-[#005f82] flex items-center justify-center text-white font-black text-2xl shadow-[0_0_20px_rgba(0,174,239,0.3)] cursor-pointer hover:scale-110 hover:-rotate-3 transition-all duration-300 border-2 border-white/10">
            {userInitial}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;