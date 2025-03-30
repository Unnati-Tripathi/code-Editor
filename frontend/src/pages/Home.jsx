import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

import ListCard from '../components/ListCard';
import GridCard from '../components/GridCard';
import { api_based_url } from '../helper';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [projectTitle , setProjectTitle]=useState("");
  const [isGridLayout , setGridLayout]= useState(true);
  const [isCreateProject , setIsCreateProject] =useState(false);
  const navigate= useNavigate();

  const [data,setData]=useState(null);//ye getProje ke liye h
  const [error , setError]=useState("");

  const createP = (e) =>{
    if(projectTitle===""){
      alert("Please enter project title")
    }
    else{
      fetch(api_based_url + "/createProject",{
        mode: "cors",
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          title: projectTitle,
          userId: localStorage.getItem("userId")
        })

      }).then (res => res.json()).then(data =>{
        if(data.success ){
          setIsCreateProject(false)
          setProjectTitle("");
          alert("project Created Successfully..!")
          setTimeout(()=>{
            navigate(`/editor/${data.projectId}`);
          },200);
        }
        else{
          alert("Something went Wrong!")
        }
      })
    }
  };

  const getProj =()=>{
    fetch(api_based_url +"/getProjects",{
      mode:"cors",
      method: "POST", //ye get request honi chaiye.. 
      headers: {
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res=>res.json()).then(data=>{
      if(data.success){
        setData(data.projects); // q ki yaha pr data for loop ke i ki tarah kaam kr raha h..
      }
      else{
        setError(data.message);
      }
    })
  };

  useEffect(()=>{
    getProj();
  },[]);

  return (
    <div>
      {/* koi bhi page call krne ka tareeks last me <name /> */}
      <Navbar/>
      <div className=" home flex items-center  justify-between px-[100px] my-[40px] " >
        <h2 className="text-2xl">Hi, Unnati</h2>
        <div className="flex items-center justify-center">
          <div className="inputBox w-[200px]">
            <input type="text" placeholder='Search Here..'/>
            <button onClick={()=>setIsCreateProject(true)} className="btnBlue rounded-sm  !px-[14px] h-full  " >+</button>
          </div>
        </div>
      </div>

      <div className="cards">
        {
          isGridLayout ?
          <div className="grid px-[100px]">
            {
              data? data.map((item,index)=>{
                return <GridCard key={index} item={item}/>
              }): ""
            }
            {/* <GridCard/>
            <GridCard/>
            <GridCard/>
            <GridCard/> */}
          </div>:

          <div className="list px-[100px]">
            {
              data? data.map((item,index)=>{
                return <ListCard key={index} item={item}/>
              }): ""
            }
            {/* <ListCard/>
            <ListCard/>
            <ListCard/>
            <ListCard/> */}
          </div> 
        }
      </div>
    

      {
        (isCreateProject)?
         <div className="createModelCon flex fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)] w-screen h-screen justify-center items-center">
          <div className="createModel m-2 w-[40vw] h-[60vh] bg-[#141414] rounded-lg p-[20px]  shadow-lg shadow-black/50">
            <h1 className='text-2xl'>Create New Project</h1>
            <div className="inputBox mt-3 !bg-[#202020] ">
              <input required onChange={(e)=>{setProjectTitle(e.target.value)}} valse={projectTitle} type="text" placeholder='Enter project title here...' />
            </div>
            
            <div className="options flex justify-between gap-2 ">
              <button  className="btn text-center text-[15px] w-[18vw] h-[13vh] text-white bg-[#00AEEF] rounded-lg " onClick={createP}> Create</button>
              <button  className="btn text-center text-[15px] w-[18vw] text-white bg-slate-600 rounded-lg " onClick={()=>setIsCreateProject(false)}> Cancil</button>


            </div>

          </div>
        </div>:
        ""
      }
      
    </div>
  )
}

export default Home
