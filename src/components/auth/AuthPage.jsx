import React, { useState } from 'react';
import {
  FileText, Sparkles, ShieldCheck, CheckCircle2, ArrowRight,
  Eye, EyeOff, Lock, Mail, User as UserIcon, Star, Moon, Sun,
  Briefcase, Award, Zap, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthPage = () => {
  const { signIn, signUp, loginAsDemo } = useAuth();
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    const nextTheme = isDarkMode ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    setIsDarkMode(!isDarkMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (mode === 'signup') {
        if (!name.trim()) {
          setError('Please enter your full name.');
          setIsLoading(false);
          return;
        }
        signUp(name, email, password);
      } else {
        signIn(email, password);
      }
      setIsLoading(false);
    }, 400);
  };

  const handleDemoSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginAsDemo();
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="auth-page-container">
      {/* Background Ambient Glows */}
      <div className="auth-glow-top-left" />
      <div className="auth-glow-bottom-right" />

      {/* Top Header */}
      <header className="auth-header">
        <div className="auth-brand">
          <div className="auth-logo-icon">
            <FileText size={20} />
          </div>
          <span className="auth-logo-text">
            Resume<span>Flow</span>
          </span>
          <span className="auth-badge-pill">AI Suite 2.0</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-icon btn-sm"
            title="Toggle Light / Dark Mode"
          >
            {isDarkMode ? <Sun size={17} color="var(--accent-amber)" /> : <Moon size={17} />}
          </button>
        </div>
      </header>

      {/* Main Split Grid */}
      <main className="auth-main-grid">
        {/* Left Side: Product Showcase & Social Proof */}
        <section className="auth-hero-section">
          <div className="auth-hero-pill">
            <Sparkles size={14} color="#60a5fa" />
            <span>Recruiter-Tested AI Resume Platform</span>
          </div>

          <h1 className="auth-hero-title">
            Build recruiter-ready resumes that get you hired{' '}
            <span className="text-gradient">3x faster</span>.
          </h1>

          <p className="auth-hero-subtitle">
            Create high-impact, ATS-optimized resumes in minutes. Powered by context-aware AI bullet rephrasing, 5 executive templates, and real-time ATS scoring.
          </p>

          {/* Feature Highlights */}
          <div className="auth-features-list">
            <div className="auth-feature-item">
              <div className="auth-feature-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
                <Sparkles size={18} />
              </div>
              <div>
                <div className="auth-feature-heading">AI STAR / XYZ Bullet Generator</div>
                <div className="auth-feature-desc">Transform generic bullet points into high-impact, metric-driven achievements.</div>
              </div>
            </div>

            <div className="auth-feature-item">
              <div className="auth-feature-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="auth-feature-heading">Real-Time 0–100 ATS Audit</div>
                <div className="auth-feature-desc">Scans readability, action verb density, and target keywords before you apply.</div>
              </div>
            </div>

            <div className="auth-feature-item">
              <div className="auth-feature-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                <Award size={18} />
              </div>
              <div>
                <div className="auth-feature-heading">5 Recruiter-Approved Layouts</div>
                <div className="auth-feature-desc">Switch seamlessly between Modern, Minimal ATS, Corporate, Tech, and Nordic designs.</div>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="auth-testimonial-card">
            <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <p className="auth-testimonial-text">
              "ResumeFlow made reformatting and polishing my career experience effortless. I received interview callbacks from Google and Stripe within two weeks."
            </p>
            <div className="auth-testimonial-author">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Alex Morgan"
                className="auth-author-avatar"
              />
              <div>
                <div className="auth-author-name">Alex Morgan</div>
                <div className="auth-author-role">Staff Full-Stack Architect</div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Authentication Card */}
        <section className="auth-card-section">
          <div className="auth-form-card">
            {/* Tab Header: Sign In vs Sign Up */}
            <div className="auth-tabs-header">
              <button
                type="button"
                className={`auth-tab-btn ${mode === 'signin' ? 'active' : ''}`}
                onClick={() => { setMode('signin'); setError(''); }}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`auth-tab-btn ${mode === 'signup' ? 'active' : ''}`}
                onClick={() => { setMode('signup'); setError(''); }}
              >
                Create Account
              </button>
            </div>

            {/* Quick 1-Click Demo Login Banner */}
            <div className="auth-demo-banner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="auth-demo-badge">
                  <Zap size={16} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                    Want to test the app instantly?
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                    1-Click access with full sample resumes & builder.
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDemoSignIn}
                disabled={isLoading}
                className="btn btn-primary btn-sm auth-demo-btn"
              >
                <Sparkles size={14} />
                <span>Try Demo Profile</span>
              </button>
            </div>

            <div className="auth-divider">
              <span>or continue with credentials</span>
            </div>

            {/* Error Message */}
            {error && (
              <div className="auth-error-banner">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="auth-form-fields">
              {mode === 'signup' && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      className="form-input"
                      style={{ paddingLeft: '2.4rem' }}
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <UserIcon
                      size={17}
                      color="var(--text-muted)"
                      style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Work / Personal Email</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    className="form-input"
                    style={{ paddingLeft: '2.4rem' }}
                    placeholder="alex.morgan@careerflow.io"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Mail
                    size={17}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                  {mode === 'signin' && (
                    <span
                      onClick={() => alert('Password reset link sent to registered email.')}
                      style={{ color: 'var(--primary)', cursor: 'pointer', fontSize: '0.76rem', fontWeight: 500 }}
                    >
                      Forgot password?
                    </span>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    style={{ paddingLeft: '2.4rem', paddingRight: '2.5rem' }}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Lock
                    size={17}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {mode === 'signin' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <input
                    type="checkbox"
                    id="authRememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
                  />
                  <label htmlFor="authRememberMe" style={{ cursor: 'pointer' }}>
                    Remember me on this browser for 30 days
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem', fontWeight: 600, marginTop: '4px', gap: '8px' }}
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : mode === 'signin' ? (
                  <>
                    <span>Sign In to Workspace</span>
                    <ArrowRight size={16} />
                  </>
                ) : (
                  <>
                    <span>Create Free Account</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="auth-terms-footer">
              By signing in or creating an account, you agree to our Terms of Service and Privacy Policy. All resume data is securely preserved.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
