// handles react-router setup

import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Compare from '../pages/Compare';
import About from '../pages/About';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;
