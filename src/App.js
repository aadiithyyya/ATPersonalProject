import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Feature1 from './pages/Feature1';
import Feature2 from './pages/Feature2';
import Feature3 from './pages/Feature3';

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Feature1 />} />
        <Route path="/feature2" element={<Feature2 />} />
        <Route path="/feature3" element={<Feature3 />} />
      </Routes>
    </div>
  );
}

export default App;
