import React, { useState, useEffect } from 'react';
import EditorNavbar from '../components/EditorNavbar';
import Editor from '@monaco-editor/react';
import { MdOutlineLightMode } from "react-icons/md";
import { BiExpand } from "react-icons/bi";
import { useParams } from 'react-router-dom';
import { api_based_url } from '../helper';

export default function EditorPage() {
  const { projectID } = useParams();
  const [tab, setTab] = useState("html");
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [htmlCode, setHtmlCode] = useState(localStorage.getItem("htmlCode") || "<h1>Hello world</h1>"); // agar kuch h to usko fetch krlo.. or ni h abhi kuch  bhi then helloworld se shurat..
  const [cssCode, setCssCode] = useState(localStorage.getItem("cssCode") || "body { background-color: #9dd618; }");
  const [jsCode, setJsCode] = useState(localStorage.getItem("jsCode") || "// Some Comments");

  const changeTheme = () => {
    const navbar = document.querySelector('.EditorNavbar');
    if (isLightMode) {
      navbar.style.background = '#141414';
      document.body.classList.remove("lightMode");
    } else {
      navbar.style.background = '#f4f4f4';
      document.body.classList.add("lightMode");
    }
    setIsLightMode(!isLightMode);
  };

  const run = () => {
    const iframe = document.getElementById("iframe");
    if (!iframe) return;
    iframe.srcdoc = `
      ${htmlCode}
      <style>${cssCode}</style>
      <script>${jsCode}<\/script>
    `;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("htmlCode", htmlCode); //ab sbme krdo set item
      localStorage.setItem("cssCode", cssCode);
      localStorage.setItem("jsCode", jsCode);
      run();
    }, 500);
    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);


 

  useEffect(() => {
    fetch(api_based_url + "/getProject", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projId: projectID,
      })
    })
    .then(res => res.json())
    .then(data => {
      setHtmlCode(data.project.htmlCode);
      setCssCode(data.project.cssCode);
      setJsCode(data.project.jsCode);
    })
    .catch(error => console.error("Error fetching project:", error));
  }, [projectID]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        fetch(api_based_url + "/updateproject", {
          mode: "cors",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            projId: projectID,
            htmlCode,
            cssCode,
            jsCode
          })
        })
        .then(res => res.json())
        .then(data => {
          alert(data.success ? "Project saved successfully" : "Something went wrong");
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projectID, htmlCode, cssCode, jsCode]);

  return (
    <div>
      <EditorNavbar />
      <div className="flex justify-center">
        <div className={`left ${isExpanded ? "w-full" : "w-1/2"}`}>
          <div className="tabs flex justify-between items-center gap-2 w-full bg-[#1A1919] h-[50px] px-[40px]">
            <div className="tabs flex gap-2 items-center">
              <div onClick={() => setTab("html")} className="tab cursor-pointer p-[6px] bg-[#1E1E1E]">HTML</div>
              <div onClick={() => setTab("css")} className="tab cursor-pointer p-[6px] bg-[#1E1E1E]">CSS</div>
              <div onClick={() => setTab("js")} className="tab cursor-pointer p-[6px] bg-[#1E1E1E]">JS</div>
            </div>
            <div className="flex gap-2 items-center">
              <i className='text-[20px] cursor-pointer' onClick={changeTheme}><MdOutlineLightMode /></i>
              <i className='text-[20px] cursor-pointer' onClick={() => setIsExpanded(!isExpanded)}><BiExpand /></i>
            </div>
          </div>
          {tab === 'html' && <Editor value={htmlCode} onChange={setHtmlCode} height="83vh" theme={isLightMode ? 'vs-light' : 'vs-dark'} language="html" />}
          {tab === 'css' && <Editor value={cssCode} onChange={setCssCode} height="83vh" theme={isLightMode ? 'vs-light' : 'vs-dark'} language="css" />}
          {tab === 'js' && <Editor value={jsCode} onChange={setJsCode} height="83vh" theme={isLightMode ? 'vs-light' : 'vs-dark'} language="javascript" />}
        </div>
        <iframe id="iframe" className={`${isExpanded ? "w-0" : "w-1/2"} min-h-[83vh] bg-[#fff] text-black`} frameBorder="0"></iframe>
      </div>
    </div>
  );
}
