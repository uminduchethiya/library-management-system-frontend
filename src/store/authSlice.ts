import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: null | {
    id: number;        // Add userId here
    email: string;
    role: string;
  };
}

// Function to get initial state from localStorage
const getInitialState = (): AuthState => {
  try {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      const user = JSON.parse(userStr);
      return {
        isAuthenticated: true,
        user: user,
      };
    }
  } catch (error) {
    console.error('Error parsing stored user data:', error);
  }
  
  return {
    isAuthenticated: false,
    user: null,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      
      // Persist to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    // Action to restore auth state (optional, handled in getInitialState)
    restoreAuth(state) {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          state.isAuthenticated = true;
          state.user = user;
        } catch (error) {
          console.error('Error restoring auth state:', error);
          state.isAuthenticated = false;
          state.user = null;
        }
      }
    },
  },
});

export const { login, logout, restoreAuth } = authSlice.actions;
export default authSlice.reducer;