import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import {BlogsInfo} from "components";
import {BlogLoader} from "components";

function SingleBlog({ blogs, captionShow, handleRemoveBlog }) {
  const [blogsList, setBlogsList] = useState(null);
  const [loading, setLoading] = useState(true);
  const owner = jwtDecode(localStorage.getItem("authToken")).name;
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
              style={{
                borderTop: "1px solid #e7e7e7",
                borderBottom: "1px solid #e7e7e7",
              }}
            >
              <div className="grid grid-cols-6">
                <BlogsInfo blog={blog} captionShow={captionShow} owner={owner} handleRemoveBlog={handleRemoveBlog} />
              </div>
              <div></div>
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
