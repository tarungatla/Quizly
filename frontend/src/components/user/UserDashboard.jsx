import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchQuizzes(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${baseUrl}/category/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategory(data[0]);
        }
      }
    } catch (error) {
      setError('Error fetching categories');
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizzes = async (category) => {
    try {
      const response = await fetch(`${baseUrl}/quiz/category/active/${category.cid}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setQuizzes(data);
      }
    } catch (error) {
      setError('Error fetching quizzes');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* Categories Sidebar */}
          <div className="w-1/4 bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.cid}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    selectedCategory?.cid === category.cid
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {/* Quizzes Section */}
          <div className="w-3/4 bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">
              {selectedCategory ? `Quizzes in ${selectedCategory.title}` : 'Select a Category'}
            </h2>
            {selectedCategory && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizzes.length > 0 ? (
                  quizzes.map((quiz) => (
                    <div
                      key={quiz.qId}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{quiz.description}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Max Marks: {quiz.maxMarks}</span>
                        <span>Questions: {quiz.noOfQuestions}</span>
                      </div>
                      <Link
                        to={`/quiz/${quiz.qId}`}
                        className="mt-4 block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                      >
                        Start Quiz
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center text-gray-500 py-8">
                    No quizzes available in this category
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 