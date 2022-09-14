import { LikeComponent } from "components/Likes/LikeComponent.component";
import React from "react";
import { AiOutlineComment } from "react-icons/ai";
import { BiShare } from "react-icons/bi";
import { FaRegComments } from "react-icons/fa";

function BlogInteractions({blog,owner}) {
  return (
    <>
      <div className="flex flex-row justify-start sm:ml-14 ml-8">
        <AiOutlineComment className="ml-3 sm:opacity-60 text-lg dark:text-white" />
        <span className="text-xs pr-2 dark:text-white">
          {blog?.posts ? blog?.posts?.length : blog?.comments_count}
        </span>
      </div>
      <div className="flex flex-row justify-start sm:ml-14 ml-8">
        {/* {blog?.likes?.find((like) => like.user === owner) ? (
          <LikeComponent
            blogid={blog.id}
            isLiked={true}
            LikeCount={blog?.likes.length}
          />
        ) : (
          <LikeComponent
            blogid={blog.id}
            isLiked={false}
            LikeCount={blog?.likes?.length}
          />
        )} */}
      </div>
      <div className="flex flex-row justify-start sm:ml-14 ml-8">
        <FaRegComments className="sm:opacity-60 dark:text-white" />
        <span className="text-xs pr-2 dark:text-white"></span>
      </div>
      <div className="flex flex-row justify-start dark:text-white">
        <BiShare className="sm:opacity-60 text-lg dark:text-white" />
      </div>
    </>
  );
}

export {BlogInteractions};
