// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Phone, Mail, LogOut, Star, CreditCard } from 'lucide-react';

const Profile = () => {
const { user, saveUser, logoutUser, isLoggedIn, markLoggedIn, deleteAccount } =
  useUser();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isSaving, setIsSaving] = useState(false);

  // If no user, force login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Name cannot be empty.');
      return;
    }

    setIsSaving(true);
    saveUser({
      name: name.trim(),
      email: email.trim() || null,
      phone: phone, // saveUser will normalize it
    });
    setTimeout(() => {
      setIsSaving(false);
      alert('Profile updated successfully.');
    }, 300);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        'This will remove your saved details from this device. Continue?'
      )
    ) {
      logoutUser(); // already clears localStorage
      navigate('/');
    }
  };

  const shortPhone =
    user.phone && user.phone.length === 10 ? `+91 ${user.phone}` : user.phone;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[2.5fr,1fr] gap-8">
        {/* Left: main profile card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header with avatar and name */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-md">
              <UserIcon className="text-white w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {user.name || 'Your Name'}
              </h2>
              <p className="text-gray-500 text-sm">{shortPhone}</p>
            </div>
          </div>

          {/* Basic details form */}
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
                  className="w-full pl-9 pr-3 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Full Name"
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
                  value={email || ''}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Email (optional)"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                PHONE
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                  }
                  maxLength={10}
                  className="w-full pl-9 pr-3 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="10-digit number"
                />
              </div>
              <p className="mt-1 text-[11px] text-gray-500">
                This is your primary login number. It will be normalized to 10 digits.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-50"
              >
                Remove Account
              </button>
            </div>
          </form>

          {/* Optional extra sections like "Change phone" / "Change password" */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-5 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                CHANGE PHONE NUMBER
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                For now, you can edit your phone number directly above and save changes.
              </p>
              <button
                disabled
                className="w-full py-2 text-xs rounded-md bg-gray-300 text-gray-600 cursor-not-allowed"
              >
                Send OTP (Coming soon)
              </button>
            </div>

            <div className="border rounded-xl p-5 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                CHANGE PASSWORD
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Login is currently OTP-free and based only on your phone number.
              </p>
              <button
                disabled
                className="w-full py-2 text-xs rounded-md bg-purple-600 text-white opacity-70 cursor-not-allowed"
              >
                Send OTP (Disabled)
              </button>
            </div>
          </div>
        </div>

        {/* Right: side navigation */}
        <aside className="bg-white rounded-2xl shadow-lg p-6 h-fit">
          <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
            My Account
          </h3>
          <nav className="space-y-2 text-sm">
            <button
              type="button"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-left"
              onClick={() => alert('Transactions page coming soon.')}
            >
              <CreditCard className="w-4 h-4 text-indigo-500" />
              <span>My Transactions</span>
            </button>

            <button
              type="button"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-left"
              onClick={() => alert('Reviews page coming soon.')}
            >
              <Star className="w-4 h-4 text-yellow-500" />
              <span>My Reviews</span>
            </button>

            <button
              type="button"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-left mt-4"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span className="text-red-600 font-semibold">Logout</span>
            </button>
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default Profile;


