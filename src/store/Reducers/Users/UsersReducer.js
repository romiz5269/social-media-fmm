import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOwnerProfile, getUserProfile, userLogin } from "api/Users/Users.api";
import jwt_decode from 'jwt-decode'


export const UserLogin = createAsyncThunk("users/UserLogin", async (data) => {
  return await userLogin(data);
});

export const fetchUserData = createAsyncThunk("users/fetchUserData",async(username)=>{
  return await getUserProfile(username);
})

export const fetchOwnerProfile = createAsyncThunk("users/fetchOwnerProfile",async(userid)=>{
  return await getOwnerProfile(userid)
})

export const UsersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    singleUser: [],
    ownerUser:[],
    userAuthToken: "",
    AuthError: "",
    error:"",
  },
  reducers: {
    getUserid: (state) => {
      const userToken = localStorage.getItem("authToken");
      const data = jwt_decode(userToken);
      console.log(data.user_id);
      state.userData = data.user_id;
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
      }
      if (action.error.message === "403") {
        state.AuthError = "Request Incorrect";
      }
      if (action.error.message === "404") {
        console.log("404");
        state.AuthError = "Incorrect username or password";
      }
      if (action.error.message === "500") {
        state.AuthError = "No Server Response";
      }
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
    [fetchOwnerProfile.fulfilled]:(state,action)=>{
      state.ownerUser = action.payload;
    }
  },
});
export const {getUserid} = UsersSlice.actions
export default UsersSlice.reducer;
