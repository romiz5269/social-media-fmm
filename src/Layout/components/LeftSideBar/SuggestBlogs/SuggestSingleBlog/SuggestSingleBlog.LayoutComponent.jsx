import { FaHeart } from "react-icons/fa";
import LinesEllipsis from "react-lines-ellipsis";
import { Link } from "react-router-dom";

function SuggestSingleBlog() {
  return (
    <Link to={`/thread/blog/2`}>
      <div className="grid grid-cols-12 hover:bg-slate-100 dark:hover:bg-slate-800">
        <div className="col-span-9 flex flex-col">
          <h2 className="text-[15px] mt-5 font-Vazirmatn dark:text-white text-[#33383C] font-bold">
            عنوان پست
          </h2>
          <p className="text-xs text-slate-400 py-2 text-ellipsis overflow-x-hidden font-Vazirmatn font-[300] dark:text-slate-300">
            <LinesEllipsis
              text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, harum."
              maxLine="1"
              className="font-Vazirmatn text-md text-slate-700 dark:text-slate-200 sm:pr-0 pr-3"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </p>
        </div>
        <div className="col-span-3 flex flex-row items-center justify-end ">
            <div className="flex flex-row bg-[#0F1419] px-4 py-1 rounded-full">
            <span className="text-[14px] pl-1 dark:text-white text-white">22k</span>

            <FaHeart className="text-[14px] text-white mt-1 mr-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export { SuggestSingleBlog };
