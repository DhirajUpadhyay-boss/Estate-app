// Login.jsx
import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { users, loginUser, isLoggedIn } = useUser();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/projects');
    }
  }, [isLoggedIn, navigate]);

  // Send verification code – check if email is registered
  const handleSendCode = (e) => {
    e.preventDefault();
    setError('');

    const normalizedEmail = email.toLowerCase();
    if (!normalizedEmail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError('Please enter a valid email address.');
      return;
    }

    const matchedUser = users.find(u => u.email === normalizedEmail);

    if (!matchedUser) {
      console.log('Login: no matching user found');
      alert('❌ You are not registered');
      navigate('/register', { state: { email: normalizedEmail } });
      return;
    }

    console.log('Login debug -> input:', normalizedEmail, 'matched user:', matchedUser);

    setLoading(true);
    const codeValue = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(codeValue);
    console.log(`Login verification code for ${normalizedEmail}: ${codeValue}`);

    setShowCodeInput(true);
    setLoading(false);
    alert('✅ Verification code sent! Check the browser console (F12).');
  };

  // Verify code
  const handleVerifyCode = (e) => {
    e.preventDefault();
    setError('');

    if (!generatedCode) {
      setError('Please request a new code first.');
      return;
    }

    const cleanedCode = code.replace(/\D/g, '').slice(0, 6);
    if (cleanedCode.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);

    if (cleanedCode !== generatedCode) {
      setError('Incorrect code. Please try again.');
      setLoading(false);
      return;
    }

    const normalizedEmail = email.toLowerCase();
    const matchedUser = users.find(u => u.email === normalizedEmail);

    if (matchedUser) {
      loginUser(matchedUser);
      alert('✅ Login successful!');
      navigate('/projects');
    } else {
      setError('User not found. Please register again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome back!</h1>
          <p className="text-gray-600">
            {showCodeInput
              ? 'Enter the verification code sent to your email'
              : 'Login with your registered email'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!showCodeInput ? (
            <form onSubmit={handleSendCode} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? 'Sending Code...' : 'Send Code'}
              </button>

              <p className="text-center text-sm text-gray-600">
                New here?{' '}
                <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                  Register
                </Link>
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter Code
                </label>
                <p className="text-sm text-gray-500 mb-3">Check the console for the code</p>
                <input
                  type="text"
                  placeholder="123456"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, '').slice(0, 6))
                  }
                  maxLength={6}
                  className="w-full px-4 py-4 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-center text-2xl tracking-widest"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowCodeInput(false);
                  setCode('');
                  setError('');
                  setGeneratedCode(null);
                }}
                className="w-full bg-transparent text-blue-600 py-3 rounded-xl font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
              >
                Change Email
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          Secure access with email verification
        </div>
      </div>
    </div>
  );
};

export default Login;