import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewFollow,
  deleteFollow,
  getOwnerProfile,
  getUserProfile,
  updateSingleProfile,
  userLogin,
  userLogout,
} from "api/Users/Users.api";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
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
export const UsersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    singleUser: [],
    ownerUser: [],
    isUserLogged:false,
    userAuthToken: "",
    AuthError: "",
    userData: [],
    hasFollowThreadUser: false,
  },
  reducers: {
    getIsUserLoggedIn : (state) =>{
      localStorage.getItem('authToken')

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
      
      localStorage.setItem("authToken", action.payload);
      state.userAuthToken = action.payload;
      
    },
    [UserLogin.rejected]: (state, action) => {
      if (action.error.message === "401") {
        state.AuthError = "Unauthorized";
      } else if (action.error.message === "403") {
        state.AuthError = "Request Incorrect";
      } else if (action.error.message === "404") {
        console.log("404");
        state.AuthError = "Incorrect username or password";
      } else {
        state.AuthError = "No Server Response";
      }
    },
    [UserLogout.fulfilled] : (state,action)=>{
      localStorage.removeItem('authToken');
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.singleUser = action.payload;
    },
    [fetchUserData.rejected]: (state, action) => {
      if (action.error.message === "401") {
        state.error = "Unauthorized";
      }
      if (action.error.message === "403") {
        state.error = "Request Incorrect";
      }
      if (action.error.message === "404") {
        console.log("404");
        state.error = "Incorrect username or password";
      }
      if (action.error.message === "500") {
        state.error = "No Server Response";
      }
    },
    [fetchOwnerProfile.fulfilled]: (state, action) => {
      state.ownerUser = action.payload;
      if (action.payload.is_following) {
        state.hasFollowThreadUser = true;
      } else {
        state.hasFollowThreadUser = false;
      }
    },
    [createNewFollow.fulfilled]: (state, action) => {
      state.hasFollowThreadUser = true;
    },
    [removeFollow.fulfilled]: (state, action) => {
      state.hasFollowThreadUser = false;
    },
  },
});
export const { getAuthError, getUserAuthToken, getUsername,getIsUserLoggedIn } =
  UsersSlice.actions;
export default UsersSlice.reducer;
