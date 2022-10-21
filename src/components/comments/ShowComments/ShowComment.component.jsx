import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOwnerProfile } from "store/Reducers/Users/UsersReducer";
import jwtDecode from "jwt-decode";
import { FaEllipsisH, FaReply, FaTrash } from "react-icons/fa";
import swal from "sweetalert";
import { removeSingleComment } from "store/Reducers/Blogs/Blogs.Reducer";

const ShowComment = React.forwardRef(({ comments, author }, ref) => {
  console.log(comments);
  const [isOwner, setIsOwner] = useState(false);
  const dispatch = useDispatch();
  const owner = jwtDecode(localStorage.getItem("authToken"));
  useEffect(() => {
    dispatch(fetchOwnerProfile(owner.user_id));
  }, []);
  console.log(owner)
  console.log(
    `owner:${owner}`,
    `commenter:${comments?.commenter?.username}`,
    `author:${author?.username}`
  );
  const miniProfile = useSelector((state) => state.users.ownerUser);
  const handleRemoveComment = (id) => {
    console.log("clicked");
    swal({
      title: "آیا مطمئن هستید ؟",
      text: "کامنت موردنظر پاک خواهد شد و قابل بازگردانی نخواهد بود",
      className: "font-Vazirmatn",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(removeSingleComment({ postId: id, commentId: comments.id }));

        swal("با موفقیت حذف گردید", {
          icon: "success",
        });
      }
    });
  };
  const commentBody = (
    <>
      {comments && (
        <div className="grid grid-cols-6 py-4"
        >
          <div className="col-span-1  flex justify-center flex-row">
            <div>
              <Link to="/user/mohammadreza">
                <img
                  src={comments.commenter?.media?.image}
                  className="rounded-full"
                  style={{ width: "70px", height: "70px" }}
                />
              </Link>
            </div>
          </div>
          <div className="col-span-5">
            <div className="grid grid-cols-5 justify-between">
              <div className="col-span-4 flex flex-row">
                <Link to="/user/mohammadreza">
                  <span>{comments.commenter?.username}</span>
                </Link>

                <span className="text-slate-500 text-xs pt-1 pr-3">
                  5 ساعت پیش
                </span>
              </div>
              <div className="col-span-1 flex flex-row justify-end py-1 px-3">
                <FaEllipsisH className="mt-1 text-sm text-slate-600" />
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs  text-slate-700 text-justify  pl-5 font-Vazirmatn leading-5 overflow-x-hidden overflow-y-hidden text-ellipsis">
                {comments.body}
              </p>
            </div>
            <div className="pt-2 flex flex-row justify-end pl-8">
              <FaReply className="text-slate-400 text-sm hover:text-slate-800 hover:cursor-pointer" />
              {author.username === comments.commenter?.username ||
              owner.name === comments.commenter?.username ? (
                <FaTrash
                  onClick={(e) => handleRemoveComment(comments?.id)}
                  className="text-slate-400 text-sm mr-5 hover:text-red-600 hover:cursor-pointer"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}

      {/* <div className="flex flex-row justify-start pr-8 pt-5 pb-5"></div>
        <div className="grid grid-cols-6 pr-8 pl-3">
          <div className="col-span-1 p-2 flex justify-center flex-row">
            <div>
              <Link to="/user/mohammadreza">
                <img
                  src="#"
                  className="rounded-full"
                  style={{ width: "60px", height: "60px" }}
                />
              </Link>
            </div>
          </div>
          <div className="col-span-5">
            <div className="grid grid-cols-5 justify-between">
              <div className="col-span-4 flex flex-row">
                <Link to="/user/mohammadreza">
                  <span>{comments.author?.username}</span>
                </Link>

                <span className="text-slate-500 text-xs pt-1 pr-3">
                  5 ساعت پیش
                </span>
              </div>
              <div className="col-span-1 flex flex-row justify-end py-1 px-3">
                <FaEllipsisH className="mt-1 text-sm text-slate-600" />
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs  text-slate-700 text-justify font-Vazirmatn  pl-5 leading-5 overflow-x-hidden overflow-y-hidden text-ellipsis">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
              </p>
              <LinesEllipsis
                text="
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی"
                maxLine="1"
                className="font-Vazirmatn text-xs text-slate-700"
                ellipsis="..."
                trimRight
                basedOn="letters"
              />
            </div>
            <div className="pt-2  flex flex-row justify-end pl-8">
              <FaReply className="text-slate-400 text-sm hover:text-slate-800 hover:cursor-pointer" />
              <FaTrash className="text-slate-400 text-sm mr-5 hover:text-red-600 hover:cursor-pointer" />
            </div>
          </div>
        </div> */}
    </>
  );
  const content = ref ? (
    <article ref={ref}>{commentBody}</article>
  ) : (
    <article>{commentBody}</article>
  );

  return content;
});

export { ShowComment };
