import React from 'react';
import './ModeSelection.css';

function ModeSelection({ onModeSelect, onLogout }) {
  return (
    <div className="mode-container">
      {/* 1. HEADER SECTION */}
      <header className="mode-header">
        <div className="mode-header-content">
          <div className="mode-title-section">
            <h1 className="mode-title">RADIOS</h1>
          </div>
          <button onClick={onLogout} className="btn-tertiary logout-btn">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7.5 13.5L12 9L7.5 4.5M11.25 9H3M11.25 3H13.5C13.8978 3 14.2794 3.15804 14.5607 3.43934C14.842 3.72064 15 4.10218 15 4.5V13.5C15 13.8978 14.842 14.2794 14.5607 14.5607C14.2794 14.842 13.8978 15 13.5 15H11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* 2. ELEVATED ONBOARDING BANNER */}
      <section className="onboarding-banner animate-fadeIn">
        <div className="banner-icon-wrapper animate-pulse">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </div>
        <div className="banner-content">
          <p className="banner-text">Select a diagnostic mode to begin AI-powered analysis</p>
          <p className="banner-subtext">Choose the appropriate imaging technique for your patient's case.</p>
        </div>
      </section>

      {/* 3. MODE GRID */}
      <main className="mode-grid">
        <div 
          className="mode-card animate-fadeInUp"
          onClick={() => onModeSelect('MRI')}
          style={{ animationDelay: '0.1s' }}
        >
          <div className="mode-card-header">
            <div className="mode-card-icon ct-icon">
                {/* SVG icon here */}
            </div>
            <h3 className="mode-card-title">MRI Brain Tumor Analysis</h3>
            <p className="mode-card-description">
              Brain tumor segmentation and clinical analysis
            </p>
          </div>
          <div className="mode-card-arrow">
            <span>Begin Analysis</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div 
          className="mode-card animate-fadeInUp"
          onClick={() => onModeSelect('XRAY')}
          style={{ animationDelay: '0.2s' }}
        >
          <div className="mode-card-header">
            <div className="mode-card-icon xray-icon">
                {/* SVG icon here */}
            </div>
            <h3 className="mode-card-title">Chest X-ray Diagnostics</h3>
            <p className="mode-card-description">
              Radiographic imaging analysis for Chest Xrays.
            </p>
          </div>
          <div className="mode-card-arrow">
            <span>Begin Analysis</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ModeSelection;