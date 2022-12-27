import { UserAvatar } from "components";
import moment from "moment";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import LinesEllipsis from "react-lines-ellipsis";
import { Link, useLocation } from "react-router-dom";
import { BlogInteractions } from "components";
import { EditBlogModal } from "components";

function BlogsInfo({ blog, owner, captionShow, handleRemoveBlog }) {
  const location = useLocation();
  return (
    <>
      <div className="col-span-1 p-2 flex justify-center flex-row">
        <div>
          <Link to={`/${blog.author.username}`}>
            <UserAvatar blog={blog} />
          </Link>
        </div>
      </div>
      <div className="col-span-5 flex flex-col justify-evenly">
        <div className="grid grid-cols-5 justify-between">
          <div className="col-span-4 flex flex-row mr-3 sm:mr-0 pt-1">
            <Link to={`/${blog.author?.username}`}>
              <span className="font-semibold text-[20px] dark:text-white">
                {blog.author?.username}
              </span>
            </Link>

            <span
              className="text-slate-500 dark:text-slate-300 text-sm pr-3 sm:mr-0 mr-5 font-Vazirmatn"
              style={{ paddingTop: "5.5px" }}
            >
              {moment(blog?.created_date).fromNow()}
            </span>
          </div>
          <div className="col-span-1 flex flex-row justify-end py-1 px-3">
            {location.pathname === "/profile" &&
              blog?.author?.username === owner && (
                <>
                  <div
                    className="text-sm hover:cursor-pointer ml-5 mt-1"
                    onClick={(e) => handleRemoveBlog(blog?.id)}
                  >
                    <AiOutlineDelete className="text-md text-red-500" />
                  </div>
                  <div>
                    <EditBlogModal postid={blog.id} />
                  </div>
                </>
              )}
          </div>
        </div>
        <Link to={`/thread/blog/${blog.id}`}>
          <div className="pl-4">
            <h2 className="text-xl text-right  font-semibold py-2 font-Vazirmatn">
              {blog.title}
            </h2>

            {captionShow === "show" ? (
              <p
                className="text-sm pt-3 dark:text-slate-300  text-slate-700 text-justify font-Vazirmatn  pr-3"
                style={{ height: "auto", fontWeight: "300" }}
              >
                {blog?.content}
              </p>
            ) : (
              <LinesEllipsis
                text={blog?.content}
                maxLine="3"
                className="font-Vazirmatn text-sm text-slate-700 dark:text-slate-300"
                ellipsis="..."
                trimRight
                basedOn="letters"
              />
            )}
          </div>
          <div className="py-2 pl-3">
            <img
              alt=""
              src={blog.image}
              className="rounded-[10px] mt-1 border-2"
              style={{ height: "275px", width: "100%" }}
            />
          </div>
        </Link>

        <div className="flex flex-row flex-wrap justify-around pt-2">
          <BlogInteractions blog={blog} owner={owner} />
        </div>
      </div>
    </>
  );
}

export { BlogsInfo };
