// Login.jsx — phone + OTP only
import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';
import api from '../lib/api';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginUser, isLoggedIn, authLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      navigate('/profile');
    }
  }, [authLoading, isLoggedIn, navigate]);

  const sendOtp = async (e) => {
    e.preventDefault();
    setError('');
    const digits = phone.replace(/\D/g, '').slice(0, 10);
    if (digits.length !== 10) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/auth/login/send-otp', { phone: digits });
      setPhone(digits);
      setOtpSent(true);
      alert('OTP sent. Check your backend terminal (development).');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.friendlyMessage ||
        err.message ||
        'Failed to send OTP';
      setError(msg);
      if (err.response?.status === 404) {
        setError(`${msg} You can create an account on Register.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    const code = otp.replace(/\D/g, '').slice(0, 6);
    if (code.length !== 6) {
      setError('Enter the 6-digit OTP.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/login/verify-otp', {
        phone: phone.replace(/\D/g, '').slice(0, 10),
        code,
      });
      loginUser(data.user, data.token);
      navigate('/profile', { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.friendlyMessage ||
          err.message ||
          'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 pt-24">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in with your registered mobile number</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={sendOtp} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 text-gray-400" size={20} />
                  <input
                    type="tel"
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:border-blue-500 outline-none"
                    maxLength={10}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={verifyOtp} className="space-y-6">
              <p className="text-sm text-gray-600">
                OTP sent to <span className="font-semibold">+91 {phone}</span>
              </p>
              <input
                type="text"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="w-full px-4 py-4 border-2 rounded-xl text-center text-2xl tracking-widest focus:border-blue-500 outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Verifying...' : 'Verify & Sign in'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp('');
                  setError('');
                }}
                className="w-full text-blue-600 text-sm font-semibold"
              >
                Change number
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-600">
            New user?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
