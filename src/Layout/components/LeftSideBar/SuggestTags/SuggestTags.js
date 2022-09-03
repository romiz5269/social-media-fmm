import { Link } from "react-router-dom";
import { SuggestSingleTag } from "./SuggestSingleTag/SuggestSingleTag";

function SuggestTags() {
  return (
    <div className="flex flex-col rounded-lg shadow-md mt-5">
      <div className="p-3">
        <h2 className="text-slate-400 text-sm pt-5 font-Vazirmatn">هشتگ های محبوب</h2>
      </div>
      <SuggestSingleTag />
      <Link to="/popular/tags">
        <div className="text-center text-sm py-2 text-blue-700 border-t-2 z-10 font-Vazirmatn">
         مشاهده بیشتر
        </div>
      </Link>
    </div>
  );
}

export {SuggestTags}
