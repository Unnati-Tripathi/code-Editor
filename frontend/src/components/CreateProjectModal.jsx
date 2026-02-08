import React, { useState } from 'react';

const CreateProjectModal = ({ isOpen, onClose, onCreate }) => {
  const [projectTitle, setProjectTitle] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onCreate(projectTitle); // ✅ Calls the logic from the hook
    setProjectTitle("");    // Reset input
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[100]">
      <div className="bg-[#141414] w-[400px] p-8 rounded-xl border border-[#333]">
        <h1 className='text-xl mb-4 text-white font-bold'>New Project</h1>
        <input 
          className="w-full bg-[#202020] p-3 rounded-md mb-6 outline-none border border-[#444] text-white focus:border-[#00AEEF]" 
          autoFocus 
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          placeholder='e.g. Portfolio Site' 
        />
        <div className="flex gap-3">
          <button className="btnBlue flex-1" onClick={handleSubmit}>Create</button>
          <button className="bg-[#333] flex-1 rounded-md text-white" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;