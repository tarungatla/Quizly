import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, CheckCircle, Bold, Italic, Underline } from 'lucide-react';

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
const editorRef = useRef(null);
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  if (!content || !option1 || !option2 || !option3 || !option4 || !answer) {
    setError('Please fill in all fields');
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/question/`, {
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
      // Clear the editor
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
      }
    } else {
      setError('Failed to add question');
    }
  } catch (error) {
    setError('Error adding question');
  }
};

const handleEditorInput = () => {
  if (editorRef.current) {
    setContent(editorRef.current.innerHTML);
  }
};

const formatText = (command) => {
  document.execCommand(command, false, null);
  editorRef.current.focus();
  handleEditorInput();
};

const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.execCommand('insertHTML', false, '<br><br>');
    handleEditorInput();
  }
};

return (
  <div className="max-w-3xl mx-auto px-6 py-10">
    <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Add New Question</h2>
        <p className="text-gray-500 mt-1">Fill out the fields to add a question to the quiz</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Question Content
          </label>
          
          {/* Rich Text Editor Toolbar */}
          <div className="border border-gray-300 rounded-t-lg bg-gray-50 px-3 py-2 flex gap-2">
            <button
              type="button"
              onClick={() => formatText('bold')}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => formatText('italic')}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => formatText('underline')}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Underline"
            >
              <Underline className="w-4 h-4" />
            </button>
          </div>

          {/* Rich Text Editor */}
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorInput}
            onKeyDown={handleKeyDown}
            className="w-full min-h-[120px] px-4 py-3 border border-gray-300 border-t-0 rounded-b-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            style={{ 
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              fontFamily: 'monospace'
            }}
            data-placeholder="Type the question here... Press Enter twice for new line"
          />
          
          {/* Preview of formatted content */}
          {content && (
            <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Preview:</p>
              <div 
                dangerouslySetInnerHTML={{ __html: content }}
                className="prose prose-sm max-w-none"
                style={{ fontFamily: 'monospace' }}
              />
            </div>
          )}

          <style jsx>{`
            [contenteditable]:empty:before {
              content: attr(data-placeholder);
              color: #9CA3AF;
              pointer-events: none;
            }
            [contenteditable]:focus:before {
              content: none;
            }
          `}</style>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="option1" className="block text-sm font-medium text-gray-700 mb-1">
              Option 1
            </label>
            <input
              type="text"
              id="option1"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
              placeholder="Enter option 1"
            />
          </div>
          <div>
            <label htmlFor="option2" className="block text-sm font-medium text-gray-700 mb-1">
              Option 2
            </label>
            <input
              type="text"
              id="option2"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
              placeholder="Enter option 2"
            />
          </div>
          <div>
            <label htmlFor="option3" className="block text-sm font-medium text-gray-700 mb-1">
              Option 3
            </label>
            <input
              type="text"
              id="option3"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
              placeholder="Enter option 3"
            />
          </div>
          <div>
            <label htmlFor="option4" className="block text-sm font-medium text-gray-700 mb-1">
              Option 4
            </label>
            <input
              type="text"
              id="option4"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
              placeholder="Enter option 4"
            />
          </div>
        </div>

        <div>
          <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
            Correct Answer
          </label>
          <select
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
          <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-1">
            Explanation (optional)
          </label>
          <textarea
            id="explanation"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Explain why this is the correct answer..."
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-300 rounded-md p-3">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-300 rounded-md p-3">
            <CheckCircle className="w-5 h-5" />
            <span>{success}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Question
        </button>
      </form>
    </div>
  </div>
);
};

export default AddQuestion;