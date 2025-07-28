import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../layouts/AdminLayout";
import { showErrorAlert, showSuccessAlert,showDeleteConfirmAlert } from "../../utils/alert"; 

import {
  Users,
  BookOpen,
  Search,
  Edit,
  Trash2,
  Plus,
  Eye,
  Loader2,
} from "lucide-react";
import { ViewBookModal, EditBookModal } from "../../components/modals";
import {
  fetchBooks,
  updateBook,
  deleteBook,
  type Book,
} from "../../store/bookSlice";

import { fetchUsers } from "../../store/userSlice";
import type { RootState, AppDispatch } from "../../store";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const { books, loading } = useSelector(
    (state: RootState) => state.books
  );
  const { users } = useSelector(
    (state: RootState) => state.users
  );

  // Local state
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [viewingBook, setViewingBook] = useState<Book | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    author: "",
    description: "",
    isbn: "",
    bookType: "",
  });

  // Fetch books on component mount
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);
  // Fetch user on component mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  
  const stats = [
    {
      title: "Total Books",
      value: books.length.toString(),
      icon: BookOpen,
      color: "bg-slate-600",
    },
    {
      title: "Total Users",
      value: users.length.toString(),
      icon: Users,
      color: "bg-slate-700",
    },
  ];

  // Filter books based on search term (ISBN or book name)
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // handle edit
  const handleEdit = (bookId: number) => {
    const book = books.find((b) => b.id === bookId);
    if (book) {
      setEditingBook(book);
      setEditFormData({
        title: book.title,
        author: book.author,
        description: book.description,
        isbn: book.isbn,
        bookType: book.bookType,
      });
      setIsEditModalOpen(true);
    }
  };
  //save the edit
  const handleSaveEdit = async () => {
    if (editingBook) {
      try {
        const updatedBook = {
          ...editingBook,
          ...editFormData,
        };
  
        await dispatch(updateBook(updatedBook)).unwrap();
        showSuccessAlert("Book updated successfully!");
        handleCloseEditModal(); 
      } // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (error: any) {
        console.error("Failed to update book:", error);
        showErrorAlert("Failed to update book. Please try again.");
      }
    }
  };
 //modal close
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingBook(null);
    setEditFormData({
      title: "",
      author: "",
      description: "",
      isbn: "",
      bookType: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
 //delte book
  const handleDelete = async (bookId: number) => {
    const isConfirmed = await showDeleteConfirmAlert();
  
    if (isConfirmed) {
      try {
        await dispatch(deleteBook(bookId)).unwrap();
        showSuccessAlert("Book deleted successfully!");
      }// eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (error: any) {
        console.error("Failed to delete book:", error);
        showErrorAlert("Failed to delete book. Please try again.");
      }
    }
  };
 //add book
  const handleAddBook = () => {
    navigate("/addbooks");
  };
// view book
  const handleView = (bookId: number) => {
    const book = books.find((b) => b.id === bookId);
    if (book) {
      setViewingBook(book);
      setIsViewModalOpen(true);
    }
  };
 //close modal
  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingBook(null);
  };

 

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                Admin Dashboard
              </h1>
            </div>
          
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`${stat.color} p-2 sm:p-3 rounded-lg text-white`}
                  >
                    <Icon size={20} className="sm:w-6 sm:h-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Books Management Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Table Header */}
          <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200">
            <div className="flex flex-col space-y-3 sm:space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Book Management
                {loading && (
                  <Loader2 className="inline-block ml-2 h-4 w-4 animate-spin text-slate-600" />
                )}
              </h2>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                {/* Search */}
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search by book name or ISBN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent w-full sm:w-64 lg:w-80"
                  />
                </div>
                {/* Add Book Button */}
                <button
                  onClick={handleAddBook}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-sm bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200 whitespace-nowrap"
                >
                  <Plus size={18} />
                  Add Book
                </button>
              </div>
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto -mx-3 sm:-mx-4 lg:-mx-6">
            <div className="inline-block min-w-full px-3 sm:px-4 lg:px-6 align-middle">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-1 sm:px-2 lg:px-3 py-1.5 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-tight">
                      ID
                    </th>
                    <th className="px-1 sm:px-2 lg:px-3 py-1.5 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-tight hidden sm:table-cell">
                      User ID
                    </th>
                    <th className="px-1 sm:px-2 lg:px-3 py-1.5 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-tight">
                      Title
                    </th>
                    <th className="px-1 sm:px-2 lg:px-3 py-1.5 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-tight hidden md:table-cell">
                      Author
                    </th>
                    <th className="px-1 sm:px-2 lg:px-3 py-1.5 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-tight hidden lg:table-cell">
                      Description
                    </th>
                    <th className="px-1 sm:px-2 lg:px-3 py-1.5 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-tight hidden sm:table-cell">
                      ISBN
                    </th>
                    <th className="px-1 sm:px-2 lg:px-3 py-1.5 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-tight">
                      Type
                    </th>
                    <th className="px-1 sm:px-2 lg:px-3 py-1.5 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-tight">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBooks.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-1 sm:px-2 lg:px-3 py-6 sm:py-8 text-center text-xs sm:text-sm text-gray-500"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Loading books...
                          </div>
                        ) : searchTerm ? (
                          "No books found matching your search."
                        ) : (
                          "No books available."
                        )}
                      </td>
                    </tr>
                  ) : (
                    filteredBooks.map((book) => (
                      <tr
                        key={book.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-1 sm:px-2 lg:px-3 py-1.5 sm:py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                          {book.id}
                        </td>
                        <td className="px-1 sm:px-2 lg:px-3 py-1.5 sm:py-2 whitespace-nowrap text-xs text-gray-600 hidden sm:table-cell">
                          {book.userId}
                        </td>
                        <td className="px-1 sm:px-2 lg:px-3 py-1.5 sm:py-2 text-xs text-gray-900">
                          <div className="max-w-[80px] sm:max-w-[120px] lg:max-w-xs">
                            <div
                              className="font-medium truncate"
                              title={book.title}
                            >
                              {book.title}
                            </div>
                            <div
                              className="text-xs text-gray-500 truncate md:hidden"
                              title={book.author}
                            >
                              {book.author}
                            </div>
                          </div>
                        </td>
                        <td className="px-1 sm:px-2 lg:px-3 py-1.5 sm:py-2 text-xs text-gray-600 hidden md:table-cell">
                          <div
                            className="max-w-[100px] lg:max-w-none truncate"
                            title={book.author}
                          >
                            {book.author}
                          </div>
                        </td>
                        <td
                          className="px-1 sm:px-2 lg:px-3 py-1.5 sm:py-2 text-xs text-gray-600 max-w-[150px] truncate hidden lg:table-cell"
                          title={book.description}
                        >
                          {book.description}
                        </td>
                        <td className="px-1 sm:px-2 lg:px-3 py-1.5 sm:py-2 text-xs text-gray-600 font-mono hidden sm:table-cell">
                          <div
                            className="max-w-[90px] lg:max-w-none truncate"
                            title={book.isbn}
                          >
                            {book.isbn}
                          </div>
                        </td>
                        <td className="px-1 sm:px-2 lg:px-3 py-1.5 sm:py-2 whitespace-nowrap">
                          <span className="inline-flex px-1.5 py-0.5 text-xs font-medium  text-gray-800 ">
                            <span
                              className="max-w-[50px] sm:max-w-[80px] lg:max-w-none truncate"
                              title={book.bookType}
                            >
                              {book.bookType.length > 8
                                ? book.bookType.substring(0, 8) + "..."
                                : book.bookType}
                            </span>
                          </span>
                        </td>
                        <td className="px-1 sm:px-2 lg:px-3 py-1.5 sm:py-2 whitespace-nowrap text-xs font-medium">
                          <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                            <button
                              onClick={() => handleView(book.id)}
                              className="p-1 text-gray-600 hover:text-slate-700 hover:bg-gray-100 rounded transition-colors duration-200 touch-manipulation"
                              title="View book"
                            >
                              <Eye
                                size={12}
                                className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4"
                              />
                            </button>
                            <button
                              onClick={() => handleEdit(book.id)}
                              className="p-1 text-gray-600 hover:text-slate-700 hover:bg-gray-100 rounded transition-colors duration-200 touch-manipulation"
                              title="Edit book"
                            >
                              <Edit
                                size={12}
                                className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4"
                              />
                            </button>
                            <button
                              onClick={() => handleDelete(book.id)}
                              className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200 touch-manipulation"
                              title="Delete book"
                            >
                              <Trash2
                                size={12}
                                className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Components */}
        <ViewBookModal
          isOpen={isViewModalOpen}
          book={viewingBook}
          onClose={handleCloseViewModal}
          onEdit={handleEdit}
        />

        <EditBookModal
          isOpen={isEditModalOpen}
          book={editingBook}
          formData={editFormData}
          onClose={handleCloseEditModal}
          onSave={handleSaveEdit}
          onInputChange={handleInputChange}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
