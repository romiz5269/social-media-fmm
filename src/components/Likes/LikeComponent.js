import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
// import { createALike, removeLike } from "store/Reducers/Blogs/Blogs.Reducer";

function LikeComponent({ blogid, isLiked, LikeCount }) {
  const [hasLiked, setHasLiked] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(LikeCount);
  const dispatch = useDispatch();
  const handleAddLike = (id) => {
    setHasLiked(true);
    setLikesCount(likesCount + 1);
    // dispatch(createALike(id));
  };

  const handleRemoveLike = (postid) => {
    setHasLiked(false);
    setLikesCount(likesCount - 1);
    // dispatch(removeLike(postid));
  };

  if (hasLiked) {
    return (
      <>
        <AiFillHeart
          className=" hover:cursor-pointer text-lg"
          style={{ color: "#ce1126", opacity: 1 }}
          onClick={(e) => handleRemoveLike(blogid)}
        />
        <span className="text-xs pr-2">{likesCount}</span>
      </>
    );
  } else {
    return (
      <>
        <AiOutlineHeart
          className=" hover:cursor-pointer text-lg opacity-60"
          onClick={(e) => handleAddLike(blogid)}
        />
        <span className="text-xs pr-2">{likesCount}</span>
      </>
    );
  }
}

export { LikeComponent };
