import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAllBlogsByAuthor,
  removeOwnerBlog,
  setFetchError,
  setIsLoading,
} from "store/Reducers/Blogs/Blogs.Reducer";

import swal from "sweetalert";
import { PostList } from "../PostList/PostList.component";
import { BlogLoader } from "components/Loading/BlogLoader/BlogLoader";
import { BiMessageSquareError } from "react-icons/bi";

function AllOwnerBlogs() {
  const dispatch = useDispatch();

  const ownerName = jwtDecode(localStorage.getItem("authToken")).name;
  const { name } = useParams();

  const handleRemoveBlog = (blogid) => {
    swal({
      title: "آیا مطمئن هستید ؟",
      text: "اگر بلاگ حذف شود امکان بازیابی آن وجود نخواهد داشت!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(removeOwnerBlog(blogid));

        swal("با موفقیت حذف گردید", {
          icon: "success",
        });
      }
    });
  };
   const [pageNum, setPageNum] = useState(1);

   const isLoading = useSelector((state) => state.blogs.isLoading);
   const isError = useSelector((state) => state.blogs.isError);
   const hasNextPage = useSelector((state) => state.blogs.hasNextPage);
   const fetchError = useSelector((state) => state.blogs.fetchError);
   const error = useSelector((state) => state.blogs.error);
   useEffect(() => {
     dispatch(setIsLoading(false));
     dispatch(setFetchError({}));
     const controller = new AbortController();
     const { signal } = controller;

     dispatch(
       fetchAllBlogsByAuthor({
         pageNum: pageNum,
         options: { signal },
         username:
           ownerName !== name && window.location.pathname !== "/profile"
             ? name
             : ownerName,
       })
     );

     return () => controller.abort();
   }, [pageNum, dispatch]);

   const intObserver = useRef();
   const lastBlogRef = useCallback(
     (blog) => {
       if (isLoading) return;
       if (intObserver.current) intObserver.current.disconnect();

       intObserver.current = new IntersectionObserver((blogs) => {
         if (blogs[0].isIntersecting) {
           setPageNum((prev) => prev + 1);
         }
       });
       if (blog) intObserver.current.observe(blog);
     },
     [isLoading, hasNextPage]
   );
   const blogs = useSelector((state) => state.blogs.profileBlogs);

   if (isError) return <p>Error : {fetchError}</p>;

   const content = blogs?.map((blog, i) => {
     if (blogs?.length === i + 1) {
       return (
         <PostList
           ref={lastBlogRef}
           key={blog.id}
           blogs={blog}
           handleRemoveBlog={handleRemoveBlog}
         />
       );
     }
     return (
       <PostList
         key={blog.id}
         blogs={blog}
         handleRemoveBlog={handleRemoveBlog}
       />
     );
     console.log(isLoading);
   });
   return (
     <>
       {content ? (
         <>
           {content}
           {error ? (
             <div className="pb-20 text-center flex sm:flex-col flex-row justify-center items-center">
               <BiMessageSquareError className="sm:text-[60px] text-[25px] text-slate-400 sm:mt-0 mt-3 sm:ml-0 ml-2" />
               <span className="sm:text-xl pt-4 text-slate-400 font-bold">
                 {error}
               </span>
             </div>
           ) : (
             <BlogLoader />
           )}
         </>
       ) : (
         <div>پستی برای نمایش وجود ندارد</div>
       )}
     </>
   );
}
export default AllOwnerBlogs;
