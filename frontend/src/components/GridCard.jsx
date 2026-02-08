// import React , {useState} from 'react'
// import codeimg from "../images/code.png";
// import Delete from "../images/delete.png"; 
// import { useNavigate } from 'react-router-dom';
// import { api_based_url } from '../helper';

// export default function GridCard({item}) {
//   const navigate= useNavigate();
//   // const [isDeleteModel , setIsDeleteMode]=useState(false);

//   const [isDeleteModel , setIsDeleteModel]=useState(false);
//     const deleteProj=(id)=>{
//       fetch(api_based_url + "/deleteProject",{
//         mode:"cors",
//         method: "POST",
//         headers:{
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           progId: id,
//           userId: localStorage.getItem("userId")
//         })
//       } ).then(res=>res.json()).then(data=>{
//         if(data.success){
//           setIsDeleteModel(false);
//           window.location.reload(); // whole page is reloaded
          
//         }
//         else{
//           alert(data.message);
//           setIsDeleteModel(false);
  
//         }
//       })
//     };



//   return (
//     <>
//       <div className=" GridCard bg-[#141414] w-[270px] h-[180px] cursor-pointer hover:bg-[#202020] shadow-lg  ">
//         <div onClick={()=>{navigate(`/editor/${item._id}`)}} >
//           <img className=" w-[90px] m-2  " src={codeimg} alt=""/>
//           <h3 className='text-[20px] m-3 line-clamp-1'>{item.title}</h3> 
//         </div>
//         <div className=" flex items-center justify-between " >
//           <p className="text-[gray] m-3 -mt-1 text-[14px]  ">{new Date(item.date).toDateString()}</p>
//           <img onClick={()=>setIsDeleteModel(true)} className=" w-[30px] mr-4 pb-2" src={Delete} alt=""/>
//         </div>
//       </div>


//       {
//         isDeleteModel ? 
//         <div className="model fixed top-0 left-0  bg-[rgba(0,0,0,0.4)] flex justify-center items-center flex-col w-screen h-screen ">
//           <div className="main-box  w-[30vw] h-[37vh] bg-[#141414] rounded-lg p-[10px] ">
//             <h1 className='text-[18px]'>Confirm deletion: Proceed with deletion? </h1>
//             <div className='flex justify-between mx-2 mt-3 items-center'>
              
//               <button onClick={()=>{deleteProj(item._id)}}  className="delete bg-red-400 rounded-sm w-[12vw] text-center  text-white text-[14px]">Delete</button>
//               <button onClick={()=>setIsDeleteModel(false)} className="cancil onClick={()=>setIsDeleteModel(true)} bg-slate-600 rounded-sm w-[12vw] text-center text-white text-[14px] ">Cancel</button>
//             </div>

//           </div>
//         </div>
//         :
//         ""
//       }
//     </>
//   )
// }








































































// import React, { useState } from 'react';
// import codeimg from "../images/code.png";
// import DeleteImg from "../images/delete.png"; 
// import { useNavigate } from 'react-router-dom';
// import { api_based_url } from '../helper';

// export default function GridCard({ item }) {
//   const navigate = useNavigate();
//   const [isDeleteModel, setIsDeleteModel] = useState(false);

//   const deleteProj = (id) => {
//     fetch(api_based_url + "/deleteProject", {
//       mode: "cors",
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         progId: id,
//         userId: localStorage.getItem("userId")
//       })
//     }).then(res => res.json()).then(data => {
//       if (data.success) {
//         setIsDeleteModel(false);
//         window.location.reload(); 
//       } else {
//         alert(data.message);
//         setIsDeleteModel(false);
//       }
//     });
//   };

//   return (
//     <>
//       {/* Container: Replaced fixed bg with a class that responds to lightMode */}
//       <div className="GridCard group relative p-5 rounded-2xl transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl border border-white/5 hover:border-blue-500/50">
        
//         {/* Clickable Area */}
//         <div onClick={() => navigate(`/editor/${item._id}`)} className="cursor-pointer">
//           <div className='w-full h-32 bg-[#1e1e1e] rounded-xl flex items-center justify-center mb-4 overflow-hidden group-hover:bg-[#252525] transition-colors'>
//              <img className="w-14 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" src={codeimg} alt="project-icon" />
//           </div>
          
//           <h3 className='text-lg font-bold tracking-tight line-clamp-1 mb-1 group-hover:text-blue-400 transition-colors italic'>
//             {item.title}
//           </h3> 
//         </div>
        
//         {/* Bottom Metadata Section */}
//         <div className="flex items-center justify-between mt-3">
//           <div className="flex flex-col">
//             <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Created On</span>
//             <p className="text-gray-400 text-xs">{new Date(item.date).toDateString()}</p>
//           </div>
          
//           <button 
//             onClick={() => setIsDeleteModel(true)} 
//             className="p-2 hover:bg-red-500/10 rounded-lg transition-all border border-transparent hover:border-red-500/20"
//           >
//             <img className="w-5 h-5 opacity-40 hover:opacity-100 transition-opacity" src={DeleteImg} alt="delete" />
//           </button>
//         </div>
//       </div>

//       {/* Re-designed Confirmation Modal */}
//       {isDeleteModel && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[1000] p-4">
//           <div className="main-box w-full max-w-sm bg-[#111] rounded-3xl p-8 border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-200">
//             <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
//               <img className="w-6 h-6" src={DeleteImg} alt="warning" />
//             </div>
//             <h1 className='text-xl font-bold mb-2 text-white'>Delete this project?</h1>
//             <p className='text-gray-400 text-sm mb-8 leading-relaxed'>
//               This will permanently remove <span className="text-white font-semibold">"{item.title}"</span> and all its source code.
//             </p>
//             <div className='flex gap-4'>
//               <button 
//                 onClick={() => deleteProj(item._id)} 
//                 className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl text-white font-bold transition-all active:scale-95"
//               >
//                 Delete
//               </button>
//               <button 
//                 onClick={() => setIsDeleteModel(false)} 
//                 className="flex-1 bg-[#222] hover:bg-[#2a2a2a] py-3 rounded-xl text-white font-bold transition-all"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

































































import React, { useState } from 'react';
import codeimg from "../images/code.png";
import DeleteImg from "../images/delete.png"; 
import { useNavigate } from 'react-router-dom';
import { api_based_url } from '../helper';

export default function GridCard({ item }) {
  const navigate = useNavigate();
  const [isDeleteModel, setIsDeleteModel] = useState(false);

  const deleteProj = (id) => {
    fetch(api_based_url + "/deleteProject", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        progId: id,
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setIsDeleteModel(false);
        window.location.reload(); 
      } else {
        alert(data.message);
        setIsDeleteModel(false);
      }
    });
  };

  return (
    <>
      {/* Increased size to w-[320px] and h-[220px] for a more prominent look */}
      <div className="GridCard group relative p-6 rounded-[24px] transition-all hover:-translate-y-2 shadow-lg hover:shadow-2xl border border-white/5 hover:border-blue-500/50 w-[320px] h-[260px] flex flex-col justify-between">
        
        <div onClick={() => navigate(`/editor/${item._id}`)} className="cursor-pointer">
          {/* Larger Icon Container */}
          <div className='w-full h-24 bg-[#1e1e1e] rounded-[18px] flex items-center justify-center mb-5 overflow-hidden group-hover:bg-[#252525] transition-colors'>
             <img className="w-16 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" src={codeimg} alt="project-icon" />
          </div>
          
          {/* Larger Title */}
          <h3 className='text-[22px] font-extrabold tracking-tight line-clamp-1 mb-1 group-hover:text-blue-400 transition-colors'>
            {item.title}
          </h3> 
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Last Modified</span>
            <p className="text-gray-400 text-sm font-medium">{new Date(item.date).toDateString()}</p>
          </div>
          
          {/* Larger Delete Button */}
          <button 
            onClick={() => setIsDeleteModel(true)} 
            className="p-2.5 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20 shadow-sm"
          >
            <img className="w-6 h-6 opacity-50 hover:opacity-100 transition-opacity" src={DeleteImg} alt="delete" />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModel && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-[1000] p-6">
          <div className="main-box w-full max-w-md bg-[#111] rounded-[32px] p-10 border border-white/10 shadow-2xl scale-in-center">
            <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6">
              <img className="w-7 h-7" src={DeleteImg} alt="warning" />
            </div>
            <h1 className='text-2xl font-black mb-3 text-white'>Delete Project?</h1>
            <p className='text-gray-400 text-base mb-10 leading-relaxed'>
              You are about to permanently delete <span className="text-white font-bold underline decoration-red-500/50">"{item.title}"</span>. This action is irreversible.
            </p>
            <div className='flex gap-5'>
              <button 
                onClick={() => deleteProj(item._id)} 
                className="flex-1 bg-red-500 hover:bg-red-600 py-4 rounded-2xl text-white font-black text-lg transition-all active:scale-95 shadow-lg shadow-red-500/20"
              >
                Delete
              </button>
              <button 
                onClick={() => setIsDeleteModel(false)} 
                className="flex-1 bg-[#222] hover:bg-[#2a2a2a] py-4 rounded-2xl text-white font-black text-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}