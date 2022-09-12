import useCheckThemeMode from "hooks/useCheckThemeMode.hook";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SuggestSingleBlog } from "./SuggestSingleBlog/SuggestSingleBlog";

function SuggestBlogs() {
  const { theme } = useCheckThemeMode();
  return (
    <div
      className="flex flex-col rounded-md shadow-xl"
      style={theme ? { backgroundColor: "#36393f" } : {}}
    >
      <div className="px-3 pb-3">
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
          className="text-center py-3 text-blue-700 dark:text-green-500 text-sm border-t-2 z-10"
          style={{ fontFamily: "Vazirmatn" }}
        >
          مشاهده بیشتر
        </div>
      </Link>
    </div>
  );
}

export { SuggestBlogs };
