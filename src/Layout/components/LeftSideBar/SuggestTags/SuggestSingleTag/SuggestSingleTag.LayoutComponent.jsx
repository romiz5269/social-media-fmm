import { FaHashtag } from "react-icons/fa";

function SuggestSingleTag() {
  return (
    <div className="grid grid-cols-12 hover:bg-slate-100 dark:hover:bg-slate-800 py-4">
      <div className="col-span-8 flex flex-row">
        <span className="pt-2">
          <FaHashtag className="text-2xl text-slate-500 opacity-50" />
        </span>
        <span className="text-[15px] font-bold pr-3 pt-2 text-[#0f1419] overflow-x-hidden text-ellipsis dark:text-white">
          Apple
        </span>
      </div>
      <div className="col-span-4 flex flex-row items-center justify-end">
        <button className="text-[13.5px] font-bold px-4 py-[6px] bg-[#0f1419] text-white rounded-full shadow-md">
          دنبال کردن
        </button>
      </div>
    </div>
  );
}

export { SuggestSingleTag };
