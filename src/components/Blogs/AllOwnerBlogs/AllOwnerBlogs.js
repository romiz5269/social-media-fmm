import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAllBlogsByAuthor,
  removeOwnerBlog,
  removeSingleBlog,
} from "store/Reducers/Blogs/Blogs.Reducer";
import { SingleBlog } from "../SingleBlog/SingleBlog";
import { AiOutlineFileSearch } from "react-icons/ai";
import swal from "sweetalert";


function AllOwnerBlogs() {
  const dispatch = useDispatch();
  const name = jwtDecode(localStorage.getItem("authToken")).name;
  const handleRemoveBlog = (blogid) => {
    swal({
      title: "آیا مطمئن هستید ؟",
      text: "اگر بلاگ حذف شود امکان بازیابی آن وجود نخواهد داشت!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(removeOwnerBlog(blogid));

        swal("با موفقیت حذف گردید", {
          icon: "success",
        });
      } else {
        swal("بلاگ شما در امان است");
      }
    });
  };
  useEffect(() => {
    dispatch(fetchAllBlogsByAuthor(name));
  }, []);
  const blogs = useSelector((state) => state.blogs.blogs);
  console.log(blogs)
  return (
    <div>
      {blogs.length > 0 ? (
        <SingleBlog blogs={blogs} handleRemoveBlog={handleRemoveBlog} />
      ) : (
        <div className="pt-10 text-2xl text-center flex flex-col justify-center">
          <AiOutlineFileSearch
            className="text-slate-500 mx-auto mb-5"
            style={{ fontSize: "70px" }}
          />
          <span className="text-slate-500">There is no blog to display</span>
        </div>
      )}
    </div>
  );
}

export { AllOwnerBlogs };
