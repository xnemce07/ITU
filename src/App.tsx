import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter> 
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />}/>;
    </Routes>
  </BrowserRouter>
  );
}

export default App;
