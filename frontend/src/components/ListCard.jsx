import React , {useState} from 'react';
import img from "../images/code.png";
import Delete from "../images/delete.png"; 
import { api_based_url } from '../helper';
import { useNavigate } from 'react-router-dom';

export default function ListCard({item}) {

  const navigate= useNavigate();
  const [isDeleteModel , setIsDeleteModel]=useState(false);
  const deleteProj=(id)=>{
    fetch(api_based_url + "/deleteProject",{
      mode:"cors",
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        progId: id,
        userId: localStorage.getItem("userId")
      })
    } ).then(res=>res.json()).then(data=>{
      if(data.success){
        setIsDeleteModel(false);
        window.location.reload(); // whole page is reloaded
        
      }
      else{
        alert(data.message);
        setIsDeleteModel(false);

      }
    })
  };
  return (
    <div>
      <div className="listCard mb-2 flex items-center justify-between w-[full] p-[10px] bg-[#141414] rounded-lg cursor-pointer hover:bg-[#202020] ">
        <div onClick={()=>{navigate(`/editor/${item._id}`)}} className="flex items-center gap-2">
          <img className="w-[80px]" src={img} alt=""/>
          <div >
            <h3 className='text-[20px] '>{item.title}</h3> 
            <p className="text-[gray] -mt-1 text-[14px]  ">Created on {new Date(item.date).toDateString()}</p> 
            {/* itna extra likha h taki readable date likh kr aa paye.. */}
          </div>
        </div>
        <img onClick={()=>setIsDeleteModel(true)} className=" h-[30px] w-[30px] mr-4" src={Delete} alt=""/>

        
      </div>


      

      {
        isDeleteModel ? 
        <div className="model fixed top-0 left-0  bg-[rgba(0,0,0,0.4)] flex justify-center items-center flex-col w-screen h-screen ">
          <div className="main-box  w-[30vw] h-[37vh] bg-[#141414] rounded-lg p-[10px] ">
            <h1 className='text-[18px]'>Confirm deletion: Proceed with deletion? </h1>
            <div className='flex justify-between mx-2 mt-3 items-center'>
              
              <button onClick={()=>{deleteProj(item._id)}}  className="delete bg-red-400 rounded-sm w-[12vw] text-center  text-white text-[14px]">Delete</button>
              <button onClick={()=>setIsDeleteModel(false)} className="cancil onClick={()=>setIsDeleteModel(true)} bg-slate-600 rounded-sm w-[12vw] text-center text-white text-[14px] ">Cancel</button>
            </div>

          </div>
        </div>
        :
        ""
      }

    </div>
  )
}
