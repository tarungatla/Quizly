
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt, FaLayerGroup, FaPlus, FaQuestion, FaQuestionCircle, FaUserGraduate } from 'react-icons/fa';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <div className="text-xl text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl border-r border-gray-200">
        <nav className="pt-6 px-4 space-y-2">


          <div className="pt-4 pb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">Management</p>
          </div>
          
          <Link 
            to="/admin/categories" 
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 group"
          >
            <FaLayerGroup className="text-lg group-hover:scale-110 transition-transform" /> 
            <span className="font-medium">View Categories</span>
          </Link>
          
          <Link 
            to="/admin/add-category" 
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 hover:text-green-700 transition-all duration-200 group"
          >
            <FaLayerGroup className="text-lg group-hover:scale-110 transition-transform" /> 
            <span className="font-medium">Add Category</span>
          </Link>
          
          <Link 
            to="/admin/add-quiz" 
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
          >
            <FaQuestion className="text-lg group-hover:scale-110 transition-transform" /> 
            <span className="font-medium">Add Quiz</span>
          </Link>
          
          <div className="pt-6 mt-6 border-t border-gray-200">
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 w-full text-left group"
            >
              <FaSignOutAlt className="text-lg group-hover:scale-110 transition-transform" /> 
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Profile</h1>
            <p className="text-gray-600 mt-1">Manage your account and system settings</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              Welcome back, <span className="font-semibold text-gray-700">{user.username}</span>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{user.firstName?.[0]?.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="Profile"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold">{`${user.firstName} ${user.lastName || ''}`}</h2>
                <p className="text-indigo-100 text-sm">
                  {user.userRoles?.[0]?.role?.roleName || 'ADMIN'}
                </p>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Profile Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FaUser className="mr-2 text-indigo-600" />
                  Profile Information
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Username</span>
                    <span className="text-gray-800 font-semibold">{user.username}</span>
                  </div>


                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Role</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {user.userRoles?.[0]?.role?.roleName || 'ADMIN'}
                    </span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-gray-600 font-medium">Status</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ● ACTIVE
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FaQuestionCircle className="mr-2 text-indigo-600" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link 
                    to="/admin/add-category"
                    className="block p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-200 border border-green-200 hover:border-green-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <FaLayerGroup className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-800">Add Category</p>
                        <p className="text-sm text-green-600">Create new quiz categories</p>
                      </div>
                    </div>
                  </Link>

                  <Link 
                    to="/admin/add-quiz"
                    className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 border border-blue-200 hover:border-blue-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <FaQuestion className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-blue-800">Add Quiz</p>
                        <p className="text-sm text-blue-600">Create new quizzes</p>
                      </div>
                    </div>
                  </Link>

  
                </div>
              </div>
            </div>


          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;