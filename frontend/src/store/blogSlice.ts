import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface BlogState {
  posts: any[];
  loading: boolean;
}

const initialState: BlogState = {
  posts: [],
  loading: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<any[]>) => {
      state.posts = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Export actions
export const { setPosts, setLoading } = blogSlice.actions;

// Export the reducer to add to the store
export default blogSlice.reducer;
