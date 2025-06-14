import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
          <Link 
            to={
              token 
                ? (user?.username === 'tarun_gatla' || user === 'tarun_gatla') 
                  ? "/admin" 
                  : "/dashboard"
                : "/login"
            } 
            className="flex items-center"
          >
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-indigo-600">Quizly</h1>
            </div>
          </Link>
          </div>



          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {token ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 text-sm font-medium">
                  Welcome, {user?.firstName || user?.username || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (you can add state management for this if needed) */}
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Link>
              {(user?.username === 'tarun_gatla' || user === 'tarun_gatla') && (
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Admin Panel
                </Link>
              )}
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center px-3">
                  <div className="text-base font-medium leading-none text-gray-800">
                    {user?.firstName || user?.username || 'User'}
                  </div>
                </div>
                <div className="mt-3 px-3">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-gray-700 hover:text-indigo-600 block px-0 py-2 rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;