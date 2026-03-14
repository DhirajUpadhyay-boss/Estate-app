// Register.jsx
import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext.jsx';
import { Mail, User as UserIcon, Shield } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { users, saveUser, loginUser } = useUser();

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Helper: validate name – first uppercase, at least 3 letters, letters only
  const isValidName = (value) => /^[A-Z][a-zA-Z]{2,}$/.test(value.trim());

  // Restore state from navigation (including accepted terms from /legal)
  useEffect(() => {
    const state = location.state || {};

    if (typeof state.name === 'string') setName(state.name);
    if (typeof state.email === 'string') setEmail(state.email);

    const acceptedFlag = state.termsAccepted === true || state.accepted === true;
    if (acceptedFlag) setTermsAccepted(true);

    if (state.step === 3 || state.fromStep === 3 || acceptedFlag) {
      setStep(3);
    } else if (state.step === 2 || state.fromStep === 2) {
      setStep(2);
    } else {
      setStep(1);
    }
  }, [location.state]);

  // Send Code (mock: generate and log to console)
  const sendCode = () => {
    alert('Code is generated, click F12 to see it in the console.');
    setError('');

    if (!isValidName(name)) {
      setError('Name must start with an uppercase letter and contain at least 3 letters (e.g. "Ram").');
      return;
    }

    const normalizedEmail = email.toLowerCase();
    if (!normalizedEmail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError('Please enter a valid email address.');
      return;
    }

    const existingUser = users.find(u => u.email === normalizedEmail);
    if (existingUser) {
      alert('✅ Already registered. Redirecting to login!');
      navigate('/login', { state: { email: normalizedEmail } });
      return;
    }

    setLoading(true);

    const mockCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(mockCode);
    console.log(`Generated verification code for ${normalizedEmail}: ${mockCode}`);

    setStep(2);
    setLoading(false);
    setError('');
  };

  // Verify Code (check against generated one)
  const verifyCode = () => {
    setError('');

    if (!generatedCode) {
      setError('Please request a new code.');
      return;
    }

    const cleanedCode = code.replace(/\D/g, '').slice(0, 6);

    if (cleanedCode.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);

    if (cleanedCode === generatedCode) {
      alert('✅ Code verified successfully.');
      setStep(3);
      setLoading(false);
      setError('');
    } else {
      setError('Incorrect code. Please try again.');
      setCode('');
      setLoading(false);
    }
  };

  // Navigate to legal page – the ONLY place that can mark termsAccepted = true
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

  // Complete Registration
  const register = () => {
    setError('');

    if (!isValidName(name)) {
      setError(
        'Name must start with an uppercase letter and contain at least 3 letters (e.g. "Ram").'
      );
      return;
    }

    if (!termsAccepted) {
      setError('You must accept the Terms & Conditions and Privacy Policy');
      return;
    }

    const newUser = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      // Add more fields if needed
    };

    console.log('👤 Register: saving user via context:', newUser);
    saveUser(newUser); // this writes to localStorage in UserContext and activates session

    alert('✅ Registration Successful!');
    navigate('/projects', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome!</h1>
          <p className="text-gray-600">Register for your dream property</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-8">
            {[1, 2, 3].map((i) => (
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
                    {['Details', 'Verify', 'Terms'][i - 1]}
                  </p>
                </div>
                {i < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      step > i ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Step 1: Name & Email */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Enter Details</h2>
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
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:border-blue-500 outline-none"
                />
              </div>
              <button
                onClick={sendCode}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? 'Sending Code...' : 'Send Code'}
              </button>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                  Login
                </Link>
              </p>
            </div>
          )}

          {/* Step 2: Code Verification */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Verify Code</h2>
                <p className="text-gray-600 text-sm">
                  Check console for code sent to {email}
                </p>
              </div>
              <div className="relative">
                <Shield className="absolute left-4 top-4 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Enter 6-digit Code"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, '').slice(0, 6))
                  }
                  maxLength={6}
                  className="w-full pl-12 pr-4 py-4 border-2 rounded-xl text-center text-2xl tracking-widest focus:border-blue-500 outline-none"
                />
              </div>
              <button
                onClick={verifyCode}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
              <div className="flex justify-between text-sm">
                <button
                  onClick={() => {
                    setGeneratedCode(null);
                    sendCode();
                  }}
                  disabled={loading}
                  className="text-blue-600 hover:underline disabled:text-gray-400"
                >
                  Resend Code
                </button>
                <button
                  onClick={() => {
                    setStep(1);
                    setCode('');
                    setGeneratedCode(null);
                  }}
                  className="text-gray-600 hover:underline"
                >
                  Change Details
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Terms */}
          {step === 3 && (
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
                onClick={register}
                disabled={!termsAccepted}
                className={`w-full py-5 rounded-xl font-bold text-xl transition-all shadow-lg ${
                  termsAccepted
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 cursor-pointer'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                Complete Registration
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          Your information is secure and encrypted
        </div>
      </div>
    </div>
  );
};

export default Register;