import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.css';
import Home from './pages/Home';
import SignUp from './pages/forms/SignUp';
import SignIn from './pages/forms/SignIn';
import ProfilePictureUpload from './pages/forms/ProfilePictureUpload';
import DiseaseDetection from './pages/DiseaseDetection';
import HealthMonitor from './pages/HealthMonitor';
import MilkProduction from './pages/MilkProduction';
import VetLocate from './pages/VetLocateMap';
import CowProfile from './pages/CowProfile';
import ChatSection from './pages/ChatSection';
import CattleSummary from './pages/CattleSummary';
import MilkRecords from './components/MilkRecords';
import MilkHistory from './pages/MilkHistory';

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <Router>
      <Routes>
        {/* Redirect based on user session */}
        <Route path="/" element={user ? <Dashboard /> : <Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile-upload" element={<ProfilePictureUpload />} />
        <Route path="/logged/dashboard" element={<Dashboard />} />
            <Route path="/logged/profile" element={<CowProfile />} />
            <Route path="/logged/cattle" element={<CattleSummary />} />
            <Route path="/logged/disease-detection" element={<DiseaseDetection />} />
            <Route path="/logged/health-monitor" element={<HealthMonitor />} /> 
            <Route path="/logged/milk-production" element={<MilkProduction />} />
            <Route path="/logged/milk-records" element={<MilkHistory />} />
            <Route path="/logged/chat" element={<ChatSection />} />
            <Route path="/logged/map" element={<VetLocate />} />
            <Route path="*" element={<Navigate to="/" />} />
        
        
      </Routes>
    </Router>
  );
}

export default App;
