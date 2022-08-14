import { Link } from "react-router-dom";
import {
  FaHome,
  FaHashtag,
  FaClipboardList,
  FaShoppingBag,
  FaRegBell,
} from "react-icons/fa";

function MenuBar() {
  return (
    <div className="sm:flex sm:flex-col flex flex-row justify-center sm:pr-3">
      <Link to="/home">
        <div className="flex flex-row sm:hover:bg-slate-100 pb-4 pl-4 sm:pr-0 sm:pt-0 pt-4 sm:text-slate-500 text-orange-500 opacity-80 sm:opacity-100">
          <FaHome className="ml-5 text-2xl" />
          <span
            className="text-xl lg:block hidden sm:hidden"
            style={{ fontFamily: "Vazirmatn" }}
          >
            صفحه اصلی
          </span>
        </div>
      </Link>

      <Link to="/explore">
        <div className="flex sm:hover:bg-slate-100 flex-row py-4 pl-4 sm:pr-0 sm:text-slate-500 text-orange-500 opacity-80 sm:opacity-100">
          <FaHashtag className="ml-5 text-2xl" />
          <span
            className="text-xl lg:block hidden sm:hidden"
            style={{ fontFamily: "Vazirmatn" }}
          >
            گشت و گذار
          </span>
        </div>
      </Link>

      <Link to="/blogs">
        <div className="flex flex-row sm:hover:bg-slate-100 py-4 pl-4 sm:pr-0 sm:text-slate-500 text-orange-500 opacity-80 sm:opacity-100">
          <FaClipboardList className="ml-5 text-2xl" />
          <span
            className="text-xl lg:block hidden sm:hidden"
            style={{ fontFamily: "Vazirmatn" }}
          >
            بلاگ ها
          </span>
        </div>
      </Link>

      <Link to="/products">
        <div className="flex flex-row sm:hover:bg-slate-100 py-4 pl-4 sm:pr-0 sm:text-slate-500 text-orange-500 opacity-80 sm:opacity-100">
          <FaShoppingBag className="ml-5 text-2xl" />
          <span
            className="text-xl lg:block hidden sm:hidden"
            style={{ fontFamily: "Vazirmatn" }}
          >
            محصولات
          </span>
        </div>
      </Link>
      <Link to="/notifications">
        <div className="sm:flex flex-row sm:hover:bg-slate-100 py-4 pl-4 sm:pr-0 sm:text-slate-500 text-orange-500  hidden opacity-80 sm:opacity-100">
          <FaRegBell className="ml-5 text-2xl" />
          <span
            className="text-xl lg:block hidden sm:hidden"
            style={{ fontFamily: "Vazirmatn" }}
          >
            اعلان ها
          </span>
        </div>
      </Link>
    </div>
  );
}

export { MenuBar };
