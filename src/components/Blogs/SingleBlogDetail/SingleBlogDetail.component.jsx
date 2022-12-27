import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCommentsOfPost } from "store/Reducers/Comments/Comments.Reducer";
import { SingleBlog, AddComment, CommentsList } from "components";
import { useState } from "react";
import { fetchSingleBlogById } from "store/Reducers/Blogs/Blogs.Reducer";

function SingleBlogDetail() {
  const [pageNum, setPageNum] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleBlogById(id));
  }, [id]);
  const singleBlog = useSelector((state) => state.blogs.singleBlog);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    dispatch(
      fetchAllCommentsOfPost({
        pageNum: pageNum,
        postId: singleBlog[0]?.id,
        options: { signal },
      })
    );

    return () => controller.abort();
  }, [pageNum, dispatch]);
  const comments = useSelector((state) => state.comments.comments);

  console.log("singleBlog", singleBlog);
  return (
    <>
      <SingleBlog blogs={singleBlog} captionShow="show" />
      <AddComment id={singleBlog[0]?.id} commenter={singleBlog[0]?.author} />

      {singleBlog.length > 0 && (
        <CommentsList
          postId={singleBlog[0]?.id}
          author={singleBlog[0]?.author}
        />
      )}
    </>
  );
}

export { SingleBlogDetail };
