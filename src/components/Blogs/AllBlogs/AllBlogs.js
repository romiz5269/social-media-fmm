import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs } from "store/Reducers/Blogs/Blogs.Reducer";
import { SingleBlog } from "../SingleBlog/SingleBlog"

function AllBlogs() {
   const dispatch = useDispatch();
   useEffect(() => {
     dispatch(fetchAllBlogs());
   }, []);
   const blogs = useSelector((state) => state.blogs.blogs);
   
  return (
    <div>
      {blogs.length>0 ? (<SingleBlog blogs={blogs} captionShow="cut" />) : (<div className="mt-5 mx-auto text-xl text-center   text-slate-300">There is No data to display 
       You must check server response and network stability requests and responses
      </div>)}
    </div>
  )
}

export {AllBlogs}
