import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FeatureSelection from './components/FeatureSelection';
import UniverseMapSimulation from './components/UniverseMapSimulation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeatureSelection />} />
          <Route path="/universe-map-simulation" element={<UniverseMapSimulation />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;