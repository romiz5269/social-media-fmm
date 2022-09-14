import { useRef } from "react";
import { useState, useEffect, useRe, useCallback } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBlogs,
  setFetchError,
  setIsLoading,
} from "store/Reducers/Blogs/Blogs.Reducer";
import { PostList } from "../PostList/PostList.component";
import { SingleBlog } from "../SingleBlog/SingleBlog";

function AllBlogs() {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);

  const isLoading = useSelector((state) => state.blogs.isLoading);
  const isError = useSelector((state) => state.blogs.isError);
  const hasNextPage = useSelector((state) => state.blogs.hasNextPage);
  const fetchError = useSelector((state) => state.blogs.fetchError);

  useEffect(() => {
    dispatch(setIsLoading(false));
    dispatch(setFetchError({}));
    const controller = new AbortController();
    const { signal } = controller;

    dispatch(fetchAllBlogs({ pageNum: pageNum, options: { signal } }));

    return () => controller.abort();
  }, [pageNum, dispatch]);

  const intObserver = useRef();
  const lastBlogRef = useCallback(
    (blog) => {
      console.log("ran");
      if (isLoading) return;
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
  const blogs = useSelector((state) => state.blogs.blogs);

  if (isError) return <p>Error : {fetchError}</p>;
  if (!blogs.length)
    return (
      <div className="pt-10 text-2xl text-center flex flex-col justify-center">
        <AiOutlineFileSearch
          className="text-slate-500 mx-auto mb-5"
          style={{ fontSize: "70px" }}
        />
        <span className="text-slate-500">There is no post to display</span>
      </div>
    );
  const content = blogs?.map((blog, i) => {
    console.log("blog", blog);
    if (blogs?.length === i + 1) {
      return <PostList ref={lastBlogRef} key={blog.id} blogs={blog} />;
    }
    return <PostList key={blog.id} blogs={blog} />;
  });
  return (
    <>
      {isLoading && <p>Loading More Blogs ...</p>}
      {content}
      {/* <SingleBlog blogs={blogs} captionShow="cut" /> */}
    </>
  );
}

export { AllBlogs };
