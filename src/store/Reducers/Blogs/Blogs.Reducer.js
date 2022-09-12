import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createNewBlog,
  getAllBlogs,
  getAllBlogsByAuthor,
  getSingleBlogById,
  updateSingleBlog,
} from "api/Blogs/blogs.api";
import { axiosPrivate } from "services/Private/axiosPrivate";

export const fetchAllBlogs = createAsyncThunk(
  "blogs/fetchAllBlogs",
  async () => {
    return await getAllBlogs();
  }
);
export const fetchAllBlogsByAuthor = createAsyncThunk(
  "blogs/fetchAllBlogsByAuthor",
  async (username) => {
    return await getAllBlogsByAuthor(username);
  }
);
export const fetchSingleBlogById = createAsyncThunk(
  "blogs/fetchSingleBlogById",
  async (id) => {
    return await getSingleBlogById(id);
  }
);
export const addNewBlog = createAsyncThunk("blogs/addNewBlog", async (data) => {
  return await createNewBlog(data);
});
export const BlogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    profileBlogs: [],
    followingBlogs: [],
    explorePosts: [],
    singleBlog: [],
    likes: [],
    comments: [],
    singleLike: [],
    postingStatus: false,
    isUserLiked: false,
    isLoading: false,
    isError: false,
    fetchError: {},
    hasNextPage: false,
    error: "",
    status: "",
  },
  reducers: {
    removeOwnerBlog: (state, action) => {
      axiosPrivate.delete(`/polls/post/${action.payload}`);
      state.blogs = state.blogs.filter((item) => item.id !== action.payload);
    },
    EditSingleBlog: (state, action) => {
      updateSingleBlog(action.payload);
    },
    setPostingStatus: (state, action) => {
      state.postingStatus = true;
    },
  },
  extraReducers: {
    [fetchAllBlogs.fulfilled]: (state, action) => {
      state.blogs = action.payload;
    },
    [addNewBlog.fulfilled]: (state, action) => {
      if (action.payload === "200") {
        state.status = "Post Created Successfully";
      }
      if (action.payload === "201") {
        state.status = "Your Post Already Created";
      }
    },
    [addNewBlog.rejected]: (state, action) => {
      if (action.payload === "401") {
        localStorage.removeItem("authToken");
      }
      if (action.payload === "403") {
        state.error = "Request have a issue";
      }
      if (action.payload === "500") {
        state.error = "Server is unavailable";
      }
    },
    [fetchSingleBlogById.fulfilled]: (state, action) => {
      if (state.singleBlog.length > 0) {
        state.singleBlog.pop();
      }
      state.singleBlog.push(action.payload);
      console.log(state.singleBlog);
    },
    [fetchAllBlogsByAuthor.fulfilled]: (state, action) => {
      state.blogs = action.payload;
    },
  },
});
export const { removeOwnerBlog,EditSingleBlog } = BlogsSlice.actions;
export default BlogsSlice.reducer;
