import { Link, useParams } from "react-router-dom";
import { FaEllipsisH, FaReply, FaTrash } from "react-icons/fa";
import { SingleBlog } from "../SingleBlog/SingleBlog";
import ProfileImage from "assets/images/userprofile/profile-image.webp";
import { AddComment } from "components/comments/AddComment/AddComment/AddComment";
import LinesEllipsis from "react-lines-ellipsis";
import { fetchSingleBlogById } from "store/Reducers/Blogs/Blogs.Reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ShowComment } from "components/comments/ShowComments/ShowComment";

function SingleBlogDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(fetchSingleBlogById(id))
  },[id])
  const singleBlog = useSelector(state=>state.blogs.singleBlog)
  console.log('singleBlog : ',singleBlog);
  return (
    <div>
      <SingleBlog blogs={singleBlog} captionShow ="show" />
      <AddComment id={singleBlog[0]?.id} />

      <ShowComment commentCount = {singleBlog[0]?.posts?.length} comments ={singleBlog[0]?.posts} postAuthor={singleBlog[0]?.author} />
    </div>
  );
}

export { SingleBlogDetail };
