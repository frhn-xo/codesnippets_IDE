import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Form from './pages/Form';
import Display from './pages/Display';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/display" element={<Display />} />
        <Route path="*" element={<Navigate to="/form" replace />} />
      </Routes>
    </div>
  );
};

export default App;
