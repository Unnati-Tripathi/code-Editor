import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ListCard from '../components/ListCard';
import GridCard from '../components/GridCard';
import { api_based_url } from '../helper';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [projectTitle, setProjectTitle] = useState("");
  const [isGridLayout, setGridLayout] = useState(false);
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filterData = data ? data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const createP = () => {
    const userId = localStorage.getItem("userId");
    if (!projectTitle.trim()) return alert("Title is required");
    if (!userId) return navigate("/login");

    fetch(api_based_url + "/createProject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: projectTitle, userId })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) navigate(`/editor/${data.projectId}`);
      else alert(data.message);
    });
  };

  const getProj = () => {
    setLoading(true);
    fetch(api_based_url + "/getProjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: localStorage.getItem("userId") })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) setData(data.projects);
      setLoading(false);
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) navigate("/login");
    else getProj();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <Navbar />
      <div className="flex items-center justify-between px-[100px] my-[40px]">
        <div>
          <h2 className="text-3xl font-bold">My Projects</h2>
          <button onClick={handleLogout} className="text-red-500 text-sm underline">Logout</button>
        </div>
        <div className="flex items-center gap-4">
          <div className="inputBox !w-[300px] !bg-[#1e1e1e]">
            <input type="text" placeholder='Search projects...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <button onClick={() => setIsCreateProject(true)} className="btnBlue !rounded-md !px-6">+</button>
        </div>
      </div>

      {loading ? <div className="text-center mt-10">Loading your workspace...</div> : (
        <div className="cards px-[100px]">
          {filterData.length > 0 ? (
            <div className={isGridLayout ? "grid grid-cols-3 gap-6" : "list flex flex-col gap-4"}>
              {filterData.map((item) => isGridLayout ? <GridCard key={item._id} item={item} /> : <ListCard key={item._id} item={item} />)}
            </div>
          ) : <div className="text-gray-500 text-center py-20 border-2 border-dashed border-[#222] rounded-xl">No projects found. Create one!</div>}
        </div>
      )}

      {isCreateProject && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-[#141414] w-[400px] p-8 rounded-xl border border-[#333]">
            <h1 className='text-xl mb-4'>Project Title</h1>
            <input className="w-full bg-[#202020] p-3 rounded-md mb-6 outline-none border border-[#444] focus:border-[#00AEEF]" autoFocus onChange={(e) => setProjectTitle(e.target.value)} value={projectTitle} type="text" placeholder='e.g. Portfolio Site' />
            <div className="flex gap-3">
              <button className="btnBlue flex-1" onClick={createP}>Create</button>
              <button className="bg-[#333] flex-1 rounded-md" onClick={() => setIsCreateProject(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Home;
