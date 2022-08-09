import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SuggestSingleBlog } from "./SuggestSingleBlog/SuggestSingleBlog";

function SuggestBlogs() {
  return (
    <div className="flex flex-col rounded-md shadow-xl ">
      <div className="p-3">
        <h2
          className="text-slate-400 text-sm pt-5"
          style={{ fontFamily: "Vazirmatn" }}
        >
          بلاگ های محبوب
        </h2>
      </div>

      <SuggestSingleBlog />
      <SuggestSingleBlog />
      <Link to="/popular/blogs">
        <div
          className="text-center py-3 text-blue-700 text-sm border-t-2 z-10"
          style={{ fontFamily: "Vazirmatn" }}
        >
          مشاهده بیشتر
        </div>
      </Link>
    </div>
  );
}

export { SuggestBlogs };
