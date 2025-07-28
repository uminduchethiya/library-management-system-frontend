import React, { useState } from "react";
import DashboardLayout from "../../layouts/AdminLayout";
import type { RootState, AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../../store/bookSlice";
import { showErrorAlert, showSuccessAlert } from "../../utils/alert"; 
const AddBook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.books);
  const { user } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    isbn: "",
    bookType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { title, author, description, isbn, bookType } = formData;
    return (
      title.trim() !== "" &&
      author.trim() !== "" &&
      description.trim() !== "" &&
      isbn.trim() !== "" &&
      bookType.trim() !== ""
    );
  };

  const handleReset = () => {
    setFormData({
      title: "",
      author: "",
      description: "",
      isbn: "",
      bookType: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) {
      showErrorAlert("Please fill in all fields.");
      return;
    }
  
    let userId = user?.id;
  
    if (!userId) {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          userId = userData.id;
        } catch (error) {
          console.error("Error parsing stored user data:", error);
        }
      }
    }
  
    if (!userId) {
      showErrorAlert("User not authenticated. Please log in again.");
      return;
    }
  
    try {
      const bookData = {
        ...formData,
        userId: userId,
      };
  
      const resultAction = await dispatch(addBook(bookData));
  
      if (addBook.fulfilled.match(resultAction)) {
        showSuccessAlert("Book added successfully!");
        handleReset();
      } else {
        showErrorAlert(`Failed to add book: ${resultAction.payload || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Unexpected error adding book:", error);
      showErrorAlert("Something went wrong. Please try again.");
    }
  };
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 ">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 ">Add New Book</h1>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-8 py-6">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Book Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder-gray-400"
                    placeholder="Enter the book title"
                    required
                  />
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Author <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder-gray-400"
                    placeholder="Enter the author's name"
                    required
                  />
                </div>

                {/* ISBN */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ISBN <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder-gray-400"
                    placeholder="Enter ISBN number"
                    required
                  />
                </div>

                {/* Book Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="bookType"
                    value={formData.bookType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white"
                    required
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="Fiction">Fiction</option>
                    <option value="NonFiction">Non-Fiction</option>
                    <option value="Biography">Biography</option>
                    <option value="Science">Science</option>
                    <option value="Technology">Technology</option>
                    <option value="History">History</option>
                    <option value="Children">Children</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Romance">Romance</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder-gray-400 resize-none"
                    placeholder="Enter a brief description of the book"
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                    >
                      Reset Form
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-sm bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200 whitespace-nowrap"
                    >
                      {loading && (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      )}
                      {loading ? "Adding Book..." : "Add Book"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddBook;