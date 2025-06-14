import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AddQuestion = () => {
  const { quizId } = useParams();
  const [content, setContent] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [answer, setAnswer] = useState('');
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!content || !option1 || !option2 || !option3 || !option4 || !answer) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/question/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content,
          option1,
          option2,
          option3,
          option4,
          answer,
          explanation,
          quiz: { qId: quizId }
        }),
      });

      if (response.ok) {
        setSuccess('Question added successfully!');
        setContent('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setAnswer('');
        setExplanation('');
      } else {
        setError('Failed to add question');
      }
    } catch (error) {
      setError('Error adding question');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Question Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="option1" className="block text-sm font-medium text-gray-700">
            Option 1
          </label>
          <input
            type="text"
            id="option1"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="option2" className="block text-sm font-medium text-gray-700">
            Option 2
          </label>
          <input
            type="text"
            id="option2"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="option3" className="block text-sm font-medium text-gray-700">
            Option 3
          </label>
          <input
            type="text"
            id="option3"
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="option4" className="block text-sm font-medium text-gray-700">
            Option 4
          </label>
          <input
            type="text"
            id="option4"
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
            Correct Answer
          </label>
          <select
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select correct answer</option>
            <option value={option1}>Option 1</option>
            <option value={option2}>Option 2</option>
            <option value={option3}>Option 3</option>
            <option value={option4}>Option 4</option>
          </select>
        </div>

        <div>
          <label htmlFor="explanation" className="block text-sm font-medium text-gray-700">
            Explanation (Optional)
          </label>
          <textarea
            id="explanation"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        {success && (
          <div className="text-green-500 text-sm">{success}</div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion; 