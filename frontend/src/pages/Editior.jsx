import React, { useState  , useEffect} from 'react';
import EditorNavbar from '../components/EditorNavbar';
import Editor from '@monaco-editor/react';
import { MdOutlineLightMode } from "react-icons/md";
import { BiExpand } from "react-icons/bi";
import { useParams } from 'react-router-dom';
import { api_based_url } from '../helper';

export default function Editior() {
  const {projectID}=useParams();
  const[tab , setTab]=useState("html");

  const [isLightMode , setIsLightMode]=useState(false);
  const changeTheme=()=>{
    
    if(isLightMode){
      document.querySelector('.EditorNavbar').style.background='#141414';
      document.body.classList.remove("lightMode");
      setIsLightMode(false);
    }
    else{
      document.querySelector('.EditorNavbar').style.background='#f4f4f4';
      document.body.classList.add("lightMode")
      setIsLightMode(true);
    }
  }

  const [isExpanded  , setIsExpanded]=useState(false);

  const getSavedCode = (key, defaultValue) => {
    const saved = localStorage.getItem(key); //pehle storage se krdo getItem..
    return saved !== null ? saved : defaultValue;
  };
  const run=()=>{
    const iframe = document.getElementById("iframe");
    if(!iframe)return ;
    // const html = htmlCode;
    // const css = cssCode;
    // const js = jsCode;
    
    // iframe.srcdoc = html+css+js;
    const html = htmlCode;
    const css = `<style>${cssCode}</style>`;
    const js = `<script>${jsCode}</script>`;

    iframe.srcdoc = `${html} ${css} ${js}`;

  }
  const [htmlCode , setHtmlCode]=useState(getSavedCode("htmlCode", "<h1>Hello world</h1>"));
  const [cssCode , setCssCode]=useState(getSavedCode("cssCode", "body { background-color: #9dd618; }"));
  const [jsCode , setJsCode]=useState(getSavedCode("jsCode", "// Some Comments"));



//   useEffect(()=>{
//     const timeout =setTimeout(()=>{
//       run();
//     } , 300); //300 millisecond ke baad auto run hoga..
//   // },[])
//   return () => clearTimeout(timeout); // Cleanup function
// }, [htmlCode, cssCode, jsCode]);

useEffect(() => {
  const timeout = setTimeout(() => {
      localStorage.setItem("htmlCode", htmlCode); //ab sbme krdo set item
      localStorage.setItem("cssCode", cssCode);
      localStorage.setItem("jsCode", jsCode);
      run();
  }, 500);
  return () => clearTimeout(timeout);
}, [htmlCode, cssCode, jsCode]);
  

useEffect(()=>{
  fetch(api_based_url + "/getProject",{
    mode: "cors",
    method: "POST",
    headers: {
        "Content-Type" :"application/json" 
    },
    body: JSON.stringify({
      userId: localStorage.getItem("userId"),
      projId:projectID
    })
  }).then(res=>res.json()).then(data=>{
    setHtmlCode(data.project.htmlCode);
    setCssCode(data.project.cssCode);
    setJsCode(data.project.jsCode);

  })
  .catch(error => console.error("Error fetching project:", error));
},[])

  return (
    <div>
      <EditorNavbar/>
      <div className="flex  justify-center"> 
        <div className={`left ${isExpanded ? "w-full" : "w-1/2"}`}>
            <div className="tabs flex justify-between items-center gap-2 w-full bg-[#1A1919] h-[50px] px-[40px]">
                <div className=" tabs flex gap-2 items-center">
                  <div onClick={()=>{setTab("html")}} className="tab cursor-pointer p-[6px] bg-[#1E1E1E]">HTML</div>
                  <div  onClick={()=>{setTab("css")}} className="tab cursor-pointer p-[6px] bg-[#1E1E1E]">CSS</div>
                  <div  onClick={()=>{setTab("js")}} className="tab cursor-pointer p-[6px] bg-[#1E1E1E] ">JS</div>
                </div>
                <div className="flex gap-2 items-center">
                  <i className='text-[20px] cursor-pointer ' onClick={changeTheme} ><MdOutlineLightMode /></i>
                  <i className='text-[20px] cursor-pointer ' onClick={()=>{setIsExpanded(!isExpanded)} }><BiExpand /></i>
                </div>
            </div>

            {
              tab == 'html'?
              <>
              html
              <Editor value={htmlCode  || ""} onChange={(newValue) => setHtmlCode(newValue)} height="83vh" theme={isLightMode?'vs-ligth': 'vs-dark'} language="html"  />
              </> 
              : tab == 'css' ?
              <>
              css
              <Editor value={cssCode  || ""} onChange={(newValue)=>{setCssCode(newValue); }} height="83vh" theme={isLightMode?'vs-ligth': 'vs-dark'} language="css"  />
              </> : <>
              js
              <Editor value={jsCode  || ""} onChange={(e)=>{setJsCode(e);}} height="83vh" theme={isLightMode?'vs-ligth': 'vs-dark'} language="javascript" />
              </> 
            }
            {/* default kahi na he likho to acha he h.. */}
            
        </div>
        <iframe id="iframe"  className={`${isExpanded ? "w-0" : "w-1/2"} min-h-[83vh] bg-[#fff] text-black`} frameBorder="0" >iframe</iframe>
      </div>
    </div>
  )
}
