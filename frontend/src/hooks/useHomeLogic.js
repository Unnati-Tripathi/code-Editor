import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { toggleClass } from '../helper';

export const useHomeLogic = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGridLayout, setGridLayout] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    toggleClass("body", "lightMode");
  };

  const loadProjects = async () => {
  setLoading(true);
  try {
    const result = await projectService.fetchProjects();
    // Verify success and that data.projects exists
    if (result.success) {
      setData(result.projects); 
    }
  } catch (error) {
    console.error("Fetch failed:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) navigate("/login");
    else loadProjects();
  }, []);

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
const handleCreateProject = async (title) => {
  if (!title.trim()) return alert("Title is required");
  
  const result = await projectService.createProject(title);
  if (result.success) {
    // Option A: Navigate to the new editor
    navigate(`/editor/${result.projectId}`);
    // Option B: If you want to stay on home, re-fetch data
    // loadProjects(); 
  } else {
    alert(result.message);
  }
};

// Add handleCreateProject to the return object
return {
  filteredData, loading, isGridLayout, setGridLayout,
  isLightMode, toggleTheme, searchQuery, setSearchQuery, 
  navigate, handleCreateProject // ✅ Added this
};
  
};