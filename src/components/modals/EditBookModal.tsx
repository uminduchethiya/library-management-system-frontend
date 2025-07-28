import React from 'react';
import { X, Save } from 'lucide-react';

interface Book {
  id: number;
  userId: number;
  title: string;
  author: string;
  description: string;
  isbn: string;
  bookType: string;
}

interface EditFormData {
  title: string;
  author: string;
  description: string;
  isbn: string;
  bookType: string;
}

interface EditBookModalProps {
  isOpen: boolean;
  book: Book | null;
  formData: EditFormData;
  onClose: () => void;
  onSave: () => void;
  onInputChange: (field: string, value: string) => void;
}

export const EditBookModal: React.FC<EditBookModalProps> = ({
  isOpen,
  book,
  formData,
  onClose,
  onSave,
  onInputChange,
}) => {
  if (!isOpen || !book) return null;

  const isFormValid = formData.title && formData.author && formData.isbn && formData.bookType;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Edit Book
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => onInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
              placeholder="Enter book title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author *
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => onInputChange('author', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
              placeholder="Enter author name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => onInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm resize-none"
              placeholder="Enter book description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ISBN *
            </label>
            <input
              type="text"
              value={formData.isbn}
              onChange={(e) => onInputChange('isbn', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm font-mono"
              placeholder="Enter ISBN"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Book Type *
            </label>
            <select
              value={formData.bookType}
              onChange={(e) => onInputChange('bookType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
              required
            >
              <option value="">Select book type</option>
              <option value="Fiction">Fiction</option>
              <option value="NonFiction">NonFiction</option>
              <option value="Technology">Technology</option>
              <option value="Romance">Romance</option>
              <option value="Mystery">Mystery</option>
              <option value="Biography">Biography</option>
              <option value="History">History</option>
              <option value="Science">Science</option>
              <option value="Children">Children</option>
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={!isFormValid}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-700 rounded-lg hover:bg-slate-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
