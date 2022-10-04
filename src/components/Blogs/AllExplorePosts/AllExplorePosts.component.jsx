import { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchALLExplorePosts,
  setFetchError,
  setIsLoading,
} from "store/Reducers/Blogs/Blogs.Reducer";
import { PostList } from "../PostList/PostList.component";
import { ImCrying } from "react-icons/im";

function AllExplorePosts() {
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

    dispatch(fetchALLExplorePosts({ pageNum: pageNum, options: { signal } }));

    return () => controller.abort();
  }, [pageNum, dispatch]);

  const intObserver = useRef();
  const lastBlogRef = useCallback(
    (blog) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((blogs) => {
        console.log(blogs);
        if (blogs[0].isIntersecting) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (blog) intObserver.current.observe(blog);
    },
    [isLoading, hasNextPage]
  );
  const blogs = useSelector((state) => state.blogs.explorePosts);

  if (isError) return <p>Error : {fetchError}</p>;
  if (!blogs?.length)
    return (
      <div className="pt-10 text-2xl text-center flex flex-col justify-center">
        <ImCrying
          className="text-slate-500 mx-auto mb-5"
          style={{ fontSize: "70px" }}
        />
        <span className="text-slate-500">
          Faild to load data , Check Your network connection !{" "}
        </span>
      </div>
    );
  const content = blogs?.map((blog, i) => {
    if (blogs?.length === i + 1) {
      return <PostList ref={lastBlogRef} key={blog.id} blogs={blog} />;
    }
    return <PostList key={blog.id} blogs={blog} />;
  });
  return (
    <>
      {isLoading && <p>Loading More Blogs ...</p>}
      {content}
    </>
  );
}

export { AllExplorePosts };
