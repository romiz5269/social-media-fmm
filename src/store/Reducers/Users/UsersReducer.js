import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewFollow,
  deleteFollow,
  getOwnerProfile,
  getUserProfile,
  updateSingleProfile,
  updateSingleProfileImage,
  userLogin,
  userLogout,
} from "api/Users/Users.api";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import BlogsReducer, { clearProfileBlogs } from "../Blogs/Blogs.Reducer";
import LogoutUser from "utils/LogoutFunc/Logout.Func";

export const UserLogin = createAsyncThunk("users/UserLogin", async (data) => {
  return await userLogin(data);
});
export const UserLogout = createAsyncThunk("users/UserLogout", async () => {
  return await userLogout();
});
export const fetchUserData = createAsyncThunk(
  "users/fetchUserData",
  async (username) => {
    return await getUserProfile(username);
  }
);
export const fetchOwnerProfile = createAsyncThunk(
  "users/fetchOwnerProfile",
  async (username) => {
    return await getOwnerProfile(username);
  }
);

export const createNewFollow = createAsyncThunk(
  "users/createNewFollow",
  async (to_user) => {
    return await addNewFollow(to_user);
  }
);
export const removeFollow = createAsyncThunk(
  "users/removeFollow",
  async (username) => {
    return await deleteFollow(username);
  }
);
export const updateUserData = createAsyncThunk(
  "users/updateUserData",
  async (data) => {
    return await updateSingleProfile(data);
  }
);
export const updateUserImage = createAsyncThunk(
  "users/updateUserImage",
  async (data) => {
    return await updateSingleProfileImage(data);
  }
);
export const UsersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    singleUser: [],
    ownerUser: [],
    isUserLogged: false,
    userAuthToken: "",
    AuthError: null,
    userData: [],
    error: null,
    status: {
      type: null,
      message: "",
    },
    hasFollowThreadUser: false,
  },
  reducers: {
    getIsUserLoggedIn: (state) => {
      localStorage.getItem("authToken");
    },
    getUserAuthToken: (state, action) => {
      const data = state.userAuthToken;
    },
    getAuthError: (state, action) => {
      const data = state.AuthError;
    },
    getUsername: (state) => {
      const userToken = localStorage.getItem("authToken");
      const data = jwt_decode(userToken);
      state.userData = data.username;
    },
  },
  extraReducers: {
    [UserLogin.fulfilled]: (state, action) => {
      state.userAuthToken = null;
      localStorage.setItem("authToken", action.payload);
      state.userAuthToken = action.payload;
    },
    [UserLogin.rejected]: (state, action) => {
      console.log(action.payload)
      state.AuthError = null;
      state.AuthError = action.payload;
      // if (action.error.message === "401") {
      //   state.AuthError =
      //     "کاربر یافت نشد - رمز عبور و یا نام کاربری اشتباه است";
      // } else if (action.error.message === "403") {
      //   state.AuthError = "Request Incorrect";
      // } else if (action.error.message === "404") {
      //   state.AuthError = "Incorrect username or password";
      // } else {
      //   state.AuthError = "سرور پاسخگو نیست";
      // }
    },
    [UserLogout.fulfilled]: (state, action) => {
      localStorage.removeItem("authToken");
    },

    [fetchOwnerProfile.fulfilled]: (state, action) => {
      state.ownerUser = action.payload;
      if (action.payload.youfollow) {
        state.hasFollowThreadUser = true;
      } else {
        state.hasFollowThreadUser = false;
      }
    },
    [fetchOwnerProfile.rejected]: (state, action) => {
      if (action.error.message === "404") {
        state.error = "موردی یافت نشد";
        // localStorage.removeItem("authToken");
      } else {
        state.error = "مشکلی رخ داده است";
      }
    },
    [createNewFollow.fulfilled]: (state, action) => {
      state.hasFollowThreadUser = true;
      state.ownerUser.followercount += 1;
    },
    [removeFollow.fulfilled]: (state, action) => {
      state.hasFollowThreadUser = false;
      state.ownerUser.followercount -= 1;

      clearProfileBlogs();
    },
    [updateUserData.fulfilled]: (state, action) => {
      state.ownerUser = action.payload;
    },
    [updateSingleProfileImage.fulfilled]: (state, action) => {
      state.ownerUser = action.payload;
    },
  },
});
export const {
  getAuthError,
  getUserAuthToken,
  getUsername,
  getIsUserLoggedIn,
} = UsersSlice.actions;
export default UsersSlice.reducer;
