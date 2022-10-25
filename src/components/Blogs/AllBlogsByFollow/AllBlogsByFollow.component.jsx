import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBlogsByFollow,
  setFetchError,
  setIsLoading,
} from "store/Reducers/Blogs/Blogs.Reducer";
import { AiOutlineFileSearch } from "react-icons/ai";
import { PostList } from "components";
import { IoReloadOutline } from "react-icons/io5";
import { BlogLoader } from "components";
// const {PostListLazy} = React.lazy(() => import("components"));

function AllBlogsByFollow() {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);

  const isLoading = useSelector((state) => state.blogs.isLoading);
  const isError = useSelector((state) => state.blogs.isError);
  const hasNextPage = useSelector((state) => state.blogs.hasNextPage);
  const fetchError = useSelector((state) => state.blogs.fetchError);

  useEffect(() => {
    dispatch(setFetchError({}));
    const controller = new AbortController();
    const { signal } = controller;

    dispatch(fetchAllBlogsByFollow({ pageNum: pageNum, options: { signal } }));

    return () => controller.abort();
  }, [pageNum, dispatch]);

  const intObserver = useRef();
  const lastBlogRef = useCallback(
    (blog) => {
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((blogs) => {
        console.log(blogs);
        if (blogs[0].isIntersecting) {
          console.log("we near last node");
          setPageNum((prev) => prev + 1);
        }
      });
      if (blog) intObserver.current.observe(blog);
    },
    [isLoading, hasNextPage]
  );
  const blogs = useSelector((state) => state.blogs.followingBlogs);

  if (isError) return <p>Error : {fetchError}</p>;
  if (isLoading) {
    return (
      <div className="w-full flex flex-row justify-center items-center pb-2 pt-4">
        <BlogLoader />
      </div>
    );
  }

  if (!blogs?.length) {
    return (
      <div className="pt-10 text-2xl text-center flex flex-col justify-center">
        <AiOutlineFileSearch
          className="text-slate-500 mx-auto mb-5"
          style={{ fontSize: "70px" }}
        />
        <div className="text-slate-500 flex flex-row justify-center">
          <span>مشکلی رخ داده است</span>
          <IoReloadOutline className="text-blue-600 mr-2 hover:cursor-pointer" />
        </div>
      </div>
    );
  }

  const content = blogs?.map((blog, i) => {
    if (blogs?.length === i + 1) {
      return <PostList ref={lastBlogRef} key={blog.id} blogs={blog} />;
    }
    return <PostList key={blog.id} blogs={blog} />;
  });
  return (
    <>
      {isLoading && <p>Loading More Blogs ...</p>}
      <div
        className="backdrop-blur-md sticky top-0 p-4 z-20 md:flex hidden"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
      >
        <span className="text-[17px] font-[600] font-Vazirmatn">صفحه اصلی</span>
      </div>
      {content}
    </>
  );
}

export { AllBlogsByFollow };
