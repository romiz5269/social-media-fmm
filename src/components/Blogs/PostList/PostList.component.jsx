import React,{useState} from 'react'
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import useCheckThemeMode from "hooks/useCheckThemeMode.hook";
import { EditBlogModal, BlogInteractions } from "components";
import jwtDecode from "jwt-decode";
import moment from "moment";
import LinesEllipsis from "react-lines-ellipsis";
import {

  AiOutlineDelete,
  AiOutlineWarning,
} from "react-icons/ai";

const LikedStyle = {
  color: "#ce1126",
  opacity: 1,
};

const PostList = React.forwardRef(({ blogs,handleRemoveBlog},ref) => {
    const {theme} = useCheckThemeMode();
    const [anchorEl, setAnchorEl] = useState(null);
    const [blogsList, setBlogsList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState([]);
    let ownerLiked = false;
    const dispatch = useDispatch();
    const captionShow = false;
    const owner = jwtDecode(localStorage.getItem("authToken"));
    const location = useLocation();
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    // function for interaction with like of blog
    const handleAddLike = (id) => {
      setIsLiked(true);
      // dispatch(createALike(id));
    };

    const handleRemoveLike = (postid) => {
      // dispatch(removeLike(postid));
    };

    const open = Boolean(anchorEl);
    const popoverid = open ? "simple-popover" : undefined;

    const BlogBody = (
      <>
        <div
          key={blogs.id}
          className="flex flex-col pb-3 sm:pt-2  sm:mb-0"
          style={
            theme
              ? { borderTop: "1px solid #bcbcbc" }
              : {
                  borderTop: "1px solid #e7e7e7",
                  borderBottom: "1px solid #e7e7e7",
                }
          }
        >
          <div className="grid grid-cols-6">
            <div className="col-span-1 sm:p-2 pt-10 flex justify-center flex-row">
              <div>
                <Link to={`/${blogs?.user}`}>
                  <img
                    src={blogs.user_image}
                    className="rounded-full sm:w-12 w-[70px] sm:h-12 h-[70px]  sm:mr-0"
                  />
                </Link>
              </div>
            </div>
            <div className="col-span-5 flex flex-col justify-evenly">
              <div className="grid grid-cols-5 justify-between">
                <div className="col-span-4 flex flex-row mr-3 sm:mr-0">
                  <Link to={`/${blogs?.user}`}>
                    <span className="font-semibold text-xl dark:text-white">
                      {blogs?.author?.username}
                    </span>
                  </Link>

                  <span
                    className="text-slate-500 dark:text-slate-300 text-sm pr-3 sm:mr-0 mr-5 font-Vazirmatn"
                    style={{ paddingTop: "5.5px" }}
                  >
                    {moment(blogs?.created_time).fromNow()}
                  </span>
                </div>
                <div className="col-span-1 flex flex-row justify-end py-1 px-3">
                  {location.pathname === "/profile" && blogs.author.username === owner.name && (
                    <>
                      <div
                        className="text-sm hover:cursor-pointer ml-5 mt-1"
                        onClick={(e) => handleRemoveBlog(blogs?.id)}
                      >
                        <AiOutlineDelete className="text-lg text-red-500" />
                      </div>
                      <div>
                        <EditBlogModal postid={blogs.id} />
                      </div>
                    </>
                  )}

                  {blogs.author.username !== owner.name && (
                    <div>
                      <div className="text-sm flex flex-row">
                        <span className="text-xs text-yellow-600">Report</span>
                        <AiOutlineWarning className="text-lg mr-2 text-yellow-600" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Link to={`/thread/blog/${blogs?.id}`}>
                <div className="pl-4">
                  <h2 className="text-xl text-right dark:text-white font-semibold py-3 sm:px-0 px-3 font-Vazirmatn">
                    {blogs?.title}
                  </h2>

                  {captionShow === "show" ? (
                    <p
                      className="text-md pt-3  text-slate-700 text-justify font-Vazirmatn dark:text-slate-200  pr-3"
                      style={{ height: "auto", fontWeight: "300" }}
                    >
                      {blogs?.content}
                    </p>
                  ) : (
                    <LinesEllipsis
                      text={blogs?.content}
                      maxLine="3"
                      className="font-Vazirmatn text-md text-slate-700 dark:text-slate-200 sm:pr-0 pr-3"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                    />
                  )}
                </div>
                {blogs?.image && (
                  <div className="py-2 pl-3">
                    <img
                      src={blogs?.image}
                      className="rounded-lg mt-1 border-2 w-full"
                      style={{ height: "250px" }}
                    />
                  </div>
                )}
              </Link>

              <div className="flex flex-row flex-wrap justify-start pb-2 pt-5">
                <BlogInteractions blog={blogs} owner={owner.user_id} />
              </div>
            </div>
          </div>
        </div>
      </>
    );

    const content = ref ? <article ref={ref}>{BlogBody}</article>
    : <article>{BlogBody}</article>

    return content
  }
);

export { PostList };
