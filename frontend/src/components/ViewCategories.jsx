// ViewCategories.jsx
// QuizQuestions.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaLayerGroup, FaQuestionCircle, FaEdit, FaTrash, FaSearch, FaArrowLeft, FaClock } from 'react-icons/fa';

// CategoryQuizzes.jsx
import React, { useState, useEffect } from 'react';
const ViewCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/category/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await fetch(`http://localhost:8080/category/${categoryId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const filteredCategories = categories.filter(category =>
    category.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <div className="text-xl text-gray-700">Loading categories...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FaLayerGroup className="mr-3 text-indigo-600" />
              Categories Management
            </h1>
            <p className="text-gray-600 mt-2">Manage quiz categories and their associated quizzes</p>
          </div>
          <Link
            to="/admin/add-category"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
          >
            <FaPlus className="mr-2" />
            Add New Category
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <FaLayerGroup className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No categories found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first category'}
            </p>
            <Link
              to="/admin/add-category"
              className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <FaPlus className="mr-2" />
              Create Category
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category.cid}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-indigo-100 text-sm">{category.description}</p>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => deleteCategory(category.cid)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Category"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  <Link
                    to={`/admin/category/${category.cid}/quizzes`}
                    className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <FaQuestionCircle className="inline mr-2" />
                    View Quizzes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};



const CategoryQuizzes = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryAndQuizzes();
  }, [categoryId]);

  const fetchCategoryAndQuizzes = async () => {
    try {
      // Fetch category details
      const categoryResponse = await fetch(`http://localhost:8080/category/${categoryId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const categoryData = await categoryResponse.json();
      setCategory(categoryData);

      // Fetch quizzes for this category
      const quizzesResponse = await fetch(`http://localhost:8080/quiz/category/${categoryId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const quizzesData = await quizzesResponse.json();
      setQuizzes(quizzesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuiz = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await fetch(`http://localhost:8080/quiz/${quizId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        fetchCategoryAndQuizzes();
      } catch (error) {
        console.error('Error deleting quiz:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <div className="text-xl text-gray-700">Loading quizzes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/admin/categories')}
            className="mr-4 p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">
              {category?.title} - Quizzes
            </h1>
            <p className="text-gray-600 mt-2">{category?.description}</p>
          </div>
          <Link
            to={`/admin/add-quiz?categoryId=${categoryId}`}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
          >
            <FaPlus className="mr-2" />
            Create New Quiz
          </Link>
        </div>

        {/* Quizzes Grid */}
        {quizzes.length === 0 ? (
          <div className="text-center py-12">
            <FaQuestionCircle className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No quizzes found</h3>
            <p className="text-gray-500 mb-6">Create your first quiz for this category</p>
            <Link
              to={`/admin/add-quiz?categoryId=${categoryId}`}
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
            >
              <FaPlus className="mr-2" />
              Create Quiz
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz.qId}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{quiz.title}</h3>
                  <p className="text-blue-100 text-sm">{quiz.description}</p>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <FaQuestionCircle className="text-blue-600 mx-auto mb-1" />
                      <div className="text-sm text-gray-600">Questions</div>
                      <div className="font-bold text-gray-800">{quiz.noOfQuestions}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <FaClock className="text-green-600 mx-auto mb-1" />
                      <div className="text-sm text-gray-600">Max Marks</div>
                      <div className="font-bold text-gray-800">{quiz.maxMarks}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      quiz.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {quiz.active ? 'Active' : 'Inactive'}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => deleteQuiz(quiz.qId)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Quiz"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  <Link
                    to={`/admin/quiz/${quiz.qId}/questions`}
                    className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <FaEdit className="inline mr-2" />
                    Manage Questions
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};



const QuizQuestions = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizAndQuestions();
  }, [quizId]);

  const fetchQuizAndQuestions = async () => {
    try {
      // Fetch quiz details
      const quizResponse = await fetch(`http://localhost:8080/quiz/${quizId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const quizData = await quizResponse.json();
      setQuiz(quizData);

      // Fetch questions for this quiz
      const questionsResponse = await fetch(`http://localhost:8080/question/quiz/all/${quizId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const questionsData = await questionsResponse.json();
      setQuestions(questionsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await fetch(`http://localhost:8080/question/${questionId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        fetchQuizAndQuestions();
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <div className="text-xl text-gray-700">Loading questions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(`/admin/category/${quiz?.category?.cid}/quizzes`)}
            className="mr-4 p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">
              {quiz?.title} - Questions
            </h1>
            <p className="text-gray-600 mt-2">{quiz?.description}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span>Max Questions: {quiz?.noOfQuestions}</span>
              <span>Max Marks: {quiz?.maxMarks}</span>
              <span>Current Questions: {questions.length}</span>
            </div>
          </div>
          <Link
            to={`/admin/add-question/${quizId}`}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Question
          </Link>
        </div>

        {/* Questions List */}
        {questions.length === 0 ? (
          <div className="text-center py-12">
            <FaQuestionCircle className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No questions found</h3>
            <p className="text-gray-500 mb-6">Add your first question to this quiz</p>
            <Link
              to={`/admin/add-question/${quizId}`}
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
            >
              <FaPlus className="mr-2" />
              Add Question
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div
                key={question.quesId}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Question {index + 1}
                  </h3>
                  <button
                    onClick={() => deleteQuestion(question.quesId)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Question"
                  >
                    <FaTrash />
                  </button>
                </div>
                
                <div className="mb-4">
                  {/* Rich text content rendering */}
                  <div 
                    className="text-gray-700 font-medium mb-3 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: question.content }}
                    style={{ lineHeight: '1.6' }}
                  />
                  
                  {/* Show explanation if it exists */}
                  {question.explanation && (
                    <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                      <h4 className="text-sm font-semibold text-blue-800 mb-1">Explanation:</h4>
                      <p className="text-blue-700 text-sm">{question.explanation}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className={`p-3 rounded-lg border ${
                      question.answer === question.option1 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <span className="font-medium text-sm text-gray-600">A:</span> {question.option1}
                      {question.answer === question.option1 && (
                        <span className="ml-2 text-green-600 text-sm font-semibold">✓ Correct</span>
                      )}
                    </div>
                    <div className={`p-3 rounded-lg border ${
                      question.answer === question.option2 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <span className="font-medium text-sm text-gray-600">B:</span> {question.option2}
                      {question.answer === question.option2 && (
                        <span className="ml-2 text-green-600 text-sm font-semibold">✓ Correct</span>
                      )}
                    </div>
                    <div className={`p-3 rounded-lg border ${
                      question.answer === question.option3 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <span className="font-medium text-sm text-gray-600">C:</span> {question.option3}
                      {question.answer === question.option3 && (
                        <span className="ml-2 text-green-600 text-sm font-semibold">✓ Correct</span>
                      )}
                    </div>
                    <div className={`p-3 rounded-lg border ${
                      question.answer === question.option4 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <span className="font-medium text-sm text-gray-600">D:</span> {question.option4}
                      {question.answer === question.option4 && (
                        <span className="ml-2 text-green-600 text-sm font-semibold">✓ Correct</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom CSS for proper rendering of rich content */}
      <style jsx>{`
        /* Ensure code blocks render properly */
        .prose pre {
          background-color: #f8f9fa !important;
          border: 1px solid #e9ecef !important;
          border-radius: 6px !important;
          padding: 16px !important;
          margin: 12px 0 !important;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
          overflow-x: auto !important;
        }
        
        .prose code {
          background-color: #f8f9fa !important;
          padding: 2px 6px !important;
          border-radius: 3px !important;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
          font-size: 13px !important;
        }
        
        .prose pre code {
          background-color: transparent !important;
          padding: 0 !important;
          border-radius: 0 !important;
        }
        
        /* Better list styling */
        .prose ul {
          margin: 8px 0 !important;
          padding-left: 20px !important;
        }
        
        .prose li {
          margin: 4px 0 !important;
        }
        
        /* Better paragraph spacing */
        .prose p {
          margin: 8px 0 !important;
        }
        
        /* Bold, italic, underline styling */
        .prose strong {
          font-weight: 600 !important;
          color: #374151 !important;
        }
        
        .prose em {
          font-style: italic !important;
        }
        
        .prose u {
          text-decoration: underline !important;
        }
      `}</style>
    </div>
  );
};

export { ViewCategories, CategoryQuizzes, QuizQuestions };