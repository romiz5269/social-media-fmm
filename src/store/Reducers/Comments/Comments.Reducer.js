import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewComment } from "api/Comments/Comments.api";

export const addNewComment = createAsyncThunk("comments/addNewComment",async({id,data})=>{
    return await createNewComment({id,data})
})

export const CommentSlice = createSlice({
    name:'comments',
    initialState:{
        comments:[],
        singleComment:[]
    }
})

export default CommentSlice.reducer