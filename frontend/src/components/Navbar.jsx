import React, { useEffect, useState } from "react"; 

import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import Avatar from 'react-avatar';
import { MdOutlineLightMode } from "react-icons/md";
import { MdGridView } from "react-icons/md";
import { api_based_url, toggleClass } from '../helper';
export default function () {


  const[data , setData]=useState(null);
  const[erroe , setError]=useState("");


  useEffect(()=>{
    fetch(api_based_url+"/getUserDetails",{
      mode:"cors",
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res=>res.json()).then(data=>{
      if(data.success){
        setData(data.user);
      }
      else{
        setError(data.message);
      }
    })
  },[])

  const[light , setlight]=useState(true);

 const changeTheme=()=>{
    if(light){
      document.body.classList.add("lightMode");
      setlight(false);
    }
    else{
      document.body.classList.remove("lightMode");
      setlight(true);
    }
  }

  return (
    <>
        <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
          <div className="logo">
            <img className="w-[150px] cursor-pointer" src={logo} alt=""/>
          </div>
          <div className="links flex items-center gap-2">
            <Link>Home</Link>
            <Link>About</Link>
            <Link>Contact</Link>
            <Link>Services</Link>
            <Avatar onClick={()=>{toggleClass(".dropDownNavbar" , "hidden" )}} color="#00AEEF" name={data ? data.name : ""} size="40" round="50%" className=" Adv cursor-pointer ml-2" />
          </div>

          <div className="  dropDownNavbar hidden absolute right-[60px] top-[80px] shadow-lg rounded-lg shadow-black/50 bg-[#1A1919] w-[150px] h-[130px] ">
          <div className="py-[10px] border-b-[1px] border-b-[#fff] ">
            <h3 className="text-[17px]" style={{lineHeight:1}} >{data ? data.name : ""} </h3>
          </div>
            <i className='navbar flex items-center gap-2 mt-3 mb-2 cursor-pointer ' onClick={changeTheme} style={{fontStyle:'normal'}}><MdOutlineLightMode className='text-[20px]' /> Light Mode</i>
            <i className='flex items-center gap-2 mt-3 mb-2 cursor-pointer ' style={{fontStyle:'normal'}}><MdGridView  className='text-[20px]' /> Grid Layout</i>
          </div>
        </div>
    </>
  )
}
