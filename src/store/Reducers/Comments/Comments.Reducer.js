import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addNewComment,
  deleteComment,
  getAllComments,
} from "api/Blogs/blogs.api";

export const fetchAllCommentsOfPost = createAsyncThunk(
  "comments/fetchAllCommentsOfPost",
  async (config) => {
    return await getAllComments(config);
  }
);
export const createSingleComment = createAsyncThunk(
  "comments/createSingleComment",
  async (data) => {
    return await addNewComment(data);
  }
);
export const removeComment = createAsyncThunk(
  "comments/removeComment",
  async (id) => {
    return await deleteComment(id);
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    singleComments: [],
    isLoading: true,
    error: null,
    status: null,
    hasNextPage: null,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    removeSingleComment: (state, action) => {
      deleteComment(action.payload);

      state.comments = state.comments.filter(
        (item) => item.id !== action.payload.commentId
      );
    },
  },
  extraReducers: {
    [fetchAllCommentsOfPost.fulfilled]: (state, action) => {
        console.log(action.payload)
      if (action.payload.length > 0) {
        state.comments.push(...action.payload);
        state.hasNextPage = Boolean(action.payload.length);
        state.isLoading = false;
      } else {
        state.comments = [];
        state.isLoading = false;
        state.error = "دیدگاهی یافت نشد";
      }
    },
    [fetchAllCommentsOfPost.pending]: (state, action) => {
      state.error = null;
    },
    [fetchAllCommentsOfPost.rejected]: (state, action) => {
      if (action.error.message === "404") {
        state.error = "موردی یافت نشد";
      } else {
        state.error = "مشکلی رخ داده است";
      }
    },

    /*
     * create A comment
     */
    [createSingleComment.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.comments.unshift(action.payload);
    },
  },
});
export const { setIsLoading, insertNewComment, removeSingleComment } =
  commentsSlice.actions;
export default commentsSlice.reducer;
