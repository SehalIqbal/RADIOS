import React, { useState } from 'react';
import './AuthStyles.css';

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 400));

    if (email === 'aman' && password === 'aman123') {
      onLoginSuccess();
    } else {
      setError('Invalid credentials. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="brand-heading">RADIOS</h1>
          <p className="brand-tagline">Medical AI Diagnostic Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email / Username
            </label>
            <input
              id="email"
              type="text"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your username"
              required
              autoComplete="username"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="auth-error animate-scaleIn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM8 10C7.72386 10 7.5 9.77614 7.5 9.5V8C7.5 7.72386 7.72386 7.5 8 7.5C8.27614 7.5 8.5 7.72386 8.5 8V9.5C8.5 9.77614 8.27614 10 8 10ZM8.5 6C8.5 6.27614 8.27614 6.5 8 6.5C7.72386 6.5 7.5 6.27614 7.5 6C7.5 5.72386 7.72386 5.5 8 5.5C8.27614 5.5 8.5 5.72386 8.5 6Z" fill="currentColor"/>
              </svg>
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary auth-submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="auth-hint">
          <p className="hint-text">
            Demo credentials: <span className="hint-credential">aman</span> / <span className="hint-credential">aman123</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;