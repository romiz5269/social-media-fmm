import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBlogById } from "store/Reducers/Blogs/Blogs.Reducer";
import { SingleBlog,AddComment,ShowComment } from "components";

function SingleBlogDetail() {

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleBlogById(id));
  }, [id]);

  const singleBlog = useSelector((state) => state.blogs.singleBlog);


  return (
    <>
      <SingleBlog blogs={singleBlog} captionShow="show" />
      <AddComment id={singleBlog[0]?.id} />

      <ShowComment
        commentCount={singleBlog[0]?.posts?.length}
        comments={singleBlog[0]?.posts}
        postAuthor={singleBlog[0]?.author}
      />
    </>
  );
}

export { SingleBlogDetail };
