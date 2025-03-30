import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NoPage from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Editor from "./pages/Editior";
export default function App() {
  return (
    <>
      {/* <div>hello world</div> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Editor/:projectID" element={<Editor />} />
          <Route path="*" element={<NoPage />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}
