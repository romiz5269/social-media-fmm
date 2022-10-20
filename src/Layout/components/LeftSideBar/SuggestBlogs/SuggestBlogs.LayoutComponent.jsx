import useCheckThemeMode from "hooks/useCheckThemeMode.hook";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SuggestSingleBlog } from "./SuggestSingleBlog/SuggestSingleBlog.LayoutComponent";

function SuggestBlogs() {
  const { theme } = useCheckThemeMode();
  return (
    <div
      className="flex flex-col rounded-b-[20px] bg-[#F7F9F9] px-4"
      style={theme ? { backgroundColor: "#36393f" } : {}}
    >
      <div className="pb-3">
        <h2
          className="text-[#606F7B] text-sm pt-3"
          style={{ fontFamily: "Vazirmatn" }}
        >
          بلاگ های محبوب
        </h2>
      </div>

      <SuggestSingleBlog />
      <SuggestSingleBlog />
      <Link to="/popular/blogs">
        <div
          className="text-start py-5 text-blue-400 dark:text-green-500 text-sm z-10 font-[300]"
          style={{ fontFamily: "Vazirmatn" }}
        >
          مشاهده بیشتر
        </div>
      </Link>
    </div>
  );
}

export { SuggestBlogs };
