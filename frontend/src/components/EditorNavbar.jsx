import React from 'react';

import logo from "../images/logo.png";
import { FaArrowCircleDown } from "react-icons/fa";
import "../App.css";

export default function EditorNavbar() {
  return (
    <div className="EditorNavbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
          <div className="logo">
            <img className="w-[150px] cursor-pointer" src={logo} alt=""/>
          </div>
          <p>File <span className="">My first project</span></p>
          <i className="p-[5px] btn bg-black rounded-[5px] cursor-pointer text-[20px] "><FaArrowCircleDown /></i>
          

        
        </div>
  )
}
