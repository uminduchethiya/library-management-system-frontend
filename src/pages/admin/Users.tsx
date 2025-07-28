// pages/Users.tsx
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/AdminLayout";
import { Search, Edit, Trash2 } from "lucide-react";
import EditUserModal from "../../components/modals/EditUserModal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import {
  showErrorAlert,
  showSuccessAlert,
  showDeleteConfirmAlert,
} from "../../utils/alert";
import {
  fetchUsers,
  updateUser,
  deleteUser,
  setSearchTerm,
  setSelectedUser,
  selectFilteredUsers,
  selectUsersLoading,
  selectUsersError,
  selectSelectedUser,
  selectSearchTerm,
  clearError,
  type User, // Changed to type-only import
} from "../../store/userSlice";

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filteredUsers = useSelector((state: RootState) =>
    selectFilteredUsers(state)
  );
  const loading = useSelector((state: RootState) => selectUsersLoading(state));
  const error = useSelector((state: RootState) => selectUsersError(state));
  const selectedUser = useSelector((state: RootState) =>
    selectSelectedUser(state)
  );
  const searchTerm = useSelector((state: RootState) => selectSearchTerm(state));

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleEditUser = (user: User) => {
    dispatch(setSelectedUser(user));
    setIsEditModalOpen(true);
  };

  const handleSaveUser = async (updatedUser: User) => {
    try {
      const { id, ...userData } = updatedUser;
      await dispatch(updateUser({ id, userData })).unwrap();
      setIsEditModalOpen(false);
      dispatch(setSelectedUser(null));
      showSuccessAlert("User updated successfully!");
    } catch (error) {
      console.error("Failed to update user:", error);
      showErrorAlert("Failed to update user. Please try again.");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    const isConfirmed = await showDeleteConfirmAlert();

    if (isConfirmed) {
      try {
        await dispatch(deleteUser(userId)).unwrap();
        showSuccessAlert("User deleted successfully!");
      } catch (error) {
        console.error("Failed to delete user:", error);
        showErrorAlert("Failed to delete user. Please try again.");
      }
    }
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    dispatch(setSelectedUser(null));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-10">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            User Management
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 w-full sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-400">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <button
                onClick={() => dispatch(clearError())}
                className="ml-auto text-red-400 hover:text-red-600"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
            <p className="mt-2 text-sm text-gray-500">Loading users...</p>
          </div>
        )}

        {/* Content */}
        {!loading && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {/* Mobile: Show only Name, Email, Actions */}
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-tight">
                    Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-tight">
                    Email
                  </th>

                  {/* Desktop: Show additional columns */}
                  <th className="hidden md:table-cell px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-tight">
                    User ID
                  </th>
                  <th className="hidden lg:table-cell px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-tight">
                    Role
                  </th>
                  <th className="hidden md:table-cell px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-tight">
                    Status
                  </th>

                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-tight">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 border-b">
                      <td className="px-3 py-3 text-gray-900">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {user.firstName} {user.lastName}
                          </span>

                          <span className="md:hidden inline-flex w-fit px-2 py-1 mt-1 text-xs font-medium rounded-full">
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </td>

                      <td className="px-3 py-3 text-gray-700">
                        <div className="flex flex-col">
                          <span>{user.email}</span>

                          <span className="md:hidden text-xs text-gray-500 mt-1">
                            {user.role} • ID: {user.id}
                          </span>
                        </div>
                      </td>

                      <td className="hidden md:table-cell px-3 py-3 text-gray-900">
                        {user.id}
                      </td>

                      <td className="hidden lg:table-cell px-3 py-3">
                        <span className="inline-flex px-2 py-1 text-xs font-medium">
                          {user.role}
                        </span>
                      </td>

                      <td className="hidden md:table-cell px-3 py-3">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-3 py-3 whitespace-nowrap text-xs font-medium">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-1.5 text-gray-600 hover:text-slate-700 hover:bg-gray-100 rounded transition-colors duration-200"
                            title="Edit user"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                            title="Delete user"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={closeModal}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </DashboardLayout>
  );
};

export default Users;
