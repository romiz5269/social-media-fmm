import { configureStore } from "@reduxjs/toolkit";
import UsersReducer from "./Reducers/Users/UsersReducer";
import BlogsReducer from "./Reducers/Blogs/Blogs.Reducer";
import CommentsReducer from "./Reducers/Comments/Comments.Reducer";
export default configureStore({
  reducer: {
    users: UsersReducer,
    blogs: BlogsReducer,
    comments: CommentsReducer,
  },
});
