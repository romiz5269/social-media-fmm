import { FaHashtag } from "react-icons/fa";

function SuggestSingleTag() {
  return (
    <div className="grid grid-cols-5 hover:bg-slate-100 py-5 pl-5">
      <div className="col-span-4 flex flex-row pr-3">
        <span className="pt-2">
          <FaHashtag className="text-2xl text-slate-500 opacity-50" />
        </span>
        <span className="text-sm pr-3 pt-2 overflow-x-hidden text-ellipsis">
          Apple
        </span>
      </div>
      <div className="col-span-1">
        <button className="text-xs px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full shadow-md">
          Follow
        </button>
      </div>
    </div>
  );
}

export {SuggestSingleTag}
