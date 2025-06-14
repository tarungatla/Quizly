import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddCategory from './components/admin/AddCategory';
import AddQuiz from './components/admin/AddQuiz';
import AddQuestion from './components/admin/AddQuestion';
import UserDashboard from './components/user/UserDashboard';
import { TakeQuiz } from './components/TakeQuiz';
import { ViewCategories, CategoryQuizzes, QuizQuestions } from './components/ViewCategories';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

// Component to conditionally render navbar
const AppContent = () => {
  const location = useLocation();
  
  // Show navbar on all pages (remove this line if you want to hide it on specific pages)
  const hideNavbar = false;

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz/:quizId"
          element={
            <PrivateRoute>
              <TakeQuiz />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        
        {/* Category Management Routes */}
        <Route
          path="/admin/categories"
          element={
            <PrivateRoute>
              <ViewCategories />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/category/:categoryId/quizzes"
          element={
            <PrivateRoute>
              <CategoryQuizzes />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/quiz/:quizId/questions"
          element={
            <PrivateRoute>
              <QuizQuestions />
            </PrivateRoute>
          }
        />
        
        {/* Original Admin Routes */}
        <Route
          path="/admin/add-category"
          element={
            <PrivateRoute>
              <AddCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-quiz"
          element={
            <PrivateRoute>
              <AddQuiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-question/:quizId"
          element={
            <PrivateRoute>
              <AddQuestion />
            </PrivateRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;