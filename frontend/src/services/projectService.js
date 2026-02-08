import { api_based_url } from '../helper';

export const projectService = {
  fetchProjects: async () => {
    // We must ensure localStorage is accessed here or passed in
    const userId = localStorage.getItem("userId"); 
    
    const res = await fetch(`${api_based_url}/getProjects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }) // Sending the ID is critical
    });
    return await res.json();
  },

  createProject: async (title) => {
    const userId = localStorage.getItem("userId");
    const res = await fetch(`${api_based_url}/createProject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        title: title, 
        userId: userId 
      })
    });
    return await res.json();
  }

};

