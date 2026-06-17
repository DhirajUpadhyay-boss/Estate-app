// Register.jsx — two steps: (1) verify email with OTP, (2) name + terms
import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext.jsx';
import api from '../lib/api';
import { Mail, User as UserIcon, Shield, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const { currentUser, setAuthSession, isLoggedIn, authLoading } = useUser();

  const [step, setStep] = useState(1);

  // Step 1 state
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Step 2 state
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const isValidEmail = (v) => /^[^\s@]+@gmail\.com$/.test(v.trim());
  const isValidName = (v) => /^[A-Z][a-zA-Z ]{2,}$/.test(v.trim());

  useEffect(() => {
    if (!authLoading && isLoggedIn) navigate('/profile', { replace: true });
  }, [authLoading, isLoggedIn, navigate]);

  // Resend countdown timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [resendTimer]);

  // OTP box refs for auto-focus
  const otpRefs = Array.from({ length: 6 }, () => React.createRef());

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);
    if (value && index < 5) otpRefs[index + 1].current?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      otpRefs[5].current?.focus();
    }
    e.preventDefault();
  };

  const sendOtp = async () => {
    setError('');
    if (!isValidEmail(email)) {
      setError('Enter a valid Gmail address (must end with @gmail.com).');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/auth/register/send-otp', { email: email.trim().toLowerCase() });
      setOtpSent(true);
      setResendTimer(60);
      setSuccessMsg(`OTP sent to ${email}. Check your inbox.`);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpAndContinue = async (e) => {
    e.preventDefault();
    setError('');
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Enter the complete 6-digit OTP.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/auth/register/verify-otp', {
        email: email.trim().toLowerCase(),
        code,
      });
      setStep(2);
      setSuccessMsg('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const completeRegistration = async (e) => {
    e.preventDefault();
    setError('');
    if (!isValidName(name)) {
      setError('Name must start with a capital letter and be at least 3 characters (e.g. Rahul).');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (!termsAccepted) {
      setError('Please accept the Terms & Conditions and Privacy Policy.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/register/complete', {
        email: email.trim().toLowerCase(),
        name: name.trim(),
        password,
        termsAccepted: true,
      });
      setAuthSession({ user: data.user, token: data.token });
      navigate('/profile', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const goBackToStep1 = () => {
    setStep(1);
    setOtp(['', '', '', '', '', '']);
    setOtpSent(false);
    setError('');
    setSuccessMsg('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black flex items-center justify-center p-4 pt-24">
      <div className="max-w-md w-full">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Create account</h1>
          <p className="text-gray-400">
            {step === 1 ? 'Step 1 of 2 — verify your email' : 'Step 2 of 2 — your details'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 mb-6 px-1">
          <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-yellow-400' : 'bg-gray-700'}`} />
          <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-yellow-400' : 'bg-gray-700'}`} />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-900/40 border border-red-500/50 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Success */}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-green-900/40 border border-green-500/50 text-sm text-green-300">
            {successMsg}
          </div>
        )}

        {/* ─── STEP 1 ─── */}
        {step === 1 && (
          <form onSubmit={verifyOtpAndContinue} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl p-8 space-y-6">

            {/* Google Sign-In placeholder (not implemented) */}
            <button
              type="button"
              disabled
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/20 bg-white/5 text-gray-400 cursor-not-allowed text-sm font-medium"
              title="Google Sign-In coming soon"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-gray-500 text-sm">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Email input */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Gmail Address <span className="text-yellow-400 normal-case font-normal">(@gmail.com only)</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  placeholder="yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl focus:outline-none focus:border-yellow-400 focus:bg-white/15 transition-all"
                />
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={loading || resendTimer > 0}
                  className="absolute right-2 top-1.5 px-3 py-1.5 bg-yellow-400 text-gray-900 text-xs font-bold rounded-lg hover:bg-yellow-300 disabled:bg-gray-600 disabled:text-gray-400 transition-all"
                >
                  {loading && !otpSent ? 'Sending...' : resendTimer > 0 ? `${resendTimer}s` : otpSent ? 'Resend' : 'Send OTP'}
                </button>              </div>
            </div>

            {/* OTP boxes */}
            {otpSent && (
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Enter 6-digit OTP
                </label>
                <div className="flex gap-2 justify-between" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={otpRefs[i]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-11 h-12 text-center text-xl font-bold bg-white/10 border-2 border-white/20 text-white rounded-xl focus:outline-none focus:border-yellow-400 transition-all"
                    />
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !otpSent}
              className="w-full py-3.5 rounded-xl font-bold text-base bg-yellow-400 text-gray-900 hover:bg-yellow-300 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>

            <p className="text-center text-sm text-gray-500">
              Already registered?{' '}
              <Link to="/login" className="text-yellow-400 font-semibold hover:text-yellow-300">
                Sign in
              </Link>
            </p>

            {/* Footer links */}
            <div className="flex justify-center gap-6 pt-2">
              <Link to="/legal" className="text-xs text-gray-600 hover:text-gray-400">Privacy Policy</Link>
              <Link to="/legal" className="text-xs text-gray-600 hover:text-gray-400">Terms of Service</Link>
            </div>
          </form>
        )}

        {/* ─── STEP 2 ─── */}
        {step === 2 && (
          <form onSubmit={completeRegistration} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl p-8 space-y-6">

            <div className="flex items-center gap-2 p-3 rounded-xl bg-green-900/30 border border-green-500/30">
              <Mail className="w-4 h-4 text-green-400 shrink-0" />
              <p className="text-sm text-green-300">
                Verified: <span className="font-semibold">{email}</span>
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl focus:outline-none focus:border-yellow-400 focus:bg-white/15 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl focus:outline-none focus:border-yellow-400 focus:bg-white/15 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${termsAccepted ? 'bg-yellow-400 border-yellow-400' : 'border-white/30 bg-white/5'}`}>
                  {termsAccepted && (
                    <svg className="w-3 h-3 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-400 leading-relaxed">
                I agree to the{' '}
                <Link to="/legal" className="text-yellow-400 font-semibold hover:text-yellow-300 underline">
                  Terms &amp; Conditions and Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-base bg-yellow-400 text-gray-900 hover:bg-yellow-300 disabled:bg-gray-700 disabled:text-gray-500 transition-all"
            >
              {loading ? 'Creating account...' : 'Complete Registration'}
            </button>

            <button
              type="button"
              onClick={goBackToStep1}
              className="w-full text-yellow-400 text-sm font-semibold py-1 hover:text-yellow-300 transition-colors"
            >
              ← Back to email verification
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-xs text-gray-600">
          OTP expires in 15 minutes. Go back to step 1 if it expires.
        </p>
      </div>
    </div>
  );
};

export default Register;
