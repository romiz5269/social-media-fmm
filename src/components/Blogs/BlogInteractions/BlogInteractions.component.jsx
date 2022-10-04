import { LikeComponent } from "components/Likes/LikeComponent.component";
import React from "react";
import { AiOutlineComment } from "react-icons/ai";
import { BiShare, BiShareAlt } from "react-icons/bi";
import { FaRegComments, FaRetweet } from "react-icons/fa";

function BlogInteractions({ blog, owner }) {
  console.log('owner :::=>',blog.user_likes)
  return (
    <>
      <div className="flex flex-row justify-start sm:ml-14 ml-8">
        <div className="flex flex-row dark:hover:bg-black hover:bg-slate-200 rounded-full  px-2 py-1 hover:cursor-pointer">
          <AiOutlineComment className="ml-1 sm:opacity-60 text-xl dark:text-white" />
          <span className="text-xs pr-2 dark:text-white">
            {blog?.comment ? blog?.comment?.length : blog?.comments_count}
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-start sm:ml-14 ml-12">
        {blog?.user_likes?.find((like) => like === owner) ? (
          <LikeComponent
            blogid={blog.id}
            isLiked={true}
            LikeCount={blog?.user_likes.length}
          />
        ) : (
          <LikeComponent
            blogid={blog.id}
            isLiked={false}
            LikeCount={blog?.user_likes?.length}
          />
        )}
      </div>
      <div className="flex flex-row justify-start sm:ml-14 ml-8">
        <FaRetweet className="sm:opacity-60 dark:text-white text-xl" />
        <span className="text-xs pr-2 dark:text-white"></span>
      </div>
      <div className="flex flex-row justify-start dark:text-white">
        <BiShareAlt className="sm:opacity-60 dark:text-white text-xl" />
      </div>
    </>
  );
}

export { BlogInteractions };
