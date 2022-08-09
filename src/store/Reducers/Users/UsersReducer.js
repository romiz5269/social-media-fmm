import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const UsersSlice = createSlice({
    name:"users",
    initialState:{
        users:[]
    }
})