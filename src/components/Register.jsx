// Register.jsx
import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext.jsx';
import api from '../lib/api';
import { Mail, User as UserIcon } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, setAuthSession } = useUser();

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidName = (value) => /^[A-Z][a-zA-Z]{2,}$/.test(value.trim());

  useEffect(() => {
    const state = location.state || {};

    if (typeof state.name === 'string') setName(state.name);
    if (typeof state.email === 'string') setEmail(state.email);

    const acceptedFlag = state.termsAccepted === true || state.accepted === true;
    if (acceptedFlag) setTermsAccepted(true);

    if (state.step === 3 || state.fromStep === 3 || acceptedFlag) {
      setStep(2);
    } else if (state.step === 2 || state.fromStep === 2) {
      setStep(2);
    } else {
      setStep(1);
    }
  }, [location.state]);

  const goToStep2 = () => {
    setError('');

    if (!isValidName(name)) {
      setError('Name must start with an uppercase letter and contain at least 3 letters (e.g. "Ram").');
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!normalizedEmail.match(/^[\w.-]+@gmail\.com$/)) {
      setError('Please enter the Gmail correctly (e.g. user@gmail.com)');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (currentUser && currentUser.email === normalizedEmail) {
      alert('Already signed in with this email. Go to Login.');
      navigate('/login', { state: { email: normalizedEmail } });
      return;
    }

    setStep(2);
  };

  const goToLegal = () => {
    navigate('/legal', {
      state: {
        fromStep: 3,
        name,
        email,
        termsAccepted,
      },
    });
  };

  const completeRegistration = async () => {
    setError('');

    if (!termsAccepted) {
      setError('You must accept the Terms & Conditions and Privacy Policy');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/register', {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
      });
      setAuthSession({ user: data.user, token: data.token });
      alert('Registration successful!');
      navigate('/projects', { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Registration failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome!</h1>
          <p className="text-gray-600">Register for your dream property</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            {[1, 2].map((i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      step >= i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {i}
                  </div>
                  <p className="text-xs mt-2 text-gray-600">
                    {['Account', 'Terms'][i - 1]}
                  </p>
                </div>
                {i < 2 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      step > i ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Create account</h2>
              <div className="relative">
                <UserIcon className="absolute left-4 top-4 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Full Name * (e.g. Ram)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:border-blue-500 outline-none"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Email * (e.g. user@gmail.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:border-blue-500 outline-none"
                />
              </div>
              <input
                type="password"
                placeholder="Password * (min 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 border-2 rounded-xl focus:border-blue-500 outline-none"
              />
              <input
                type="password"
                placeholder="Confirm password *"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-4 border-2 rounded-xl focus:border-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={goToStep2}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition cursor-pointer"
              >
                Continue
              </button>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                  Login
                </Link>
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Accept Terms</h2>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <label className="flex items-start gap-4 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    readOnly
                    onClick={() => {
                      if (!termsAccepted) goToLegal();
                    }}
                    className="mt-1 w-6 h-6 text-blue-600 rounded-lg border-2"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    I have read and agree to the{' '}
                    <button
                      type="button"
                      onClick={goToLegal}
                      className="font-bold text-blue-600 hover:underline"
                    >
                      Terms &amp; Conditions and Privacy Policy
                    </button>
                    {termsAccepted && (
                      <span className="ml-2 text-green-600 font-bold">✓ Accepted</span>
                    )}
                  </span>
                </label>
              </div>

              <button
                type="button"
                onClick={completeRegistration}
                disabled={!termsAccepted || loading}
                className={`w-full py-5 rounded-xl font-bold text-xl transition-all shadow-lg ${
                  termsAccepted && !loading
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 cursor-pointer'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                {loading ? 'Creating account...' : 'Complete Registration'}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-blue-600 py-2 text-sm font-semibold hover:underline"
              >
                Back to account details
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          Passwords are hashed on the server; use a strong password.
        </div>
      </div>
    </div>
  );
};

export default Register;
