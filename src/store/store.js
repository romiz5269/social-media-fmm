import { configureStore } from "@reduxjs/toolkit";
import UsersReducer from "./Reducers/Users/UsersReducer";
export default configureStore({
  reducer: {
    users : UsersReducer,
  },
});