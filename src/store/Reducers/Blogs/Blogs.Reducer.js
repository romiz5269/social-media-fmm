import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addNewComment,
  addNewLike,
  createNewBlog,
  deleteComment,
  getAllBlogs,
  getAllBlogsByAuthor,
  getAllBlogsByFollow,
  getAllComments,
  getAllExplorePosts,
  getSingleBlogById,
  updateSingleBlog,
} from "api/Blogs/blogs.api";
import { URL } from "config/Urls/Urls.config";
import { axiosPrivate } from "services/Private/axiosPrivate";

export const fetchAllBlogs = createAsyncThunk(
  "blogs/fetchAllBlogs",
  async (config) => {
    return await getAllBlogs(config);
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
export const fetchAllBlogsByFollow = createAsyncThunk(
  "blogs/fetchAllBlogsByFollow",
  async (config) => {
    return await getAllBlogsByFollow(config);
  }
);
export const fetchALLExplorePosts = createAsyncThunk(
  "blogs/fetchAllExplorePosts",
  async (config) => {
    return await getAllExplorePosts(config);
  }
);
export const addNewBlog = createAsyncThunk("blogs/addNewBlog", async (data) => {
  return await createNewBlog(data);
});
export const fetchAllCommentsOfPost = createAsyncThunk(
  "blogs/fetchAllCommentsOfPost",
  async (config) => {
    return await getAllComments(config);
  }
);
export const createNewComment = createAsyncThunk(
  "blogs/createNewComment",
  async (data) => {
    return await addNewComment(data);
  }
);
export const removeComment = createAsyncThunk(
  "blogs/removeComment",
  async (id) => {
    return await deleteComment(id);
  }
);
export const addLikeOnBlog = createAsyncThunk(
  "blogs/addLikeOnBlog",
  async (id) => {
    return await addNewLike(id);
  }
);
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
    createBlog: (state, action) => {
      createNewBlog(action.payload);
      state.blogs.push(...action.payload);
      state.profileBlogs.push(...action.payload);
      state.postingStatus = false;
    },
    insertNewComment: (state, action) => {
      addNewComment(action.payload);
      state.singleBlog[0].comments.unshift(action.payload);
    },
    createALike: (state, action) => {
      addNewLike(action.payload);
    },
    removeSingleComment: (state, action) => {
      deleteComment(action.payload);
      state.comments = state.comments.filter(
        (item) => item.id !== action.payload
      );
    },
    //   state.singleBlog[0].comments = state.singleBlog[0].comments.filter(
    //     (item) => item.id !== action.payload
    //   );
    // },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setFetchError: (state, action) => {
      state.fetchError = action.payload;
    },
    setHasNextPage: (state, action) => {
      state.hasNextPage = action.payload;
    },
    removeOwnerBlog: (state, action) => {
      axiosPrivate.delete(`${URL.DELETEBLOG}/${action.payload}`);
      state.profileBlogs = state.profileBlogs.filter(
        (item) => item.id !== action.payload
      );
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
      state.blogs.push(...action.payload);
      setHasNextPage(Boolean(action.payload.length));
      setIsLoading(false);
      state.comments = [];
    },
    [fetchAllBlogs.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.fetchError = { message: action.payload.message };
    },
    [addNewBlog.fulfilled]: (state, action) => {
      state.status = "Post Created Successfully";
      state.blogs.unshift(action.payload);
      state.profileBlogs.unshift(action.payload);
      state.postingStatus = false;
      state.comments = [];
    },
    [addNewBlog.rejected]: (state, action) => {
      if (action.payload === "401") {
        localStorage.removeItem("authToken");
      }
      if (action.payload === "403") {
        state.status = "Request have a issue";
      }
      if (action.payload === "500") {
        state.status = "Server is unavailable";
      }
    },
    [fetchSingleBlogById.fulfilled]: (state, action) => {
      if (state.singleBlog.length > 0) {
        state.singleBlog.pop();
      }
      state.singleBlog.push(action.payload);
      state.comments = [];
    },
    [fetchAllBlogsByAuthor.fulfilled]: (state, action) => {
      state.profileBlogs.push(...action.payload);
      setHasNextPage(Boolean(action.payload.length));
      setIsLoading(false);
    },
    [fetchAllBlogsByFollow.fulfilled]: (state, action) => {
      if (action.payload === undefined) {
        state.followingBlogs = [];
      } else {
        state.followingBlogs.push(...action.payload);
        setHasNextPage(Boolean(action.payload.length));
        setIsLoading(false);
      }
      state.comments = [];
    },
    [fetchALLExplorePosts.fulfilled]: (state, action) => {
      state.explorePosts = action.payload;
      state.comments = [];
    },
    [fetchAllCommentsOfPost.fulfilled]: (state, action) => {
      // console.log(action.payload);
      if (action.payload === undefined) {
        state.comments = [];
      } else {
        state.comments.push(...action.payload);
        setHasNextPage(Boolean(action.payload.length));
        setIsLoading(false);
      }
    },
    // [fetchAllBlogsByFollow.fulfilled]: (state, action) => {
    //   if (action.payload === undefined) {
    //     state.followingBlogs = [];
    //   } else {
    //     state.followingBlogs.push(...action.payload);
    //     setHasNextPage(Boolean(action.payload.length));
    //     setIsLoading(false);
    //   }
    // },
    // [fetchALLExplorePosts.fulfilled]: (state, action) => {
    //   state.explorePosts = action.payload;
    // },
  },
});
export const {
  createBlog,
  createALike,
  EditSingleBlog,
  insertNewComment,
  removeOwnerBlog,
  removeSingleComment,
  setIsLoading,
  setIsError,
  setHasNextPage,
  setFetchError,
  setPostingStatus,
} = BlogsSlice.actions;
export default BlogsSlice.reducer;
