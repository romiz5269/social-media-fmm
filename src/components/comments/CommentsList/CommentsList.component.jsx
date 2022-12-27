import { BlogLoader } from "components/Loading/BlogLoader/BlogLoader";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { BiMessageSquareError } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCommentsOfPost,

  setIsLoading,
} from "store/Reducers/Comments/Comments.Reducer";
import { ShowComment } from "../ShowComments/ShowComment.component";

function CommentsList({ postId, author }) {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);

  const hasNextPage = useSelector((state) => state.comments.hasNextPage);
  const error = useSelector((state) => state.comments.error);
  useEffect(() => {

    const controller = new AbortController();
    const { signal } = controller;
    dispatch(
      fetchAllCommentsOfPost({
        postId: postId,
        pageNum: pageNum,
        options: { signal },
      })
    );

    return () => controller.abort();
  }, [pageNum, dispatch]);

  const isLoading = useSelector((state) => state.comments.isLoading);

  const intObserver = useRef();
  const lastBlogRef = useCallback(
    (comment) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((comments) => {

        if (comments[0].isIntersecting) {
          dispatch(setIsLoading(true));
          setPageNum((prev) => prev + 1);
        }
      });
      if (comment) {
        intObserver.current.observe(comment);
      }
    },
    [isLoading, hasNextPage]
  );
  const comments = useSelector((state) => state.comments.comments);

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
    } else {
      return (
        <ShowComment key={comment.id} comments={comment} author={author} />
      );
    }
  });
  return (
    <div style={{ borderTop: "1px solid #e8e8e8" }}>
      <div className="w-full flex flex-row justify-start p-3 border-b-2 border-dashed">
        <h3>نظرات کاربران</h3>
      </div>
      {content ? (
        <>
          {content}
          {error ? (
            <div className="py-5 text-center flex flex-col justify-center items-center">
              <div className="flex flex-col items-center justify-center">
                <BiMessageSquareError className="text-[60px] text-slate-400" />
                <span className="text-2xl pt-4 text-slate-400 font-bold">
                  {error}
                </span>
              </div>
            </div>
          ) : (
            <BlogLoader />
          )}
        </>
      ) : (
        <div>مشکلی رخ داده است</div>
      )}
    </div>
  );
}

export { CommentsList };
