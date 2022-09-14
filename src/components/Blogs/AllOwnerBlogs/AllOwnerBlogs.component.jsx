import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAllBlogsByAuthor,
  removeOwnerBlog,
  removeSingleBlog,
  setFetchError,
  setIsLoading,
} from "store/Reducers/Blogs/Blogs.Reducer";
import { SingleBlog } from "../SingleBlog/SingleBlog";
import { AiOutlineFileSearch } from "react-icons/ai";
import swal from "sweetalert";
import { PostList } from "../PostList/PostList.component";

function AllOwnerBlogs() {
  const dispatch = useDispatch();
  const name = jwtDecode(localStorage.getItem("authToken")).name;
  const handleRemoveBlog = (blogid) => {
    console.log("clicked");
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

  useEffect(() => {
    dispatch(setIsLoading(false));
    dispatch(setFetchError({}));
    const controller = new AbortController();
    const { signal } = controller;

    dispatch(
      fetchAllBlogsByAuthor({
        pageNum: pageNum,
        options: { signal },
        username: name,
      })
    );

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
  const blogs = useSelector((state) => state.blogs.profileBlogs);

  if (isError) return <p>Error : {fetchError}</p>;

  if (!blogs.length)
    return (
      <div className="pt-10 text-2xl text-center flex flex-col justify-center">
        <AiOutlineFileSearch
          className="text-slate-500 mx-auto mb-5"
          style={{ fontSize: "70px" }}
        />
        <span className="text-slate-500">You dont have any posts yet</span>
      </div>
    );
  const content = blogs?.map((blog, i) => {
    console.log("blog", blog);
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
  });
  return (
    <>
      {content ? (
        content
      ) : (
        <div className="pt-10 text-2xl text-center flex flex-col justify-center">
          <AiOutlineFileSearch
            className="text-slate-500 mx-auto mb-5"
            style={{ fontSize: "70px" }}
          />
          <span className="text-slate-500">There is no blog to display</span>
        </div>
      )}
      {/* {blogs.length > 0 ? (
        <SingleBlog blogs={blogs} handleRemoveBlog={handleRemoveBlog} />
      ) : (
        <div className="pt-10 text-2xl text-center flex flex-col justify-center">
          <AiOutlineFileSearch
            className="text-slate-500 mx-auto mb-5"
            style={{ fontSize: "70px" }}
          />
          <span className="text-slate-500">There is no blog to display</span>
        </div>
      )} */}
    </>
  );
}
export { AllOwnerBlogs };