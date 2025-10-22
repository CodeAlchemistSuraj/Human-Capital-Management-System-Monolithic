
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { FiUser, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield, FiAward, FiStar, FiCheck } from 'react-icons/fi';
import '../../assets/styles/LoginStyles.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeParticle, setActiveParticle] = useState(0);
  const { login, isLoading } = useAuthContext();

  // Particle animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveParticle((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      await login(username, password);
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) {
    return (
      <div className="login-container">
        <div className="quantum-loader">
          <div className="quantum-sphere">
            <div className="quantum-core"></div>
          </div>
          <p className="loading-quantum">Quantum Initializing HRMS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      {/* Animated Background Particles */}
      <div className="quantum-particles">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className={`particle ${i === activeParticle ? 'active' : ''}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Floating Tech Elements */}
      <div className="floating-tech">
        <div className="tech-orb orb-1"></div>
        <div className="tech-orb orb-2"></div>
        <div className="tech-orb orb-3"></div>
        <div className="circuit-line line-1"></div>
        <div className="circuit-line line-2"></div>
      </div>

      {/* Main Login Card */}
      <div className="quantum-login-card">
        {/* Left Side - Brand Showcase */}
        <div className="brand-dimension">
          <div className="dimension-portal">
            <div className="portal-glow"></div>
            <div className="brand-hero">
              <div className="logo-hologram">
                <img 
                  src="/src/assets/logo_nextgenhrms.png" 
                  alt="NextGen HRMS" 
                  className="hologram-logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.nextElementSibling;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="hologram-fallback">
                  <FiAward className="quantum-icon" />
                  <span>NextGen HRMS</span>
                </div>
                <div className="hologram-beam"></div>
              </div>

              <div className="hero-content">
                <h1 className="quantum-title">
                  <span className="title-glow">NextGen HRMS</span>
                </h1>
                <p className="quantum-subtitle">Enterprise Human Capital Management Platform</p>
                
                <div className="feature-matrix">
                  <div className="matrix-row">
                    <div className="feature-chip">
                      <FiShield className="chip-icon" />
                      <span>Secure & Compliant</span>
                      <div className="chip-glow"></div>
                    </div>
                    <div className="feature-chip">
                      <FiAward className="chip-icon" />
                      <span>Enterprise Grade</span>
                      <div className="chip-glow"></div>
                    </div>
                  </div>
                  <div className="matrix-row">
                    <div className="feature-chip">
                      <FiUser className="chip-icon" />
                      <span>Role-Based Access</span>
                      <div className="chip-glow"></div>
                    </div>
                    <div className="feature-chip">
                      <FiStar className="chip-icon" />
                      <span>AI Powered</span>
                      <div className="chip-glow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Interface */}
        <div className="login-dimension">
          <div className="dimension-interface">
            <div className="interface-header">
              <div className="header-glow"></div>
              <h2 className="welcome-title">Access Portal</h2>
              <p className="welcome-subtitle">Enter your credentials to continue</p>
            </div>

            {error && (
              <div className="quantum-error">
                <div className="error-pulse"></div>
                <FiShield className="error-icon" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="quantum-form">
              <div className="input-field-quantum">
                <div className="field-orb"></div>
                <FiUser className="field-icon" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="quantum-input"
                  placeholder="Username or Email"
                  required
                  disabled={isSubmitting}
                />
                <div className="input-glow"></div>
              </div>

              <div className="input-field-quantum">
                <div className="field-orb"></div>
                <FiLock className="field-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="quantum-input"
                  placeholder="Password"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="quantum-toggle"
                  onClick={togglePasswordVisibility}
                  disabled={isSubmitting}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
                <div className="input-glow"></div>
              </div>

              <div className="form-options-quantum">
                <label className="quantum-checkbox">
                  <input type="checkbox" />
                  <span className="check-orb">
                    <FiCheck className="check-icon" />
                  </span>
                  Remember this device
                </label>
                <button type="button" className="quantum-link">
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`quantum-button ${isSubmitting ? 'quantum-loading' : ''}`}
              >
                <span className="button-text">
                  {isSubmitting ? 'Quantum Signing In...' : 'Access System'}
                </span>
                <div className="button-orb">
                  <FiArrowRight className="button-arrow" />
                </div>
                <div className="quantum-ripple"></div>
                <div className="button-glow"></div>
              </button>
            </form>

            <div className="quantum-footer">
              <div className="security-badge">
                <div className="badge-glow"></div>
                <FiShield className="badge-icon" />
                <span>Secure Quantum Encryption</span>
              </div>
              <div className="version-quantum">
                <span>NextGen HRMS v3.0</span>
                <span className="quantum-dot">•</span>
                <span>Quantum Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;