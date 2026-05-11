import React, { useState } from 'react';
import './UploadPage.css';

function XrayUploadPage({ onBack }) {
  const [scanFile, setScanFile] = useState(null);
  const [reportFile, setReportFile] = useState(null);
  const [reportOutput, setReportOutput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleScanChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setScanFile(e.target.files[0]);
    }
  };

  const handleReportChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setReportFile(e.target.files[0]);
    }
  };

  const BACKEND_URL = "https://strong-protected-subscribe-rotary.trycloudflare.com"; // paste from Colab output

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsFinished(false);
    setReportOutput('Analyzing X-ray image...');

    try {
      const formData = new FormData();
      formData.append('file', scanFile);

      const response = await fetch(`${BACKEND_URL}/analyze-xray`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Analysis failed');
      
      const data = await response.json();
      setReportOutput(data.report || data.findings || JSON.stringify(data));
      setIsFinished(true);
    } catch (err) {
      setReportOutput(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([reportOutput], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `RADIOS_XRay_Report_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleReset = () => {
    setScanFile(null);
    setReportFile(null);
    setReportOutput('');
    setIsFinished(false);
    setIsSubmitting(false);
  };

  return (
    <div className="upload-container animate-fadeInUp">
      <div className="upload-header">
        <button onClick={onBack} className="btn-secondary back-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <div className="upload-title-section">
          <h2 className="upload-title">X-ray Analysis</h2>
          <p className="upload-subtitle">Upload your X-ray image for AI-powered diagnostic analysis</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="upload-section">
          <label className="upload-label">
            X-ray Image <span className="required-badge">Required</span>
          </label>
          <div className={`upload-dropzone ${scanFile ? 'has-file' : ''}`}>
            {scanFile ? (
              <div className="file-preview">
                <div className="file-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M20 4H8C6.93913 4 5.92172 4.42143 5.17157 5.17157C4.42143 5.92172 4 6.93913 4 8V24C4 25.0609 4.42143 26.0783 5.17157 26.8284C5.92172 27.5786 6.93913 28 8 28H24C25.0609 28 26.0783 27.5786 26.8284 26.8284C27.5786 26.0783 28 25.0609 28 24V12L20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 4V12H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="file-info">
                  <p className="file-name">{scanFile.name}</p>
                  <p className="file-size">{(scanFile.size / 1024).toFixed(2)} KB</p>
                </div>
                <button type="button" onClick={() => setScanFile(null)} className="file-remove">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <div className="upload-icon">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M24 32V16M16 24L24 16L32 24M8 38H40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="upload-text">Drag & drop your X-ray here</p>
                <p className="upload-subtext">or</p>
                <label className="upload-button">
                  Browse Files
                  <input type="file" onChange={handleScanChange} accept=".dcm,.dicom,.jpg,.jpeg,.png" style={{ display: 'none' }} required />
                </label>
                <p className="upload-hint">Supported: DICOM, JPEG, PNG</p>
              </>
            )}
          </div>
        </div>

        <div className="upload-section">
          <label className="upload-label">
            Previous Report <span className="optional-badge">Optional</span>
          </label>
          <div className={`upload-dropzone secondary ${reportFile ? 'has-file' : ''}`}>
            {reportFile ? (
              <div className="file-preview">
                <div className="file-icon secondary-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M20 4H8C6.93913 4 5.92172 4.42143 5.17157 5.17157C4.42143 5.92172 4 6.93913 4 8V24C4 25.0609 4.42143 26.0783 5.17157 26.8284C5.92172 27.5786 6.93913 28 8 28H24C25.0609 28 26.0783 27.5786 26.8284 26.8284C27.5786 26.0783 28 25.0609 28 24V12L20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 4V12H28M12 16H20M12 20H20M12 24H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="file-info">
                  <p className="file-name">{reportFile.name}</p>
                  <p className="file-size">{(reportFile.size / 1024).toFixed(2)} KB</p>
                </div>
                <button type="button" onClick={() => setReportFile(null)} className="file-remove">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <div className="upload-icon secondary-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M25 5H10C8.67392 5 7.40215 5.52678 6.46447 6.46447C5.52678 7.40215 5 8.67392 5 10V30C5 31.3261 5.52678 32.5979 6.46447 33.5355C7.40215 34.4732 8.67392 35 10 35H30C31.3261 35 32.5979 34.4732 33.5355 33.5355C34.4732 32.5979 35 31.3261 35 30V15L25 5Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M25 5V15H35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <label className="upload-button-secondary">
                  Upload Previous Report
                  <input type="file" onChange={handleReportChange} accept=".pdf,.txt,.doc,.docx" style={{ display: 'none' }} />
                </label>
              </>
            )}
          </div>
        </div>

        <button type="submit" className="btn-primary submit-btn" disabled={isSubmitting || !scanFile}>
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Analyzing...
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2V18M10 2L6 6M10 2L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Start Analysis
            </>
          )}
        </button>
      </form>

      {reportOutput && (
        <div className="results-section animate-fadeInUp">
          <div className="results-header">
            <h3 className="results-title">Analysis Report</h3>
            {isFinished && (
              <div className="results-actions">
                <button onClick={handleDownload} className="btn-accent">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 1V13M9 13L5 9M9 13L13 9M2 17H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download Report
                </button>
                <button onClick={handleReset} className="btn-secondary">
                  New Analysis
                </button>
              </div>
            )}
          </div>
          <div className={`results-output ${isSubmitting ? 'loading' : ''}`}>
            {isSubmitting && <div className="results-loader animate-pulse">Processing X-ray image...</div>}
            <pre className="results-text">{reportOutput}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default XrayUploadPage;