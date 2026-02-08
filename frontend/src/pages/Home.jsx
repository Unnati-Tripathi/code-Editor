// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import ListCard from '../components/ListCard';
// import GridCard from '../components/GridCard';
// import { api_based_url } from '../helper';
// import { useNavigate } from 'react-router-dom';

// function Home() {
//   const [projectTitle, setProjectTitle] = useState("");
//   const [isGridLayout, setGridLayout] = useState(false);
//   const [isCreateProject, setIsCreateProject] = useState(false);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   const filterData = data ? data.filter(item =>
//     item.title.toLowerCase().includes(searchQuery.toLowerCase())
//   ) : [];

//   const createP = () => {
//     const userId = localStorage.getItem("userId");
//     if (!projectTitle.trim()) return alert("Title is required");
//     if (!userId) return navigate("/login");

//     fetch(api_based_url + "/createProject", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title: projectTitle, userId })
//     })
//     .then(res => res.json())
//     .then(data => {
//       if (data.success) navigate(`/editor/${data.projectId}`);
//       else alert(data.message);
//     });
//   };

//   const getProj = () => {
//     setLoading(true);
//     fetch(api_based_url + "/getProjects", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId: localStorage.getItem("userId") })
//     })
//     .then(res => res.json())
//     .then(data => {
//       if (data.success) setData(data.projects);
//       setLoading(false);
//     });
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   useEffect(() => {
//     if (!localStorage.getItem("isLoggedIn")) navigate("/login");
//     else getProj();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#0b0b0b] text-white">
//       <Navbar />
//       <div className="flex items-center justify-between px-[100px] my-[40px]">
//         <div>
//           <h2 className="text-3xl font-bold">My Projects</h2>
//           <button onClick={handleLogout} className="text-red-500 text-sm underline">Logout</button>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="inputBox !w-[300px] !bg-[#1e1e1e]">
//             <input type="text" placeholder='Search projects...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
//           </div>
//           <button onClick={() => setIsCreateProject(true)} className="btnBlue !rounded-md !px-6">+</button>
//         </div>
//       </div>

//       {loading ? <div className="text-center mt-10">Loading your workspace...</div> : (
//         <div className="cards px-[100px]">
//           {filterData.length > 0 ? (
//             <div className={isGridLayout ? "grid grid-cols-3 gap-6" : "list flex flex-col gap-4"}>
//               {filterData.map((item) => isGridLayout ? <GridCard key={item._id} item={item} /> : <ListCard key={item._id} item={item} />)}
//             </div>
//           ) : <div className="text-gray-500 text-center py-20 border-2 border-dashed border-[#222] rounded-xl">No projects found. Create one!</div>}
//         </div>
//       )}

//       {isCreateProject && (
//         <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
//           <div className="bg-[#141414] w-[400px] p-8 rounded-xl border border-[#333]">
//             <h1 className='text-xl mb-4'>Project Title</h1>
//             <input className="w-full bg-[#202020] p-3 rounded-md mb-6 outline-none border border-[#444] focus:border-[#00AEEF]" autoFocus onChange={(e) => setProjectTitle(e.target.value)} value={projectTitle} type="text" placeholder='e.g. Portfolio Site' />
//             <div className="flex gap-3">
//               <button className="btnBlue flex-1" onClick={createP}>Create</button>
//               <button className="bg-[#333] flex-1 rounded-md" onClick={() => setIsCreateProject(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default Home;

























































// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import ListCard from '../components/ListCard';
// import GridCard from '../components/GridCard';
// import { api_based_url } from '../helper';
// import { useNavigate } from 'react-router-dom';

// function Home() {
//   const [projectTitle, setProjectTitle] = useState("");
//   const [isGridLayout, setGridLayout] = useState(false); // Toggle state
//   const [isCreateProject, setIsCreateProject] = useState(false);
//   const [isLightMode, setIsLightMode] = useState(false); // Mode state
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   const filterData = data ? data.filter(item =>
//     item.title.toLowerCase().includes(searchQuery.toLowerCase())
//   ) : [];

//   const getProj = () => {
//     setLoading(true);
//     fetch(api_based_url + "/getProjects", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId: localStorage.getItem("userId") })
//     })
//     .then(res => res.json())
//     .then(data => {
//       if (data.success) setData(data.projects);
//       setLoading(false);
//     });
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   useEffect(() => {
//     if (!localStorage.getItem("isLoggedIn")) navigate("/login");
//     else getProj();
//   }, []);

//   return (
//     // We wrap everything in a div that applies .lightMode based on state
//     <div className={`Home min-h-screen ${isLightMode ? "lightMode" : "bg-[#0b0b0b] text-white"}`}>
//       <Navbar />
//       <div className="flex items-center justify-between px-[100px] my-[40px]">
//         <div>
//           <h2 className="text-3xl font-bold">My Projects</h2>
//           <div className='flex gap-4 items-center mt-2'>
//             <button onClick={handleLogout} className="text-red-500 text-sm underline">Logout</button>
//             {/* Mode Toggle Button */}
//             <button 
//               onClick={() => setIsLightMode(!isLightMode)} 
//               className="text-sm bg-[#1e1e1e] px-3 py-1 rounded-md border border-[#333] hover:bg-[#252525]"
//             >
//               {isLightMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center gap-4">
//           {/* Grid/List Toggle Icons/Buttons */}
//           <div className='flex bg-[#1e1e1e] rounded-md p-1 border border-[#333]'>
//             <button 
//               onClick={() => setGridLayout(false)} 
//               className={`px-3 py-1 rounded-md ${!isGridLayout ? "bg-[#00AEEF] text-white" : "text-gray-400"}`}
//             >
//               List
//             </button>
//             <button 
//               onClick={() => setGridLayout(true)} 
//               className={`px-3 py-1 rounded-md ${isGridLayout ? "bg-[#00AEEF] text-white" : "text-gray-400"}`}
//             >
//               Grid
//             </button>
//           </div>

//           <div className="inputBox !w-[300px] !bg-[#1e1e1e] border border-[#333]">
//             <input 
//               type="text" 
//               placeholder='Search projects...' 
//               className='placeholder:text-gray-500'
//               value={searchQuery} 
//               onChange={(e) => setSearchQuery(e.target.value)} 
//             />
//           </div>
//           <button onClick={() => setIsCreateProject(true)} className="btnBlue !rounded-md !px-6">+</button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="text-center mt-10">Loading your workspace...</div>
//       ) : (
//         <div className="cards px-[100px] pb-10">
//           {filterData.length > 0 ? (
//             <div className={isGridLayout ? "grid grid-cols-3 gap-6" : "list flex flex-col gap-4"}>
//               {filterData.map((item) => 
//                 isGridLayout ? <GridCard key={item._id} item={item} /> : <ListCard key={item._id} item={item} />
//               )}
//             </div>
//           ) : (
//             <div className="text-gray-500 text-center py-20 border-2 border-dashed border-[#222] rounded-xl">
//               No projects found. Create one!
//             </div>
//           )}
//         </div>
//       )}

//       {/* Create Project Modal remains the same */}
//       {isCreateProject && (
//         <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
//           <div className="bg-[#141414] w-[400px] p-8 rounded-xl border border-[#333]">
//             <h1 className='text-xl mb-4'>Project Title</h1>
//             <input 
//               className="w-full bg-[#202020] p-3 rounded-md mb-6 outline-none border border-[#444] focus:border-[#00AEEF]" 
//               autoFocus 
//               onChange={(e) => setProjectTitle(e.target.value)} 
//               value={projectTitle} 
//               type="text" 
//               placeholder='e.g. Portfolio Site' 
//             />
//             <div className="flex gap-3">
//               <button className="btnBlue flex-1" onClick={() => {
//                 const userId = localStorage.getItem("userId");
//                 if (!projectTitle.trim()) return alert("Title is required");
//                 if (!userId) return navigate("/login");

//                 fetch(api_based_url + "/createProject", {
//                   method: "POST",
//                   headers: { "Content-Type": "application/json" },
//                   body: JSON.stringify({ title: projectTitle, userId })
//                 })
//                 .then(res => res.json())
//                 .then(data => {
//                   if (data.success) navigate(`/editor/${data.projectId}`);
//                   else alert(data.message);
//                 });
//               }}>Create</button>
//               <button className="bg-[#333] flex-1 rounded-md" onClick={() => setIsCreateProject(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default Home;



































































































































// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import ListCard from '../components/ListCard';
// import GridCard from '../components/GridCard';
// import { api_based_url, toggleClass } from '../helper'; // Added toggleClass helper
// import { useNavigate } from 'react-router-dom';

// function Home() {
//   const [projectTitle, setProjectTitle] = useState("");
//   const [isGridLayout, setGridLayout] = useState(true); // Defaulting to true for better UI
//   const [isCreateProject, setIsCreateProject] = useState(false);
//   const [isLightMode, setIsLightMode] = useState(false); // Mode State
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   // Mode toggle function using your helper
//   const toggleTheme = () => {
//     setIsLightMode(!isLightMode);
//     toggleClass("body", "lightMode");
//   };

//   const filterData = data ? data.filter(item =>
//     item.title.toLowerCase().includes(searchQuery.toLowerCase())
//   ) : [];

//   const createP = () => {
//     const userId = localStorage.getItem("userId");
//     if (!projectTitle.trim()) return alert("Title is required");
//     if (!userId) return navigate("/login");

//     fetch(api_based_url + "/createProject", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title: projectTitle, userId })
//     })
//     .then(res => res.json())
//     .then(data => {
//       if (data.success) navigate(`/editor/${data.projectId}`);
//       else alert(data.message);
//     });
//   };

//   const getProj = () => {
//     setLoading(true);
//     fetch(api_based_url + "/getProjects", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId: localStorage.getItem("userId") })
//     })
//     .then(res => res.json())
//     .then(data => {
//       if (data.success) setData(data.projects);
//       setLoading(false);
//     });
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   useEffect(() => {
//     if (!localStorage.getItem("isLoggedIn")) navigate("/login");
//     else getProj();
//   }, []);

//   return (
//     <div className={`min-h-screen ${isLightMode ? 'bg-white text-black' : 'bg-[#0b0b0b] text-white'} transition-all`}>
//       <Navbar />
//       <div className="flex items-center justify-between px-[100px] my-[40px]">
//         <div>
//           <h2 className="text-3xl font-bold">My Projects</h2>
//           <div className='flex gap-4 mt-2'>
//             {/* Improved Logout Button */}
//             <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md text-white text-sm transition-colors">Logout</button>
//             {/* Mode Toggle Button */}
//             <button onClick={toggleTheme} className="bg-gray-700 px-4 py-1 rounded-md text-sm">
//               {isLightMode ? "Dark Mode" : "Light Mode"}
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center gap-4">
//           {/* Layout Toggle Option */}
//           <div className="flex bg-[#1e1e1e] rounded-md p-1 border border-[#333]">
//              <button onClick={() => setGridLayout(false)} className={`px-3 py-1 rounded-md ${!isGridLayout ? 'bg-blue-500 text-white' : 'text-gray-400'}`}>List</button>
//              <button onClick={() => setGridLayout(true)} className={`px-3 py-1 rounded-md ${isGridLayout ? 'bg-blue-500 text-white' : 'text-gray-400'}`}>Grid</button>
//           </div>

//           <div className="inputBox !w-[300px] !mb-0 !bg-[#1e1e1e]">
//             <input type="text" placeholder='Search projects...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
//           </div>
//           <button onClick={() => setIsCreateProject(true)} className="btnBlue !rounded-md !px-6 !ml-0">+</button>
//         </div>
//       </div>

//       {loading ? <div className="text-center mt-10">Loading your workspace...</div> : (
//         <div className="cards px-[100px] pb-10">
//           {filterData.length > 0 ? (
//             <div className={isGridLayout ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "list flex flex-col gap-4"}>
//               {filterData.map((item) => isGridLayout ? <GridCard key={item._id} item={item} /> : <ListCard key={item._id} item={item} />)}
//             </div>
//           ) : <div className="text-gray-500 text-center py-20 border-2 border-dashed border-[#222] rounded-xl">No projects found. Create one!</div>}
//         </div>
//       )}

//       {/* Create Project Modal Logic (unchanged) */}
//       {isCreateProject && (
//         <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
//           <div className="bg-[#141414] w-[400px] p-8 rounded-xl border border-[#333]">
//             <h1 className='text-xl mb-4 text-white'>Project Title</h1>
//             <input className="w-full bg-[#202020] p-3 rounded-md mb-6 outline-none border border-[#444] text-white focus:border-[#00AEEF]" autoFocus onChange={(e) => setProjectTitle(e.target.value)} value={projectTitle} type="text" placeholder='e.g. Portfolio Site' />
//             <div className="flex gap-3">
//               <button className="btnBlue flex-1" onClick={createP}>Create</button>
//               <button className="bg-[#333] flex-1 rounded-md text-white" onClick={() => setIsCreateProject(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default Home;





































































































































































// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import ListCard from '../components/ListCard';
// import GridCard from '../components/GridCard';
// import CreateProjectModal from '../components/CreateProjectModal'; // Extracting modal
// import { useHomeLogic } from '../hooks/useHomeLogic';

// function Home() {
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const {
//     filteredData, loading, isGridLayout, setGridLayout,
//     isLightMode, toggleTheme, searchQuery, setSearchQuery, navigate
//   } = useHomeLogic();

//   return (
//     <div className={`min-h-screen transition-all ${isLightMode ? 'bg-white text-black' : 'bg-[#0b0b0b] text-white'}`}>
//       <Navbar />

//       {/* Header Section */}
//       <div className="flex items-center justify-between px-[100px] my-[40px]">
//         <div>
//           <h2 className="text-3xl font-bold text-inherit">My Projects</h2>
//           <div className='flex gap-4 mt-2'>
//             <button onClick={() => { localStorage.clear(); navigate("/login"); }} className="bg-red-500 px-4 py-1 rounded-md text-white text-sm">Logout</button>
//             =
//           </div>
//         </div>

//         {/* Search and Layout Controls */}
//         <div className="flex items-center gap-4">
//           <div className="flex bg-[#1e1e1e] rounded-md p-1 border border-[#333]">
//              <button onClick={() => setGridLayout(false)} className={`px-3 py-1 rounded-md ${!isGridLayout ? 'bg-blue-500 text-white' : 'text-gray-400'}`}>List</button>
//              <button onClick={() => setGridLayout(true)} className={`px-3 py-1 rounded-md ${isGridLayout ? 'bg-blue-500 text-white' : 'text-gray-400'}`}>Grid</button>
//           </div>
//           <div className="inputBox !w-[300px] !mb-0 !bg-[#1e1e1e]">
//             <input type="text" placeholder='Search projects...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
//           </div>
//           <button onClick={() => setIsCreateModalOpen(true)} className="btnBlue !rounded-md !px-6 !ml-0">+</button>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       {loading ? (
//         <div className="text-center mt-10">Loading your workspace...</div>
//       ) : (
//         <div className="cards px-[100px] pb-10">
//           {filteredData.length > 0 ? (
//             <div className={isGridLayout ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "list flex flex-col gap-4"}>
//               {filteredData.map((item) => isGridLayout ? <GridCard key={item._id} item={item} /> : <ListCard key={item._id} item={item} />)}
//             </div>
//           ) : (
//             <div className="text-gray-500 text-center py-20 border-2 border-dashed border-[#222] rounded-xl">No projects found.</div>
//           )}
//         </div>
//       )}

//       {/* Modular Modal */}
//       <CreateProjectModal 
//         isOpen={isCreateModalOpen} 
//         onClose={() => setIsCreateModalOpen(false)} 
//       />
//     </div>
//   );
// }

// export default Home;
































































































// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import ListCard from '../components/ListCard';
// import GridCard from '../components/GridCard';
// import CreateProjectModal from '../components/CreateProjectModal';
// import { useHomeLogic } from '../hooks/useHomeLogic';

// function Home() {
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

//   const {
//     filteredData,
//     loading,
//     isGridLayout,
//     setGridLayout,
//     isLightMode,
//     toggleTheme,
//     searchQuery,
//     setSearchQuery,
//     navigate,
//     handleCreateProject
//   } = useHomeLogic();

//   return (
//     <div className={`min-h-screen transition-all ${isLightMode ? 'bg-white text-black' : 'bg-[#0b0b0b] text-white'}`}>
//       <Navbar />

//       <div className="flex items-center justify-between px-[100px] my-[40px]">
//         <div>
//           <h2 className="text-3xl font-bold text-inherit">My Projects</h2>
//           <div className='flex gap-4 mt-2'>
//             <button
//               onClick={() => { localStorage.clear(); navigate("/login"); }}
//               className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md text-white text-sm transition-colors"
//             >
//               Logout
//             </button>
//             <button
//               onClick={toggleTheme}
//               className={`px-4 py-1 rounded-md text-sm font-medium transition-all ${isLightMode
//                   ? "bg-gray-800 text-white hover:bg-black"
//                   : "bg-gray-200 text-black hover:bg-white"
//                 }`}
//             >
//               {isLightMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center gap-4">
          
//           <div className={`flex rounded-md p-1 border transition-all ${isLightMode ? "bg-gray-200 border-gray-300" : "bg-[#1e1e1e] border-[#333]"}`}>
//             <button
//               onClick={() => setGridLayout(false)}
//               className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${!isGridLayout ? 'bg-[#00AEEF] text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
//             >
//               List
//             </button>
//             <button
//               onClick={() => setGridLayout(true)}
//               className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${isGridLayout ? 'bg-[#00AEEF] text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
//             >
//               Grid
//             </button>
//           </div>


//           {/* Search Input */}
//           <div className={`inputBox !w-[300px] !mb-0 transition-all ${isLightMode ? "!bg-gray-100 border border-gray-300" : "!bg-[#1e1e1e]"}`}>
//             <input
//               type="text"
//               placeholder='Search projects...'
//               className={`${isLightMode ? "text-black placeholder:text-gray-400" : "text-white"}`}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <button onClick={() => setIsCreateModalOpen(true)} className="btnBlue !rounded-md !px-6 !ml-0">+</button>
//         </div>
//       </div>

//       {/* Projects Display Area */}
//       {loading ? (
//         <div className="text-center mt-10">Loading your workspace...</div>
//       ) : (
//         <div className="cards px-[100px] pb-10">
//           {filteredData.length > 0 ? (
//             <div className={isGridLayout ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "list flex flex-col gap-4"}>
//               {filteredData.map((item) => (
//                 isGridLayout ? <GridCard key={item._id} item={item} /> : <ListCard key={item._id} item={item} />
//               ))}
//             </div>
//           ) : (
//             <div className={`text-center py-20 border-2 border-dashed rounded-xl ${isLightMode ? "text-gray-400 border-gray-300" : "text-gray-500 border-[#222]"}`}>
//               No projects found. Create one!
//             </div>
//           )}
//         </div>
//       )}

//       {/* Modular Modal */}
//       <CreateProjectModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         onCreate={handleCreateProject}
//       />
//     </div>
//   );
// }

// export default Home;























































































import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ListCard from '../components/ListCard';
import GridCard from '../components/GridCard';
import CreateProjectModal from '../components/CreateProjectModal';
import { useHomeLogic } from '../hooks/useHomeLogic';

function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const {
    filteredData, loading, isGridLayout, setGridLayout,
    isLightMode, toggleTheme, searchQuery, setSearchQuery, navigate, handleCreateProject 
  } = useHomeLogic();

  return (
    <div className={`min-h-screen transition-all duration-500 ${isLightMode ? 'bg-gray-50 text-gray-900' : 'bg-[#050505] text-white'}`}>
      <Navbar />
      
      {/* Hero / Welcome Section */}
      <header className=" mx-auto  md:px-[100px] pt-6 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            {/* <h1 className="text-5xl font-black tracking-tight mb-2 italic bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Workspace
            </h1> */}
            <p className={`${isLightMode ? 'text-gray-500' : 'text-gray-400'} text-lg`}>
              Build, test, and deploy your code snippets in the cloud.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* View & Theme Toggles */}
            <div className={`flex p-1 rounded-xl border ${isLightMode ? 'bg-gray-200 border-gray-300' : 'bg-[#111] border-white/5'}`}>
              <button onClick={() => setGridLayout(true)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${isGridLayout ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500'}`}>Grid</button>
              <button onClick={() => setGridLayout(false)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${!isGridLayout ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500'}`}>List</button>
            </div>
            <button onClick={toggleTheme} className={`p-2.5 rounded-xl border transition-all ${isLightMode ? 'bg-white border-gray-300' : 'bg-[#111] border-white/5 hover:bg-white hover:text-black'}`}>
              {isLightMode ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </header>

      {/* Search & Actions Bar */}
      <section className="max-w-8xl mx-auto px-6 md:px-[100px] py-6 flex flex-col md:flex-row gap-4 items-center">
        <div className={`flex-1 relative group w-full`}>
          <input 
            type="text" 
            placeholder='Search your projects...' 
            className={`w-full py-4 pl-12 pr-4 rounded-2xl outline-none border transition-all ${isLightMode ? 'bg-white border-gray-200 focus:border-blue-500' : 'bg-[#0f0f0f] border-white/5 focus:border-blue-500/50'}`}
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 text-xl">🔍</span>
        </div>
        <button onClick={() => setIsCreateModalOpen(true)} className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 transition-all active:scale-95">
          + Create New
        </button>
      </section>

      {/* Main Grid/List Area */}
      <main className=" mx-auto px-6 md:px-[100px] py-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
            {[1,2,3].map(i => <div key={i} className="h-[220px] bg-white/5 rounded-[24px]"></div>)}
          </div>
        ) : (
          <div className={isGridLayout ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center" : "flex flex-col gap-5"}>
            {filteredData.length > 0 ? (
              filteredData.map(item => isGridLayout ? <GridCard key={item._id} item={item} /> : <ListCard key={item._id} item={item} />)
            ) : (
              <div className="col-span-full py-24 text-center border-2 border-dashed border-white/10 rounded-[32px]">
                <p className="text-gray-500 text-xl">Your workspace is empty. Let's build something!</p>
              </div>
            )}
          </div>
        )}
      </main>

      <CreateProjectModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onCreate={handleCreateProject} />
    </div>
  );
}
export default Home;