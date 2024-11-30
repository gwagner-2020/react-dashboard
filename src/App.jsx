import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home.jsx'
import SelectList from './components/SelectList.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/departments" element={<SelectList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
