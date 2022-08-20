import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewBlog, getAllBlogs, getAllBlogsByAuthor, getSingleBlogById } from "api/Blogs/blogs.api";

export const fetchAllBlogs = createAsyncThunk(
  "blogs/fetchAllBlogs",
  async () => {
    return await getAllBlogs();
  }
);
export const fetchAllBlogsByAuthor = createAsyncThunk(
  "blogs/fetchAllBlogsByAuthor",
  async (data) => {
    return await getAllBlogsByAuthor(data);
  }
);
export const fetchSingleBlogById =createAsyncThunk("blogs/fetchSingleBlogById",async(id)=>{
  return await getSingleBlogById(id)
})
export const addNewBlog =createAsyncThunk("blogs/addNewBlog",async(data)=>{
  return await createNewBlog(data)
})
export const BlogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    singleBlog: [],
    error:'',
    status:''
  },
  extraReducers: {
    [fetchAllBlogs.fulfilled]: (state, action) => {
      state.blogs = action.payload;
    },
    [addNewBlog.fulfilled]:(state,action)=>{
      if(action.payload === '200'){
        state.status = 'Post Created Successfully';
      }
      if(action.payload === '201'){
        state.status = 'Your Post Already Created'
      }
    },
    [addNewBlog.rejected]:(state,action)=>{
      if(action.payload === '401'){
        localStorage.removeItem('authToken');
      }
      if(action.payload === '403'){
        state.error = 'Request have a issue'
      }
      if(action.payload === '500'){
        state.error = 'Server is unavailable'
      }
    },
    [fetchSingleBlogById.fulfilled]:(state,action)=>{
      console.log(action.payload);
      if(state.singleBlog.length > 0){
        state.singleBlog.pop();
      }
      state.singleBlog.push(action.payload)
    }
  },
});
export default BlogsSlice.reducer;
