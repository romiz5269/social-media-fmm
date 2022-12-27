import { LikeComponent } from "components/Likes/LikeComponent.component";
import React from "react";
import { BiShareAlt } from "react-icons/bi";
import { GoComment, GoCommentDiscussion } from "react-icons/go";
import numberToPersian from "utils/toPersianNumbers/toPersianNumbers";


function BlogInteractions({ blog, owner }) {
  return (
    <>
      <div className="flex flex-row justify-start ml-8">
        <div className="flex flex-row dark:hover:bg-black hover:bg-slate-200 rounded-full  px-2 py-1 hover:cursor-pointer">
          <GoComment className="ml-1 text-xl dark:text-white text-[#8e9ba2] hover:text-green-600" />
          <span className="text-xs pr-2 dark:text-white font-Vazirmatn">
            {blog?.comment?.length >= 0 &&
              numberToPersian(blog?.comment?.length)}
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-start  ml-8">
        {blog?.youliked ? (
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
      <div className="flex flex-row justify-start  ml-8 sm:px-2 sm:py-1">
        <GoCommentDiscussion className="dark:text-white text-xl text-[#8e9ba2]" />
        <span className="text-xs pr-2 dark:text-white"></span>
      </div>
      <div className="flex flex-row justify-start dark:text-white">
        <BiShareAlt className=" dark:text-white text-xl text-[#8e9ba2]" />
      </div>
    </>
  );
}

export { BlogInteractions };
