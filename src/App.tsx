import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FeatureSelection from './components/FeatureSelection';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeatureSelection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;