import ProfileImage from "assets/images/userprofile/profile-image.webp";
import { Link } from "react-router-dom";

function SuggestSingleUser() {
  return (
    <div className="grid grid-cols-12 hover:bg-slate-100 dark:hover:bg-slate-800 py-4">
      <div className="col-span-8 flex flex-row items-center">
        <Link to="#">
          <img
            src={ProfileImage}
            style={{ width: "50px", height: "50px" }}
            className="rounded-full"
          />
        </Link>

        <span className="text-[14px] text-[#0f1419] font-[500] pt-2 pr-4 overflow-x-hidden text-ellipsis dark:text-white">
          <Link to="#">MohammadReza</Link>
        </span>
      </div>
      <div className="col-span-4 flex flex-row items-center justify-end ">
        <button className="text-[13.5px] font-bold px-4 py-[6px] bg-[#0f1419] text-white rounded-full shadow-md">
          دنبال کردن
        </button>
      </div>
    </div>
  );
}

export { SuggestSingleUser };
