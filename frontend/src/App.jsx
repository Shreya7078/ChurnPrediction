import React from 'react'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard';
import Predict from './pages/Predict';
import Insights from './pages/Insights';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App