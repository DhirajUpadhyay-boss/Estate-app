// Register.jsx — two steps: (1) verify phone with OTP, (2) name, email, terms, complete
import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext.jsx';
import api from '../lib/api';
import { Mail, User as UserIcon, Phone, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const { currentUser, setAuthSession, isLoggedIn, authLoading } = useUser();

  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidName = (value) => /^[A-Z][a-zA-Z]{2,}$/.test(value.trim());

  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      navigate('/profile', { replace: true });
    }
  }, [authLoading, isLoggedIn, navigate]);

  const normalizedPhone = phone.replace(/\D/g, '').slice(0, 10);

  const sendOtp = async () => {
    setError('');
    if (normalizedPhone.length !== 10) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }
    if (currentUser?.phone === normalizedPhone) {
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/auth/register/send-otp', { phone: normalizedPhone });
      setOtpSent(true);
      setPhone(normalizedPhone);
      alert('OTP sent. Check your backend terminal (development).');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.friendlyMessage ||
          err.message ||
          'Failed to send OTP'
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpAndContinue = async (e) => {
    e.preventDefault();
    setError('');
    if (!otpSent) {
      setError('Send OTP first.');
      return;
    }
    if (otp.replace(/\D/g, '').length !== 6) {
      setError('Enter the 6-digit OTP.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/auth/register/verify-otp', {
        phone: normalizedPhone,
        code: otp.replace(/\D/g, '').slice(0, 6),
      });
      setStep(2);
      setError('');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.friendlyMessage ||
          err.message ||
          'Verification failed'
      );
    } finally {
      setLoading(false);
    }
  };

  const completeRegistration = async (e) => {
    e.preventDefault();
    setError('');
    if (!isValidName(name)) {
      setError('Name must start with a capital letter and be at least 3 letters (e.g. Ram).');
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email or leave it empty.');
      return;
    }
    if (!termsAccepted) {
      setError('Please accept the Terms & Conditions and Privacy Policy.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/register/complete', {
        phone: normalizedPhone,
        name: name.trim(),
        email: email.trim() || undefined,
        termsAccepted: true,
      });
      setAuthSession({ user: data.user, token: data.token });
      navigate('/profile', { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.friendlyMessage ||
          err.message ||
          'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  const goBackToStep1 = () => {
    setStep(1);
    setOtp('');
    setOtpSent(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 pt-24">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create account</h1>
          <p className="text-gray-600">
            {step === 1 ? 'Step 1 of 2 — verify your mobile' : 'Step 2 of 2 — your details'}
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex justify-center gap-2 mb-6">
          <div
            className={`h-2 flex-1 max-w-[120px] rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`}
          />
          <div
            className={`h-2 flex-1 max-w-[120px] rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        {step === 1 && (
          <form
            onSubmit={verifyOtpAndContinue}
            className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
          >
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Phone className="w-5 h-5" /> Verify mobile number
            </h2>
            <div className="flex gap-2">
              <input
                type="tel"
                placeholder="10-digit mobile"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="flex-1 px-4 py-3 border-2 rounded-xl focus:border-blue-500 outline-none"
                maxLength={10}
              />
              <button
                type="button"
                onClick={sendOtp}
                disabled={loading}
                className="shrink-0 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:bg-gray-400"
              >
                Send OTP
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              className="w-full px-4 py-3 border-2 rounded-xl text-center text-xl tracking-widest focus:border-blue-500 outline-none"
            />
            {otpSent && (
              <p className="text-xs text-gray-500">
                OTP is printed in the backend terminal (development only).
              </p>
            )}
            <button
              type="submit"
              disabled={loading || !otpSent}
              className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify & continue'}
            </button>
            <p className="text-center text-sm text-gray-600">
              Already registered?{' '}
              <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={completeRegistration}
            className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
          >
            <p className="text-sm text-gray-600">
              Verified: <span className="font-semibold">+91 {normalizedPhone}</span>
            </p>

            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <UserIcon className="w-5 h-5" /> Your details
            </h2>
            <input
              type="text"
              placeholder="Full name * (e.g. Ram)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 outline-none"
            />
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="Gmail / email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:border-blue-500 outline-none"
              />
            </div>

            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 pt-2">
              <Shield className="w-5 h-5" /> Terms
            </h2>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600"
              />
              <span className="text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/legal" className="text-blue-600 font-semibold underline">
                  Terms &amp; Conditions and Privacy Policy
                </Link>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 disabled:bg-gray-300"
            >
              {loading ? 'Creating account...' : 'Complete registration'}
            </button>

            <button
              type="button"
              onClick={goBackToStep1}
              className="w-full text-blue-600 text-sm font-semibold py-2 hover:underline"
            >
              ← Back to phone verification
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-xs text-gray-500">
          If verification expires (15 min), go back to step 1 and request a new OTP.
        </p>
      </div>
    </div>
  );
};

export default Register;
