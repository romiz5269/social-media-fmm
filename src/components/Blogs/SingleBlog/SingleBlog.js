import { useEffect, useState } from "react";
import { BlogsInfo, BlogLoader } from "components";
import jwtDecode from "jwt-decode";

function SingleBlog({ blogs, captionShow, handleRemoveBlog }) {
  const [blogsList, setBlogsList] = useState(null);
  const [loading, setLoading] = useState(true);
  const owner = jwtDecode(localStorage.getItem("authToken"));
  useEffect(() => {
    setTimeout(() => {
      setBlogsList(blogs);
      setLoading(false);
    }, 1000);
    return () => {
      setBlogsList(null);
    };
  }, [blogs, blogs?.id, captionShow]);
  return (
    <>
      {!loading && blogsList ? (
        <>
          {blogsList.map((blog) => (
            <div
              key={blog.id}
              className="flex flex-col pb-3 sm:pt-2"
           
            >
              <div className="grid grid-cols-6">
                <BlogsInfo
                  blog={blog}
                  captionShow={captionShow}
                  owner={owner.user_id}
                  handleRemoveBlog={handleRemoveBlog}
                />
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-row-reverse justify-center mx-auto mt-5">
          <BlogLoader />
        </div>
      )}
    </>
  );
}

export { SingleBlog };
