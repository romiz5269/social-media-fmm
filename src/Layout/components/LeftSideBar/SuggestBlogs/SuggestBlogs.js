import { Link } from "react-router-dom";
import { SuggestSingleBlog } from "./SuggestSingleBlog/SuggestSingleBlog";

function SuggestBlogs() {
  return (
    <div className="flex flex-col rounded-lg shadow-md " style={{border:'1px solid #e7e7e7'}}>
      <div className="py-3 px-5" style={{borderBottom:'1px solid #e7e7e7'}}>
        <h2
          className="text-slate-400 text-sm"
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
