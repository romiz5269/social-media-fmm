import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaEllipsisH,
  FaRegComment,
  FaRegComments,
  FaRegHeart,
} from "react-icons/fa";
import LinesEllipsis from "react-lines-ellipsis";
import moment from "moment";
import jwtDecode from "jwt-decode";
import { AiOutlineDelete } from "react-icons/ai";

function SingleBlog({ blogs, captionShow, handleRemoveBlog }) {
  const [blogsList, setBlogsList] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
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
              className="flex flex-col pb-3 shadow-lg border-t-2 pl-3 pt-5 border-t-orange-500 mt-5 rounded-lg sm:pt-5"
            >
              <div className="grid grid-cols-6">
                <div className="col-span-1 p-2 flex justify-center flex-row">
                  <div>
                    <Link to={`/${blog.author.username}`}>
                      <img
                        src={blog.author?.media?.image}
                        className="rounded-full sm:w-16 w-12 sm:h-16 h-10 mr-2 sm:mr-0"
                        // style={{ width: "60px", height: "60px" }}
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-span-5 flex flex-col justify-evenly">
                  <div className="grid grid-cols-5 justify-between">
                    <div className="col-span-4 flex flex-row mr-3 sm:mr-0">
                      <Link to={`/${blog.author?.username}`}>
                        <span>{blog.author?.username}</span>
                      </Link>

                      <span className="text-slate-500 text-xs pt-1 pr-3 sm:mr-0 mr-5 font-Vazirmatn">
                        {moment(blog?.created_date).fromNow()}
                      </span>
                    </div>
                    <div className="col-span-1 flex flex-row justify-end py-1 px-3">
                      {location.pathname === "/profile" && blog?.author?.username === owner && (
                        <>
                          <div
                            className="text-sm hover:cursor-pointer ml-5 mt-1"
                            onClick={(e) => handleRemoveBlog(blog?.id)}
                          >
                            <AiOutlineDelete className="text-md text-red-500" />
                          </div>
                          <div>
                            {/* <EditBlogModal postid={blog.id} /> */}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <Link to={`/thread/blog/${blog.id}`}>
                    <div className="pt-4 pl-4">
                      <h2 className="text-xl text-right pr-3 font-semibold py-2 font-Vazirmatn">
                        {blog.title}
                      </h2>

                      {captionShow === "show" ? (
                        <p className="text-xs pt-3  text-slate-700 text-justify font-Vazirmatn  pr-3 leading-5 text-ellipsis overflow-x-hidden ">
                          {blog.content}
                        </p>
                      ) : (
                        <LinesEllipsis
                          text={blog.content}
                          maxLine="1"
                          className="font-Vazirmatn text-xs text-slate-700"
                          ellipsis="..."
                          trimRight
                          basedOn="letters"
                        />
                      )}
                    </div>
                    <div className="py-2 pl-3">
                      <img src={blog.image} className="rounded-lg mt-1" />
                    </div>
                  </Link>

                  <div className="flex flex-row justify-start pb-2">
                    <div className="flex flex-row justify-start ml-20">
                      <FaRegComment className="ml-3 opacity-60" />
                      <span className="text-xs pr-2">{blog.posts.length}</span>
                    </div>
                    <div className="flex flex-row justify-start ml-20">
                      <FaRegHeart className="opacity-60" />
                      <span className="text-xs pr-2">{blog.likes}</span>
                    </div>
                    <div className="flex flex-row justify-start ml-20">
                      <FaRegComments className="opacity-60" />
                      <span className="text-xs pr-2">4</span>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-row-reverse justify-center mx-auto">
          <div class="loader"></div>
          <span className="text-md pl-3 mb-3">... loading data </span>
        </div>
      )}
    </>
  );
}

export { SingleBlog };
