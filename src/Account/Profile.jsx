// Profile — data from MongoDB via API; Context mirrors server after PATCH /me
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Phone, Mail, LogOut, Star, CreditCard } from 'lucide-react';

const Profile = () => {
  const { user, saveUser, logoutUser, authLoading, isLoggedIn, deleteAccount } =
    useUser();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneDisplay, setPhoneDisplay] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [authLoading, isLoggedIn, navigate]);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhoneDisplay(user.phone || '');
    }
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-28 flex justify-center">
        <div className="text-gray-600 text-sm">Loading profile…</div>
      </div>
    );
  }

  if (!user) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveError('');
    if (!name.trim()) {
      alert('Name cannot be empty.');
      return;
    }

    setIsSaving(true);
    const result = await saveUser({
      name: name.trim(),
      email: email.trim() === '' ? '' : email.trim(),
    });
    setIsSaving(false);
    if (result.ok) {
      alert('Profile saved on the server.');
    } else {
      setSaveError(result.error || 'Could not save.');
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        'This will sign you out on this device. Your account remains in the database until you add a delete-account API.'
      )
    ) {
      deleteAccount();
      navigate('/');
    }
  };

  const shortPhone =
    user.phone && user.phone.length === 10 ? `+91 ${user.phone}` : user.phone;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-8">
        {/* Sidebar — Housing-style */}
        <aside className="bg-white rounded-2xl shadow-lg p-6 h-fit border border-gray-100">
          <div className="flex flex-col items-center text-center mb-8 pb-6 border-b border-gray-100">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#5e23dc] to-indigo-600 flex items-center justify-center shadow-lg mb-3">
              <UserIcon className="text-white w-12 h-12" />
            </div>
            <p className="font-semibold text-gray-900 text-lg">{user.name || 'User'}</p>
            <p className="text-xs text-gray-500 mt-1">{shortPhone}</p>
          </div>
          <nav className="space-y-1 text-sm">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-violet-50 text-[#5e23dc] font-semibold border-l-4 border-[#5e23dc]">
              <UserIcon className="w-4 h-4" />
              Edit Profile
            </div>
            <button
              type="button"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-left text-gray-700"
              onClick={() => alert('Transactions page coming soon.')}
            >
              <CreditCard className="w-4 h-4 text-[#5e23dc]" />
              My Transactions
            </button>
            <button
              type="button"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-left text-gray-700"
              onClick={() => alert('Reviews page coming soon.')}
            >
              <Star className="w-4 h-4 text-amber-500" />
              My Reviews
            </button>
            <button
              type="button"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 text-left text-red-600 font-semibold mt-4"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </nav>
        </aside>

        {/* Main */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h1 className="text-xl font-bold text-gray-900 mb-6">Edit profile</h1>
            <p className="text-xs text-gray-500 mb-6">
              Name and email are stored in MongoDB. Sign-in uses your mobile OTP — phone
              change will use OTP later.
            </p>

            {saveError && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                {saveError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  NAME
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 border rounded-md focus:ring-2 focus:ring-[#5e23dc] focus:border-[#5e23dc] text-sm"
                    placeholder="Full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  EMAIL
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 border rounded-md focus:ring-2 focus:ring-[#5e23dc] focus:border-[#5e23dc] text-sm"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  PHONE (login number)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    readOnly
                    value={phoneDisplay}
                    className="w-full pl-9 pr-3 py-3 border rounded-md bg-gray-50 text-sm text-gray-700"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-[#5e23dc] text-white px-6 py-2 rounded-md text-sm font-semibold hover:opacity-90 disabled:bg-gray-400"
                >
                  {isSaving ? 'Saving…' : 'Save changes'}
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-50"
                >
                  Sign out on this device
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-5 bg-white shadow-sm border-gray-200">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Change phone number
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Will use OTP to verify a new number (backend endpoint coming next).
              </p>
              <button
                type="button"
                disabled
                className="w-full py-2 text-xs rounded-md bg-gray-200 text-gray-600 cursor-not-allowed"
              >
                Send OTP
              </button>
            </div>
            <div className="border rounded-xl p-5 bg-white shadow-sm border-gray-200">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Security
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                You sign in with a one-time code sent to your registered mobile (see
                backend console in development).
              </p>
              <button
                type="button"
                disabled
                className="w-full py-2 text-xs rounded-md bg-[#5e23dc]/40 text-white cursor-not-allowed"
              >
                Send OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
