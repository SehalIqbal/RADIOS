import React, { useState } from 'react';
import LoginPage from './LoginPage';
import ModeSelection from './ModeSelection';
import MRIUploadPage from './MRIUploadPage';
import XrayUploadPage from './XrayUploadPage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentMode, setCurrentMode] = useState(null);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentMode(null);
  };

  const handleModeSelect = (mode) => {
    setCurrentMode(mode);
  };

  const handleBack = () => {
    setCurrentMode(null);
  };

  const renderPage = () => {
    if (!isLoggedIn) {
      return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }

    if (currentMode === 'MRI') {
      return <MRIUploadPage onBack={handleBack} />;
    }

    if (currentMode === 'XRAY') {
      return <XrayUploadPage onBack={handleBack} />;
    }

    return (
      <ModeSelection 
        onModeSelect={handleModeSelect} 
        onLogout={handleLogout} 
      />
    );
  };

  return (
    <div className="app-wrapper">
      <div className="page-transition" key={isLoggedIn ? (currentMode || 'dashboard') : 'login'}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;