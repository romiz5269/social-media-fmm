import { BlogLoader } from "components/Loading/BlogLoader/BlogLoader";
import { useRef } from "react";
import { useState, useEffect, useCallback } from "react";
import { BiMessageSquareError } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBlogs,
  setFetchError,
  setIsLoading,
} from "store/Reducers/Blogs/Blogs.Reducer";
import { PostList } from "../PostList/PostList.component";

function AllBlogs() {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);

  const isLoading = useSelector((state) => state.blogs.isLoading);
  const hasNextPage = useSelector((state) => state.blogs.hasNextPage);
  const error = useSelector((state) => state.blogs.error);
  useEffect(() => {
    dispatch(setFetchError({}));
    const controller = new AbortController();
    const { signal } = controller;

    dispatch(fetchAllBlogs({ pageNum: pageNum, options: { signal } }));

    return () => controller.abort();
  }, [pageNum, dispatch]);

  const intObserver = useRef();
  const lastBlogRef = useCallback(
    (blog) => {
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((blogs) => {
        if (blogs[0].isIntersecting) {
          dispatch(setIsLoading(true));

          setPageNum((prev) => prev + 1);
        }
      });
      if (blog) intObserver.current.observe(blog);
    },
    [isLoading, hasNextPage]
  );
  const blogs = useSelector((state) => state.blogs.blogs);

  const content = blogs?.map((blog, i) => {
    if (blogs?.length === i + 1) {
      return <PostList ref={lastBlogRef} key={blog.id} blogs={blog} />;
    }

    return <PostList key={blog.id} blogs={blog} />;
  });
  return (
    <>
      {content ? (
        <>
          <div
            className="backdrop-blur-md sticky top-0 p-4 z-20 md:flex hidden"
            style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
          >
            <span className="text-[17px] font-[600] font-Vazirmatn dark:text-white">
                بلاگ ها
            </span>
          </div>
          {content}
          {error ? (
            <div className="pb-20 text-center flex sm:flex-col flex-row justify-center items-start">
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
        <div>مشکلی رخ داده است</div>
      )}
    </>
  );
}

export {AllBlogs};
