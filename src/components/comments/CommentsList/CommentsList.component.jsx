import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCommentsOfPost,
  setFetchError,
  setIsLoading,
} from "store/Reducers/Blogs/Blogs.Reducer";
import { ShowComment } from "../ShowComments/ShowComment.component";

function CommentsList({ postId, author }) {
  console.log(postId);
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);

  const isLoading = useSelector((state) => state.blogs.isLoading);
  const isError = useSelector((state) => state.blogs.isError);
  const hasNextPage = useSelector((state) => state.blogs.hasNextPage);
  const fetchError = useSelector((state) => state.blogs.fetchError);

  useEffect(() => {
    dispatch(setIsLoading(false));
    dispatch(setFetchError({}));
    const controller = new AbortController();
    const { signal } = controller;

    dispatch(
      fetchAllCommentsOfPost({
        pageNum: pageNum,
        options: { signal },
        postId: postId,
      })
    );

    return () => controller.abort();
  }, [pageNum, dispatch]);

  const intObserver = useRef();
  const lastBlogRef = useCallback(
    (comments) => {
      console.log("ran");
      if (isLoading) return <div>Loading...</div>;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((comments) => {
        console.log(comments);
        if (comments[0].isIntersecting) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (comments) intObserver.current.observe(comments);
    },
    [isLoading, hasNextPage]
  );
  const comments = useSelector((state) => state.blogs.comments);
  console.log("comments : ", comments);
  if (isError) return <p>Error : {fetchError}</p>;

  if (!comments?.length)
    return (
      <div className="pt-10 text-2xl text-center flex flex-col justify-center">
        <AiOutlineFileSearch
          className="text-slate-500 mx-auto mb-5"
          style={{ fontSize: "70px" }}
        />
        <span className="text-slate-500 font-Vazirmatn">
          هنوز هیچ نظری برای این بلاگ ثبت نشده است
        </span>
      </div>
    );
  const content = comments?.map((comment, i) => {
    if (comments?.length === i + 1) {
      return (
        <ShowComment
          ref={lastBlogRef}
          key={comment.id}
          comments={comment}
          author={author}
        />
      );
    }

    return <ShowComment key={comment.id} comments={comment} author={author} />;
  });
  return (
    <div
      className="flex flex-col px-4 "
      style={{ borderTop: "2px solid #f6f6f6" }}
    >
      {isLoading ? <p>Loading More Blogs ...</p> : content}
    </div>
  );
}

export { CommentsList };
