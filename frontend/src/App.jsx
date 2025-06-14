import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminLayout from './components/admin/AdminLayout';
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

const AdminRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" />;
  return <AdminLayout>{children}</AdminLayout>;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
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
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          
          {/* Category Management Routes */}
          <Route
            path="/admin/categories"
            element={
              <AdminRoute>
                <ViewCategories />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/category/:categoryId/quizzes"
            element={
              <AdminRoute>
                <CategoryQuizzes />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/quiz/:quizId/questions"
            element={
              <AdminRoute>
                <QuizQuestions />
              </AdminRoute>
            }
          />
          
          {/* Original Admin Routes */}
          <Route
            path="/admin/add-category"
            element={
              <AdminRoute>
                <AddCategory />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add-quiz"
            element={
              <AdminRoute>
                <AddQuiz />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add-question/:quizId"
            element={
              <AdminRoute>
                <AddQuestion />
              </AdminRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;