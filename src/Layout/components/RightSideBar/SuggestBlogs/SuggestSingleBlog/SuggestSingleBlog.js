import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function SuggestSingleBlog() {
  return (
    <Link to={`/thread/blog/2`}>
      <div className="grid grid-cols-5 hover:bg-slate-100">
        <div className="col-span-4 flex flex-col ">
          <h2 className="text-sm mt-5 pr-5 font-Vazirmatn">عنوان پست</h2>
          <p className="text-xs text-slate-500 py-2 pr-5 text-ellipsis overflow-x-hidden font-Vazirmatn">
            Post
            captionsdklfsdkfjlsdjfksdjfkdskfdsfkljdsfksdflsdfksdjkjflsdfkdsjfkljdsklfjklf
          </p>
        </div>
        <div className="col-span-1 flex flex-row items-center">
          <span className="text-xs pl-1">22k</span>

          <FaHeart className="text-xs" />
        </div>
      </div>
    </Link>
  );
}

export {SuggestSingleBlog}
