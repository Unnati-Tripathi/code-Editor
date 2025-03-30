// import React from 'react'
import React, { useState } from 'react';
import logo from "../images/logo.png";//name wise import kro  to lgane me easy  hoga..
import sec from "../images/authPageSide.png";
import "../App.css"; 
import { Link } from "react-router-dom"; 
import { api_based_url } from '../helper';
import { useNavigate } from "react-router-dom";

export default function Login() {

   
    const[Email , setEmail] = useState("");
    const[password , setpassword] = useState("");

    const navigate = useNavigate(); //what this do..?
    const [error , setError]=useState("");
    const submitForm = (e) =>{
        e.preventDefault();
        fetch(api_based_url + "/login",{
            mode: "cors",
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: Email,
     
                password:password
            })
        } ).then(res=>res.json()).then(data =>{
            if(data.success ===true){
                localStorage.setItem("token",data.token);
                localStorage.setItem("isLoggedIn" , true);
                localStorage.setItem("userId",data.userId);
                navigate("/");
            }
            else{
                setError(data.message);
            }
        })
    }


  return (
    <div>
        {/* hey */}
        <div className="container  w-screen min-h-screen flex items-center justify-between pl-[100px]">
            <div className="left w-[40%]"> 
                {/* pure div ki  yahi widht rhegi.. ander bs hr baar w-full krte jaana.. change krna ho to yahi se he hoga */}
                <img className="w-[200px]" src={logo} alt="Company Logo"/>
                <form onSubmit={submitForm} className="w-full mt-[70px]" action="" >
                    
                    
                    <div className="inputBox">
                        <input required onChange={(e)=>{setEmail(e.target.value)}} value={Email} type="text" placeholder='Email'/>
                    </div>
                    <div className="inputBox">
                        <input required onChange={(e)=>{setpassword(e.target.value)}} value={password} type="password" placeholder='Password'/>
                    </div>

                    <p> Don't have an accout <Link to="/signUp" className="text-[#00AEEF]">SignUp</Link> </p>
                    <p className="text-red-500 text-[14px] mt-2 ">{error}</p>
                    <button className="btnBlue w-full mt-[20px]">Login</button>

                </form>
            </div>
            <div className="right w-[55%]">
                <img className="h-[100vh] w-[100%] object-cover" src={sec} alt=""/>
            </div>
        </div>    

    </div>
  )
}
