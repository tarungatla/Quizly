import React from 'react';
import { CheckCircle, XCircle, Clock, Award, BarChart3, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const QuizResult = ({ result, quiz, totalQuestions, onNavigate }) => {

  const navigate = useNavigate();

  // Mock data for demonstration if no data is passed
  const mockData = {
    result: {
      marksGot: 75.5,
      correctAnswers: 8,
      attempted: 10
    },
    quiz: {
      title: "JavaScript Fundamentals Quiz",
      maxMarks: 100,
      qId: 1
    },
    totalQuestions: 10
  };

  const displayData = {
    result: result || mockData.result,
    quiz: quiz || mockData.quiz,
    totalQuestions: totalQuestions || mockData.totalQuestions
  };

  if (!result && !mockData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <div className="text-xl text-red-500 mb-4">No result data found</div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const percentage = ((displayData.result.marksGot / displayData.quiz.maxMarks) * 100).toFixed(1);
  const isPassed = percentage >= 50;
  const correctPercentage = ((displayData.result.correctAnswers / displayData.totalQuestions) * 100).toFixed(1);

  const getGradeInfo = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage >= 70) return { grade: 'B+', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage >= 60) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage >= 50) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { grade: 'F', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const gradeInfo = getGradeInfo(percentage);

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 90) return "Outstanding performance! You've mastered this topic.";
    if (percentage >= 80) return "Excellent work! You have a strong understanding.";
    if (percentage >= 70) return "Good job! You're on the right track.";
    if (percentage >= 60) return "Not bad! There's room for improvement.";
    if (percentage >= 50) return "You passed, but consider reviewing the material.";
    return "Keep studying and try again. You can do better!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className={`bg-white rounded-2xl shadow-xl overflow-hidden mb-8 ${isPassed ? 'border-t-4 border-green-500' : 'border-t-4 border-red-500'}`}>
          <div className={`text-center py-12 ${isPassed ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-rose-600'} text-white relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <div className="text-7xl mb-6">
                {isPassed ? '🎉' : '📚'}
              </div>
              <h1 className="text-4xl font-bold mb-4">
                {isPassed ? 'Congratulations!' : 'Keep Learning!'}
              </h1>
              <p className="text-xl opacity-95 mb-2">
                {isPassed ? 'You have successfully passed the quiz!' : 'Learning is a journey. Keep going!'}
              </p>
              <div className={`inline-flex items-center px-4 py-2 rounded-full ${gradeInfo.bg} ${gradeInfo.color} bg-opacity-20 text-white font-semibold`}>
                <Award className="w-5 h-5 mr-2" />
                Grade: {gradeInfo.grade}
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Title */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            {displayData.quiz?.title}
          </h2>
          <p className="text-gray-600 text-center text-lg">
            {getPerformanceMessage(percentage)}
          </p>
        </div>

        {/* Main Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Score Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {displayData.result.marksGot.toFixed(1)}
            </div>
            <div className="text-blue-800 font-medium mb-1">Score</div>
            <div className="text-sm text-blue-600">out of {displayData.quiz?.maxMarks}</div>
          </div>

          {/* Percentage Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {percentage}%
            </div>
            <div className="text-purple-800 font-medium mb-1">Percentage</div>
            <div className={`text-sm font-semibold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
              {isPassed ? 'PASSED' : 'NEEDS IMPROVEMENT'}
            </div>
          </div>

          {/* Correct Answers Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {displayData.result.correctAnswers}
            </div>
            <div className="text-green-800 font-medium mb-1">Correct</div>
            <div className="text-sm text-green-600">out of {displayData.totalQuestions}</div>
          </div>

          {/* Attempted Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {displayData.result.attempted}
            </div>
            <div className="text-orange-800 font-medium mb-1">Attempted</div>
            <div className="text-sm text-orange-600">out of {displayData.totalQuestions}</div>
          </div>
        </div>

        {/* Progress Visualization */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold mb-6 text-center">Performance Breakdown</h3>
          
          {/* Overall Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-medium text-gray-700">Overall Score</span>
              <span className="text-lg font-bold text-gray-800">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
              <div
                className={`h-6 rounded-full transition-all duration-1000 ease-out ${
                  percentage >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                  percentage >= 60 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                  'bg-gradient-to-r from-red-400 to-red-600'
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Answer Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {displayData.result.correctAnswers}
              </div>
              <div className="text-sm text-gray-600">Correct Answers</div>
              <div className="text-xs text-green-600 font-medium">
                {correctPercentage}% accuracy
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-red-600 mb-1">
                {displayData.result.attempted - displayData.result.correctAnswers}
              </div>
              <div className="text-sm text-gray-600">Incorrect Answers</div>
              <div className="text-xs text-red-600 font-medium">
                {(((displayData.result.attempted - displayData.result.correctAnswers) / displayData.totalQuestions) * 100).toFixed(1)}% of total
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-10 h-10 text-gray-600" />
              </div>
              <div className="text-2xl font-bold text-gray-600 mb-1">
                {displayData.totalQuestions - displayData.result.attempted}
              </div>
              <div className="text-sm text-gray-600">Unanswered</div>
              <div className="text-xs text-gray-600 font-medium">
                {(((displayData.totalQuestions - displayData.result.attempted) / displayData.totalQuestions) * 100).toFixed(1)}% skipped
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          
          <button
            onClick={() => navigate(`/quiz/${displayData.quiz?.qId}`)}
            className="flex items-center px-8 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Retake Quiz
          </button>
        </div>

        {/* Motivational Footer */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-lg text-gray-700 mb-2">
              {isPassed ? 
                "Great job! Keep up the excellent work and continue learning." :
                "Don't give up! Every attempt is a step forward in your learning journey."
              }
            </div>
            <div className="text-sm text-gray-500">
              "Success is not final, failure is not fatal: it is the courage to continue that counts."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;