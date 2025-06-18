import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, AlertCircle } from 'lucide-react';

const AddCategory = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useAuth();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !description) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/category/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        setSuccess('Category added successfully!');
        setTitle('');
        setDescription('');
      } else {
        setError('Failed to add category');
      }
    } catch (error) {
      setError('Error adding category');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 sm:p-10 transition duration-300">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">Add New Category</h2>
          <p className="mt-2 text-gray-500">Create and describe a new category to organize your content better.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="Enter category title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="Enter category description"
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md animate-fade-in">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md animate-fade-in">
              <CheckCircle className="w-5 h-5" />
              <p>{success}</p>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
