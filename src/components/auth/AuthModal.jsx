import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Eye, EyeOff, Lock, Mail, User as UserIcon, Sparkles, FileDown, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useResume } from '../../context/ResumeContext';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, authReason, signIn, signUp } = useAuth();
  const { showToast } = useResume();
  const [mode, setMode] = useState(authMode || 'signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Sync mode whenever modal opens
  React.useEffect(() => {
    if (isAuthModalOpen) {
      setMode(authMode || 'signin');
      setError('');
      setSuccessMessage('');
    }
  }, [isAuthModalOpen, authMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'signup') {
        if (!name.trim()) {
          setError('Please enter your full name.');
          setIsLoading(false);
          return;
        }
        await signUp(name.trim(), email.trim(), password);
        showToast('Account created successfully! Downloading your resume...', 'success');
      } else {
        await signIn(email.trim(), password);
        showToast('Signed in successfully! Downloading your resume...', 'success');
      }
    } catch (err) {
      console.error('Supabase auth error:', err);
      // Map common Supabase error messages to user-friendly messages
      let msg = err.message || 'Authentication failed. Please check your credentials.';
      if (msg.includes('Invalid login credentials')) {
        msg = 'Invalid email or password. Please try again or create a new account.';
      } else if (msg.includes('User already registered')) {
        msg = 'This email is already registered. Please switch to Sign In.';
      }
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFillDemo = () => {
    setEmail('demo.user@resumeflow.io');
    setPassword('demo123456');
    if (mode === 'signup') {
      setName('Alex Vance');
    }
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      title=""
      maxWidth="440px"
    >
      <div style={{ padding: '0.5rem 0' }}>
        {/* Header with Purpose Banner */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          {authReason === 'download' ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(59, 130, 246, 0.12)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                color: 'var(--primary)',
                fontSize: '0.78rem',
                fontWeight: 600,
                marginBottom: '10px',
              }}
            >
              <FileDown size={14} />
              <span>Free Account Required to Download</span>
            </div>
          ) : (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: 'var(--accent-emerald)',
                fontSize: '0.78rem',
                fontWeight: 600,
                marginBottom: '10px',
              }}
            >
              <ShieldCheck size={14} />
              <span>Secure Cloud Authentication</span>
            </div>
          )}

          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
            {mode === 'signin' ? 'Sign In with Email' : 'Create Free Account'}
          </h3>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
            {authReason === 'download'
              ? 'Sign in or register to instantly download your recruiter-ready PDF resume.'
              : 'Access your saved resumes and unlock unlimited high-res PDF exports.'}
          </p>
        </div>

        {/* Mode Tabs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            backgroundColor: 'var(--bg-tertiary)',
            padding: '3px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.25rem',
          }}
        >
          <button
            type="button"
            onClick={() => { setMode('signin'); setError(''); }}
            style={{
              padding: '7px 10px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              backgroundColor: mode === 'signin' ? 'var(--bg-secondary)' : 'transparent',
              color: mode === 'signin' ? 'var(--primary)' : 'var(--text-secondary)',
              boxShadow: mode === 'signin' ? 'var(--shadow-sm)' : 'none',
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(''); }}
            style={{
              padding: '7px 10px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              backgroundColor: mode === 'signup' ? 'var(--bg-secondary)' : 'transparent',
              color: mode === 'signup' ? 'var(--primary)' : 'var(--text-secondary)',
              boxShadow: mode === 'signup' ? 'var(--shadow-sm)' : 'none',
            }}
          >
            Create Account
          </button>
        </div>

        {/* Error / Success Banners */}
        {error && (
          <div
            style={{
              padding: '0.65rem 0.85rem',
              backgroundColor: 'var(--accent-rose-light)',
              color: 'var(--accent-rose)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              marginBottom: '1rem',
              lineHeight: 1.4,
            }}
          >
            {error}
          </div>
        )}

        {successMessage && (
          <div
            style={{
              padding: '0.65rem 0.85rem',
              backgroundColor: 'var(--accent-emerald-light)',
              color: 'var(--accent-emerald)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              marginBottom: '1rem',
            }}
          >
            {successMessage}
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '2.2rem' }}
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <UserIcon
                  size={16}
                  color="var(--text-muted)"
                  style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="form-input"
                style={{ paddingLeft: '2.2rem' }}
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail
                size={16}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span>Password</span>
              {mode === 'signin' && (
                <span
                  onClick={() => alert('Please contact support or register a new test email.')}
                  style={{ color: 'var(--primary)', cursor: 'pointer', fontSize: '0.74rem' }}
                >
                  Forgot?
                </span>
              )}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                style={{ paddingLeft: '2.2rem', paddingRight: '2.2rem' }}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock
                size={16}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.7rem', fontWeight: 600, gap: '6px', marginTop: '4px' }}
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : mode === 'signin' ? (
              <>
                <span>Sign In & Download Resume</span>
                <ArrowRight size={15} />
              </>
            ) : (
              <>
                <span>Create Account & Download Resume</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>

          {/* Quick Auto-fill for Fast Testing */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2px' }}>
            <button
              type="button"
              onClick={handleQuickFillDemo}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.76rem', color: 'var(--text-muted)', gap: '4px' }}
            >
              <Sparkles size={12} color="var(--primary)" />
              <span>Fill sample credentials</span>
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '12px' }}>
          {mode === 'signin' ? (
            <>
              New to ResumeFlow?{' '}
              <span
                onClick={() => { setMode('signup'); setError(''); }}
                style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
              >
                Create a free account
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                onClick={() => { setMode('signin'); setError(''); }}
                style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
              >
                Sign In
              </span>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
