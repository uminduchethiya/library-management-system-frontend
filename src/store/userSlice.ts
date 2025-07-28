// store/userSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../api/axios';
import type { RootState } from './index'; // Import RootState from store

// Types
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
  searchTerm: string;
}

// Initial state
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
  searchTerm: '',
};

// Async thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/all'); // Adjust endpoint as needed
      return response.data;
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({ id, userData }: { id: number; userData: Omit<User, 'id'> }, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.put(`/auth/${id}`, userData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update user');
      }
    }
  );
  
  export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id: number, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        await api.delete(`/auth/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return id;
      } // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
      }
    }
  );
  

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: Omit<User, 'id'>, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData); // Adjust endpoint as needed
      return response.data;
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create user');
    }
  }
);

// User slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    // For optimistic updates (optional)
    updateUserOptimistic: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update user
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.selectedUser = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete user
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create user
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { 
  setSearchTerm, 
  setSelectedUser, 
  clearError, 
  updateUserOptimistic 
} = userSlice.actions;

// Selectors
export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersError = (state: RootState) => state.users.error;
export const selectSelectedUser = (state: RootState) => state.users.selectedUser;
export const selectSearchTerm = (state: RootState) => state.users.searchTerm;

// Filtered users selector
export const selectFilteredUsers = (state: RootState) => {
  const { users, searchTerm } = state.users;
  if (!searchTerm) return users;
  
  return users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
};

export default userSlice.reducer;