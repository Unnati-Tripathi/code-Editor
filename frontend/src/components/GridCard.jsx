import React , {useState} from 'react'
import codeimg from "../images/code.png";
import Delete from "../images/delete.png"; 
import { useNavigate } from 'react-router-dom';
import { api_based_url } from '../helper';

export default function GridCard({item}) {
  const navigate= useNavigate();
  // const [isDeleteModel , setIsDeleteMode]=useState(false);

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
    <>
      <div className=" GridCard bg-[#141414] w-[270px] h-[180px] cursor-pointer hover:bg-[#202020] shadow-lg  ">
        <div onClick={()=>{navigate(`/editor/${item._id}`)}} >
          <img className=" w-[90px] m-2  " src={codeimg} alt=""/>
          <h3 className='text-[20px] m-3 line-clamp-1'>{item.title}</h3> 
        </div>
        <div className=" flex items-center justify-between " >
          <p className="text-[gray] m-3 -mt-1 text-[14px]  ">{new Date(item.date).toDateString()}</p>
          <img onClick={()=>setIsDeleteModel(true)} className=" w-[30px] mr-4 pb-2" src={Delete} alt=""/>
        </div>
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
    </>
  )
}
