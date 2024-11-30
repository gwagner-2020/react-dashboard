import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import icon1 from "./assets/icon1.png";
import Home from './components/Home.jsx'
import DepartmentDashboard from './components/DepartmentDashboard.jsx';

function App() {
  return (
    <>
      {/* Header Div */}
      <div class="sticky top-0 z-50 h-30 w-full flex items-center text-center bg-gradient-to-r from-purple-500 to-indigo-500">
          <a href='/'>
            <img class="mt-2 mb-2 ml-10 w-24" src={icon1} alt="person looking at image"/>
          </a>
          <span class="text-3xl tracking-wider text-center text-white mx-auto">
            <span class="font-bold">Collection Insights Dashboard - AIC</span>
          </span>
      </div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/departmentdashboard" element={<DepartmentDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
