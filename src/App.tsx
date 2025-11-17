import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Pages/home';
import NavBar from './Components/navbar';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
