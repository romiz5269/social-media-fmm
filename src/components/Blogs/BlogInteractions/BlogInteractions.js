import { LikeComponent } from "components/Likes/LikeComponent";
import React from "react";
import { AiOutlineComment } from "react-icons/ai";
import { BiShare } from "react-icons/bi";
import { FaRegComments } from "react-icons/fa";

function BlogInteractions({blog,owner}) {
  return (
    <>
      <div className="flex flex-row justify-start sm:ml-14 ml-8">
        <AiOutlineComment className="ml-3 opacity-60 text-lg" />
        <span className="text-xs pr-2">{blog?.posts?.length}</span>
      </div>
      <div className="flex flex-row justify-start sm:ml-14 ml-8">
        {blog?.posts.find((like) => like.user === owner) ? (
          <LikeComponent
            blogid={blog.id}
            isLiked={true}
            LikeCount={blog?.posts.length}
          />
        ) : (
          <LikeComponent
            blogid={blog.id}
            isLiked={false}
            LikeCount={blog?.posts?.length}
          />
        )}
      </div>
      <div className="flex flex-row justify-start sm:ml-14 ml-8">
        <FaRegComments className="opacity-60" />
        <span className="text-xs pr-2">4</span>
      </div>
      <div className="flex flex-row justify-start">
        <BiShare className="opacity-60 text-lg" />
      </div>
    </>
  );
}

export {BlogInteractions};
