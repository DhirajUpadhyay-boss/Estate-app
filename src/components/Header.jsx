// Navbar.jsx (Header)
import { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx'; // ✅ EXPLICIT .jsx extension
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showTrendsDropdown, setShowTrendsDropdown] = useState(false);
  const { currentUser: user, isLoggedIn, logoutUser, authLoading } = useUser();
  const location = useLocation();

  // Close Property Trends dropdown whenever route changes
  useEffect(() => {
    setShowTrendsDropdown(false);
  }, [location.pathname]);
  

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileMenu]);

  const firstLetter = user?.name?.trim()?.[0]?.toUpperCase() || 'U';

  const isTrendsActive = location.pathname.startsWith('/property-trends');
  const trendsLinkBase =
    'cursor-pointer transition-all duration-200 text-base lg:text-lg flex items-center';
  const trendsLinkClasses = isTrendsActive
    ? `${trendsLinkBase} text-yellow-300 font-bold`
    : `${trendsLinkBase} text-white hover:text-yellow-200`;

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-900 via-gray-900 to-black shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center py-4 px-4 sm:px-6 md:px-10 lg:px-20">
        {/* Logo */}
        <Link to="/" className="mr-10 md:mr-16">
          <img
            src={assets.logo}
            alt="Estate Logo"
            className="w-32 sm:w-36 md:w-40 transition-transform hover:scale-105"
          />
        </Link>

        {/* Center navigation + right controls (desktop) */}
        <div className="flex-1 flex justify-center">
          <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-10">
            {/* Main nav */}
            <ul className="flex flex-col md:flex-row gap-4 lg:gap-8 text-white font-semibold items-center">
              {/* Home */}
              <li>
                <NavLink
                  to="/" // this to link automatically tells is {isActive} the user is active on / route(Home)
                  className={({ isActive }) =>
                    `cursor-pointer transition-all duration-200 text-base lg:text-lg ${
                      isActive
                        ? 'text-yellow-300 font-bold'
                        : 'text-white hover:text-yellow-200'
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>

              {/* Property Trends — dropdown trigger on all desktop sizes */}
              <li className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setShowTrendsDropdown((prev) => !prev)
                  }
                  className={trendsLinkClasses}
                >
                  Property Trends
                  <span className="ml-1 text-xs">
                    {showTrendsDropdown ? '▴' : '▾'}
                  </span>
                </button>

                {showTrendsDropdown && (
                  <div className="absolute left-0 top-full mt-2 w-56 bg-white text-gray-800 rounded-md shadow-lg z-50">
                    <NavLink
                      to="/Markets"
                      onClick={() => setShowTrendsDropdown(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm ${
                          isActive
                            ? 'bg-purple-50 text-purple-700 font-semibold'
                            : 'hover:bg-purple-50 hover:text-purple-700'
                        }`
                      }
                    >
                      Market Trends
                    </NavLink>
                    <NavLink
                      to="/CurrentNews"
                      onClick={() => setShowTrendsDropdown(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm ${
                          isActive
                            ? 'bg-purple-50 text-purple-700 font-semibold'
                            : 'hover:bg-purple-50 hover:text-purple-700'
                        }`
                      }
                    >
                      Current News
                    </NavLink>
                    <NavLink
                      to="/Locality"
                      onClick={() => setShowTrendsDropdown(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm ${
                          isActive
                            ? 'bg-purple-50 text-purple-700 font-semibold'
                            : 'hover:bg-purple-50 hover:text-purple-700'
                        }`
                      }
                    >
                      Locality-Trends
                    </NavLink>
                    <NavLink
                      to="/Budget2024"
                      onClick={() => setShowTrendsDropdown(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm ${
                          isActive
                            ? 'bg-purple-50 text-purple-700 font-semibold'
                            : 'hover:bg-purple-50 hover:text-purple-700'
                        }`
                      }
                    >
                      Budget 2025
                    </NavLink>
                    
                    
                   
                  </div>
                )}
              </li>

              {/* Projects */}
              <li>
                <NavLink
                  to="/projects"
                  className={({ isActive }) =>
                    `cursor-pointer transition-all duration-200 text-base lg:text-lg ${
                      isActive
                        ? 'text-yellow-300 font-bold'
                        : 'text-white hover:text-yellow-200'
                    }`
                  }
                >
                  Projects
                </NavLink>
              </li>

              {/* Testimonials */}
              <li>
                <NavLink
                  to="/testimonials"
                  className={({ isActive }) =>
                    `cursor-pointer transition-all duration-200 text-base lg:text-lg ${
                      isActive
                        ? 'text-yellow-300 font-bold'
                        : 'text-white hover:text-yellow-200'
                    }`
                  }
                >
                  Testimonials
                </NavLink>
              </li>
            </ul>

            {/* Right side: Login/Register or Profile chip */}
            <div className="flex items-center gap-4 mt-4 md:mt-0 min-h-[44px]">
              {authLoading && (
                <div
                  className="w-10 h-10 rounded-full bg-white/20 animate-pulse"
                  aria-hidden
                />
              )}
              {!authLoading && !isLoggedIn && (
                <>
                  <Link to="/login">
                    <button className="cursor-pointer bg-transparent border border-yellow-400 text-yellow-400 px-6 lg:px-8 py-2 rounded-full font-bold hover:bg-yellow-400 hover:text-gray-900 transition-all duration-200 text-base lg:text-lg shadow-md">
                      Login
                    </button>
                  </Link>

                  <Link to="/register">
                    <button className="cursor-pointer bg-yellow-400 text-gray-900 px-6 lg:px-8 py-2 rounded-full font-bold hover:bg-yellow-300 transition-all duration-200 text-base lg:text-lg shadow-md">
                      Register
                    </button>
                  </Link>
                </>
              )}
              {!authLoading && isLoggedIn && user && (
                <Link
                  to="/profile"
                  className="flex items-center bg-white rounded-full px-3 py-1 shadow-md cursor-pointer hover:shadow-lg transition-all"
                >
                  <Menu className="w-4 h-4 text-gray-500 mr-2" />
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-2">
                    <span className="text-white text-sm font-semibold">
                      {firstLetter}
                    </span>
                  </div>
                  <div className="flex flex-col leading-tight mr-1">
                    <span className="text-xs text-gray-400">
                      Logged in as
                    </span>
                    <span className="text-sm font-semibold text-gray-800 truncate max-w-[110px]">
                      {user.name || 'User'}
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMobileMenu(true)}
          src={assets.menu_icon}
          className="md:hidden w-8 cursor-pointer hover:opacity-80 transition-opacity mt-4"
          alt="menu"
        />
      </div>

      {/* Mobile slide-out menu */}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 transition-all duration-500 z-50 ${
          showMobileMenu ? 'w-64' : 'w-0'
        }`}
      >
        <div className="flex justify-end p-6">
          <img
            onClick={() => setShowMobileMenu(false)}
            src={assets.cross_icon}
            className="w-7 cursor-pointer hover:opacity-80 transition-opacity"
            alt="close"
          />
        </div>
        <ul className="flex flex-col items-center gap-5 mt-6 px-5 text-lg font-semibold text-white">
          <li className="w-full">
            <NavLink
              onClick={() => setShowMobileMenu(false)}
              to="/"
              className={({ isActive }) =>
                `px-5 py-2 rounded-lg block text-center ${
                  isActive ? 'bg-yellow-300 text-gray-900' : 'hover:bg-gray-700'
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              onClick={() => setShowMobileMenu(false)}
              to="/property-trends/market-trends"
              className={({ isActive }) =>
                `px-5 py-2 rounded-lg block text-center ${
                  isActive ? 'bg-yellow-300 text-gray-900' : 'hover:bg-gray-700'
                }`
              }
            >
              Property Trends
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              onClick={() => setShowMobileMenu(false)}
              to="/projects"
              className={({ isActive }) =>
                `px-5 py-2 rounded-lg block text-center ${
                  isActive ? 'bg-yellow-300 text-gray-900' : 'hover:bg-gray-700'
                }`
              }
            >
              Projects
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              onClick={() => setShowMobileMenu(false)}
              to="/testimonials"
              className={({ isActive }) =>
                `px-5 py-2 rounded-lg block text-center ${
                  isActive ? 'bg-yellow-300 text-gray-900' : 'hover:bg-gray-700'
                }`
              }
            >
              Testimonials
            </NavLink>
          </li>

          {!authLoading && !isLoggedIn && (
            <>
              <li className="w-full">
                <NavLink
                  onClick={() => setShowMobileMenu(false)}
                  to="/login"
                  className={({ isActive }) =>
                    `px-5 py-2 rounded-lg block text-center ${
                      isActive
                        ? 'bg-yellow-300 text-gray-900'
                        : 'hover:bg-gray-700'
                    }`
                  }
                >
                  Login
                </NavLink>
              </li>
              <li className="w-full">
                <NavLink
                  onClick={() => setShowMobileMenu(false)}
                  to="/register"
                  className={({ isActive }) =>
                    `px-5 py-2 rounded-lg block text-center ${
                      isActive
                        ? 'bg-yellow-300 text-gray-900'
                        : 'hover:bg-gray-700'
                    }`
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          )}

          {!authLoading && isLoggedIn && user && (
            <li className="w-full">
              <NavLink
                onClick={() => setShowMobileMenu(false)}
                to="/profile"
                className={({ isActive }) =>
                  `px-5 py-2 rounded-lg block text-center ${
                    isActive ? 'bg-yellow-300 text-gray-900' : 'hover:bg-gray-700'
                  }`
                }
              >
                My Profile
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {showMobileMenu && (
        <div
          onClick={() => setShowMobileMenu(false)}
          className="md:hidden fixed inset-0 bg-black bg-opacity-60 z-40"
        />
      )}
    </div>
  );
};

export default Navbar;