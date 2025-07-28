import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../api/axios"; // Import your centralized API instance

export interface Book {
  id: number;
  userId: number;
  title: string;
  author: string;
  description: string;
  isbn: string;
  bookType: string;
}

interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BookState = {
  books: [],
  loading: false,
  error: null,
};

// Helper function to get auth headers (if needed beyond the API instance config)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch all books
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/book", {
        headers: getAuthHeaders(),
      });
      return res.data as Book[];
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 
        error.response?.data || 
        error.message || 
        "Failed to fetch books"
      );
    }
  }
);

// Add new book
// Update just the addBook thunk in your bookSlice.ts

// Change the type to exclude userId since we'll handle it automatically
export const addBook = createAsyncThunk(
    "books/addBook",
    async (bookData: Omit<Book, "id" | "userId">, thunkAPI) => {
      try {
        // Let the backend determine userId from the JWT token
        // The backend should extract userId from the Authorization header
        const res = await api.post("/book", bookData, {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
        });
        return res.data as Book;
      } // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || 
          error.response?.data || 
          error.message || 
          "Failed to add book"
        );
      }
    }
  );

// Update book
export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, ...bookData }: Book, thunkAPI) => {
    try {
      const res = await api.put(`/book/${id}`, bookData, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
      });
      return res.data as Book;
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 
        error.response?.data || 
        error.message || 
        "Failed to update book"
      );
    }
  }
);


// Delete book
export const deleteBook = createAsyncThunk(
    "books/deleteBook",
    async (bookId: number, thunkAPI) => {
      try {
        await api.delete(`/book/${bookId}`, {
          headers: getAuthHeaders(),
        });
        return bookId;
      } // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Failed to delete book"
        );
      }
    }
  );
  

// Get single book by ID (bonus utility function)
export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (bookId: number, thunkAPI) => {
    try {
      const res = await api.get(`/book/${bookId}`, {
        headers: getAuthHeaders(),
      });
      return res.data as Book;
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 
        error.response?.data || 
        error.message || 
        "Failed to fetch book"
      );
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    // Reset state
    resetBookState: (state) => {
      state.books = [];
      state.loading = false;
      state.error = null;
    },
    // Set loading state manually if needed
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.loading = false;
        state.books = action.payload;
        state.error = null;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add book
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.loading = false;
        state.books.push(action.payload);
        state.error = null;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update book
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.loading = false;
        const index = state.books.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete book
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.books = state.books.filter(book => book.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch single book
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action: PayloadAction<Book>) => {
        state.loading = false;
        // Update the book in the list if it exists, otherwise add it
        const index = state.books.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        } else {
          state.books.push(action.payload);
        }
        state.error = null;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, resetBookState, setLoading } = bookSlice.actions;
export default bookSlice.reducer;