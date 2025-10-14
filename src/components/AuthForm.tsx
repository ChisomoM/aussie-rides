"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  
} from 'firebase/auth';
import dynamic from 'next/dynamic';

const ProfileSetup = dynamic(() => import('./ProfileSetup'), { ssr: false });

function emailIsValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function passwordStrength(password: string) {
  let score = 0;
  if (password.length >= 6) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4); // 0..4
}

function StrengthMeter({ score }: { score: number }) {
  const labels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['bg-rose-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-emerald-500'];
  const textColors = ['text-rose-600', 'text-orange-600', 'text-yellow-600', 'text-lime-600', 'text-emerald-600'];
  
  return (
    <div className="mt-2" aria-live="polite">
      <div className="flex gap-1.5 items-center mb-1">
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < score ? colors[score - 1] : 'bg-gray-200'}`} 
          />
        ))}
      </div>
      <div className={`text-xs font-medium ${textColors[score] || 'text-gray-500'}`}>
        {score > 0 ? labels[score] : ''}
      </div>
    </div>
  );
}

function Toast({ message, type }: { message: string; type?: 'error' | 'success' | 'info' }) {
  if (!message) return null;
  
  const config = {
    error: {
      bg: 'bg-rose-50 border-rose-200',
      text: 'text-rose-700',
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
        </svg>
      )
    },
    success: {
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-700',
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
      )
    },
    info: {
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-700',
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
        </svg>
      )
    }
  };
  
  const style = config[type || 'info'];
  
  return (
    <div 
      role="status" 
      aria-live="polite" 
      className={`${style.bg} ${style.text} border rounded-lg px-4 py-3 flex items-start gap-3 shadow-sm animate-in slide-in-from-top-2 duration-300`}
    >
      {style.icon}
      <span className="text-sm font-medium flex-1">{message}</span>
    </div>
  );
}

export default function AuthForm({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  const pwdScore = passwordStrength(password);
  const emailValid = emailIsValid(email);

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // close forgot if open, otherwise close the whole modal if an onClose handler is provided
        if (showForgot) setShowForgot(false);
        else onClose?.();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showForgot, onClose]);

  useEffect(() => {
    if (error) {
      // announce to screen readers
      const id = setTimeout(() => setError(''), 7000);
      return () => clearTimeout(id);
    }
  }, [error]);

  // const handleSocial = async (providerName: 'google' | 'apple') => {
  //   setLoading(true);
  //   setError('');
  //   try {
  //     if (providerName === 'google') {
  //       const p = new GoogleAuthProvider();
  //       await signInWithPopup(auth, p);
  //       setInfo('Signed in with Google');
  //     } else {
  //       const p = new OAuthProvider('apple.com');
  //       await signInWithPopup(auth, p);
  //       setInfo('Signed in with Apple');
  //     }
  //     // redirect to dashboard
  //     router.push('/dashboard');
  //   } catch (err: unknown) {
  //     const msg = err instanceof Error ? err.message : String(err);
  //     setError(msg || 'Social sign-in failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setError('');
    setInfo('');

    if (!emailValid) return setError('Please enter a valid email address');
    if (password.length < 6) return setError('Password must be at least 6 characters');

    setLoading(true);
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        setInfo('Admin signed in successfully');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setInfo('Admin account created successfully');
        // show profile setup modal for new users
        setShowProfileSetup(true);
      }
      router.push('/dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const [showProfileSetup, setShowProfileSetup] = useState(false);

  const handleReset = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setInfo('');
    if (!emailIsValid(resetEmail || email)) return setError('Enter a valid email to reset password');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail || email);
      setInfo('Password reset email sent');
      setShowForgot(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-sm"
      onClick={(e) => {
        // close when clicking the backdrop (but not when clicking inside the modal)
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-heading"
        className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-in-out animate-in fade-in zoom-in-95"
      >
        <div className="md:flex min-h-[600px]">
          {/* Left visual panel - enhanced design */}
          <div className="hidden md:flex md:flex-col md:w-2/5 bg-gradient-to-br from-[#10b981] via-emerald-600 to-emerald-800 text-white p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
            </div>
            <div className="relative z-10 flex-1 flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-4">Admin Access</h3>
              <p className="text-lg opacity-90 leading-relaxed mb-8">Sign in to access your admin dashboard and manage your vehicle inventory, bookings, and customer data.</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <div className="font-semibold">Manage Inventory</div>
                    <div className="text-sm opacity-80">Add, edit, and remove vehicles from your catalog</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  {/* <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg> */}
                  {/* <div>
                    <div className="font-semibold">Track Bookings</div>
                    <div className="text-sm opacity-80">Monitor and manage customer appointments</div>
                  </div>
                </div>
                <div className="flex items-start gap-3"> */}
                  {/* <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg> */}
                  {/* <div>
                    <div className="font-semibold">Full Control</div>
                    <div className="text-sm opacity-80">Complete administrative access to all features</div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h2 id="auth-heading" className="text-3xl font-bold text-gray-900 mb-2">{mode === 'login' ? 'Admin Sign In' : 'Create Admin Account'}</h2>
              <p className="text-gray-600">
                {mode === 'login' ? "Don't have an admin account? " : 'Already have an admin account? '}
                <button 
                  type="button"
                  className="text-[#10b981] font-semibold hover:underline focus:outline-none focus:underline" 
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                >
                  {mode === 'login' ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  aria-invalid={touched.email && !emailValid}
                  aria-describedby={touched.email && !emailValid ? 'email-error' : undefined}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
                {touched.email && !emailValid && (
                  <p id="email-error" className="text-sm text-rose-600 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    Please enter a valid email address
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  aria-invalid={touched.password && password.length <6}
                  aria-describedby={touched.password && password.length < 6 ? 'pwd-error' : undefined}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex-1 mr-4">
                    {password.length > 0 && <StrengthMeter score={pwdScore} />}
                  </div>
                  <div>
                      <button 
                        type="button" 
                        className="text-sm text-[#10b981] font-medium hover:underline focus:outline-none focus:underline" 
                        onClick={() => setShowForgot((s) => !s)}
                      >
                      Forgot password?
                    </button>
                  </div>
                </div>
                {touched.password && password.length < 6 && (
                  <p id="pwd-error" className="text-sm text-rose-600 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    Password must be at least 6 characters
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#10b981] hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  mode === 'login' ? 'Sign in as Admin' : 'Create Admin Account'
                )}
              </button>
            </form>

            {/* Social logins 
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleSocial('google')}
                  disabled={loading}
                  className="flex items-center justify-center gap-3 border-2 border-gray-300 hover:border-gray-400 rounded-lg px-4 py-3 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M21 12.23c0-.78-.07-1.36-.22-1.95H12v3.7h4.92c-.09.72-.58 1.88-1.95 2.67l-.02.13 2.84 2.2.2.02C19.6 18.3 21 15.5 21 12.23z" fill="#4285F4"/>
                    <path d="M12 22c2.7 0 4.96-.89 6.62-2.4l-3.16-2.45C14.86 17.6 13.52 18 12 18c-2.9 0-5.35-1.96-6.23-4.6l-.13.01L2.7 16.3 2.58 16.4C4.24 19.76 7.82 22 12 22z" fill="#34A853"/>
                    <path d="M5.77 13.4A7.99 7.99 0 0 1 5.5 12c0-.4.05-.78.12-1.15l-.12-.01L2.58 7.6 2.5 7.7A11.99 11.99 0 0 0 12 4c1.9 0 3.63.5 5 1.36l3.74-3.74C18.96.98 15.67 0 12 0 7.82 0 4.24 2.24 2.58 5.6l3.19 2.8c.98-2.64 3.33-4.6 6.23-4.6 1.52 0 2.86.4 3.78 1.05L12 9v4.4l-6.23 5.0z" fill="#FBBC05"/>
                  </svg>
                  <span className="font-medium text-gray-700">Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocial('apple')}
                  disabled={loading}
                  className="flex items-center justify-center gap-3 border-2 border-gray-300 hover:border-gray-400 rounded-lg px-4 py-3 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M16.365 1.43c0 1.02-.38 2.04-1.08 2.86-.7.82-1.8 1.48-2.8 1.28-.16-1.1.46-2.22 1.24-2.99.78-.78 1.8-1.24 2.6-1.15z" fill="#111"/>
                    <path d="M20.5 7.5c-.96-1.22-2.18-2.14-3.6-2.6-1.26-.42-2.8-.24-4.1.54-1.3.78-2.16 2.06-2.31 3.4-.16 1.36.28 2.86 1.34 3.96 1.06 1.1 2.56 1.76 4.02 1.76.06 0 .13 0 .19-.01 1.52-.12 3.03-.96 4.19-2.2 1.16-1.23 1.9-2.84 1.58-4.65-.06-.35-.17-.69-.31-1.03z" fill="#111"/>
                  </svg>
                  <span className="font-medium text-gray-700">Apple</span>
                </button>
              </div>
            </div>
            */}

            {/* Forgot password inline */}
            {showForgot && (
              <form onSubmit={handleReset} className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <label htmlFor="resetEmail" className="block text-sm font-semibold text-gray-700 mb-2">Reset your password</label>
                <p className="text-sm text-gray-600 mb-3">Enter your email address and we&apos;ll send you a link to reset your password.</p>
                <div className="flex gap-3">
                  <input 
                    id="resetEmail" 
                    type="email"
                    value={resetEmail} 
                    onChange={(e) => setResetEmail(e.target.value)} 
                    placeholder="you@example.com" 
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" 
                  />
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="bg-[#10b981] hover:bg-emerald-600 text-white font-semibold rounded-lg px-6 py-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Send
                  </button>
                </div>
              </form>
            )}

            {/* Toast messages */}
            {(error || info) && (
              <div className="mt-6 space-y-3">
                {error && <Toast message={error} type="error" />}
                {info && <Toast message={info} type="success" />}
              </div>
            )}
          </div>
        </div>
      </div>
        {showProfileSetup && <ProfileSetup onComplete={() => setShowProfileSetup(false)} />}
    </div>
  );
}
