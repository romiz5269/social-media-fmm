import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { createALike } from "store/Reducers/Blogs/Blogs.Reducer";
import numberToPersian from "utils/toPersianNumbers/toPersianNumbers";
// import { createALike, removeLike } from "store/Reducers/Blogs/Blogs.Reducer";

function LikeComponent({ blogid, isLiked, LikeCount }) {
  const [hasLiked, setHasLiked] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(LikeCount);
  const dispatch = useDispatch();
  const handleAddLike = (id) => {
    setHasLiked(true);
    setLikesCount(likesCount + 1);
    dispatch(createALike(id));
  };

  const handleRemoveLike = (postid) => {
    setHasLiked(false);
    setLikesCount(likesCount - 1);
    dispatch(createALike(postid));
  };

  if (hasLiked) {
    return (
      <div className="hover:bg-red-200 dark:hover:bg-black rounded-full flex flex-row px-2 py-1 hover:cursor-pointer">
        <AiFillHeart
          className=" hover:cursor-pointer text-xl dark:text-white text-[#8e9ba2]"
          style={{ color: "#ce1126", opacity: 1 }}
          onClick={(e) => handleRemoveLike(blogid)}
        />
        <span className="text-xs pr-2 dark:text-white font-Vazirmatn">
          {likesCount && numberToPersian(likesCount)}
        </span>
      </div>
    );
  } else {
    return (
      <div className="hover:bg-slate-200 dark:hover:bg-black rounded-full flex flex-row px-2 py-1">
        <AiOutlineHeart
          className=" hover:cursor-pointer text-xl dark:text-white text-[#8e9ba2]"
          onClick={(e) => handleAddLike(blogid)}
        />
        <span className="text-xs pr-2 dark:text-white font-Vazirmatn">
          {likesCount && numberToPersian(likesCount)}
        </span>
      </div>
    );
  }
}

export { LikeComponent };
