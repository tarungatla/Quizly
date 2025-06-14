import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import QuizResult from './QuizResult'; // Import the QuizResult component

// Quiz Taking Component
const TakeQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState(null); // Add state for quiz result

  useEffect(() => {
    fetchQuizData();
  }, [quizId]);

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !quizSubmitted) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, quizSubmitted]);

  const fetchQuizData = async () => {
    try {
      // Fetch quiz details
      const quizResponse = await fetch(`http://localhost:8080/quiz/${quizId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!quizResponse.ok) {
        throw new Error('Failed to fetch quiz');
      }
      
      const quizData = await quizResponse.json();
      setQuiz(quizData);
      
      // Fetch questions
      const questionsResponse = await fetch(`http://localhost:8080/question/quiz/${quizId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!questionsResponse.ok) {
        throw new Error('Failed to fetch questions');
      }
      
      const questionsData = await questionsResponse.json();
      setQuestions(questionsData);
      
      // Set timer (assuming 2 minutes per question, you can adjust this)
      setTimeLeft(questionsData.length * 120); // 2 minutes per question
      
    } catch (error) {
      setError('Error loading quiz: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedAnswer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      // Prepare questions with answers for submission
      const questionsWithAnswers = questions.map(question => ({
        quesId: question.quesId,
        givenAnswer: answers[question.quesId] || null,
        quiz: quiz
      }));

      const response = await fetch('http://localhost:8080/question/eval-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(questionsWithAnswers)
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }

      const result = await response.json();
      setQuizSubmitted(true);
      
      // Set the quiz result to display the result component
      setQuizResult(result);

    } catch (error) {
      setError('Error submitting quiz: ' + error.message);
    }
  };

  const handleNavigateFromResult = (path) => {
    if (path === '/dashboard') {
      navigate('/dashboard');
    } else if (path.includes('/quiz/')) {
      // Reset quiz state for retake
      setQuizResult(null);
      setQuizSubmitted(false);
      setQuizStarted(false);
      setCurrentQuestionIndex(0);
      setAnswers({});
      // Refetch quiz data
      fetchQuizData();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  // Show QuizResult component if quiz is submitted and result is available
  if (quizSubmitted && quizResult) {
    return (
      <QuizResult
        result={quizResult}
        quiz={quiz}
        totalQuestions={questions.length}
        onNavigate={handleNavigateFromResult}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading quiz...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-500 mb-4">{error}</div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full mx-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{quiz?.title}</h1>
            <p className="text-gray-600 mb-6">{quiz?.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{quiz?.maxMarks}</div>
                <div className="text-sm text-gray-600">Max Marks</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{formatTime(timeLeft)}</div>
                <div className="text-sm text-gray-600">Time Limit</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
              <ul className="text-left text-gray-600 space-y-1">
                <li>• Read each question carefully before selecting an answer</li>
                <li>• You can navigate between questions using Next/Previous buttons</li>
                <li>• Your progress is automatically saved</li>
                <li>• Submit the quiz before time runs out</li>
                <li>• Once submitted, you cannot change your answers</li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleStartQuiz}
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold">{quiz?.title}</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-sm">
                <span className="text-gray-600">Answered: </span>
                <span className="font-semibold">{getAnsweredCount()}/{questions.length}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Time Left: </span>
                <span className={`font-semibold ${timeLeft < 300 ? 'text-red-600' : 'text-green-600'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Progress Bar */}
          <div className="p-4 border-b">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">
                {currentQuestion?.content}
              </h2>
              {currentQuestion?.image && (
                <img
                  src={currentQuestion.image}
                  alt="Question"
                  className="max-w-full h-auto rounded-lg mb-4"
                />
              )}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {[
                { key: 'option1', label: 'A' },
                { key: 'option2', label: 'B' },
                { key: 'option3', label: 'C' },
                { key: 'option4', label: 'D' }
              ].map(({ key, label }) => (
                currentQuestion?.[key] && (
                  <label
                    key={key}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      answers[currentQuestion.quesId] === currentQuestion[key]
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.quesId}`}
                      value={currentQuestion[key]}
                      checked={answers[currentQuestion.quesId] === currentQuestion[key]}
                      onChange={(e) => handleAnswerChange(currentQuestion.quesId, e.target.value)}
                      className="mr-3"
                    />
                    <span className="font-medium mr-3">{label}.</span>
                    <span>{currentQuestion[key]}</span>
                  </label>
                )
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="p-6 bg-gray-50 flex justify-between items-center">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex space-x-3">
              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={handleSubmitQuiz}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Question Navigation</h3>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-10 h-10 rounded-md text-sm font-medium ${
                  index === currentQuestionIndex
                    ? 'bg-indigo-600 text-white'
                    : answers[questions[index]?.quesId]
                    ? 'bg-green-200 text-green-800'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-indigo-600 rounded mr-2"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-200 rounded mr-2"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
              <span>Not Answered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TakeQuiz };