import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";

import Home from "./pages/Home";

import Signin from "./pages/Signin";
import ManageJobs from "./pages/ManageJobs";
import Signup from "./pages/Signup";




function App() {
  return (
    <>
      <BrowserRouter>
    
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ManageJobs" element={<ManageJobs/>}/>

        </Routes>
       
      </BrowserRouter>
    </>
  );
}

export default App;
