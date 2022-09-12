import { Link } from "react-router-dom";

import {
  BiBell,
  BiBlanket,
  BiCartAlt,
  BiHash,
  BiHomeCircle,
  BiListUl,
  BiUser,
} from "react-icons/bi";
import { useEffect, useState } from "react";
function MenuBar() {
 
  return (
    <div className="sm:flex sm:flex-col flex flex-row justify-center sm:pr-3 sm:pt-5">
      <Link to="/home">
        <div className="flex flex-row sm:hover:text-slate-800 pb-6  pl-4 sm:pr-0 sm:pt-0 pt-4 sm:text-slate-500 text-blue-500 opacity-80 sm:opacity-100">
          {window.innerWidth > 1024 ? <BiHomeCircle className="ml-5 mb-1 text-2xl" /> :(
            <BiHomeCircle className="ml-5 mb-1" style={{fontSize:'30px'}} />
          )}
          <span
            className="text-md font-semibold pt-1 lg:block hidden sm:hidden"
            style={{ fontFamily: "Vazirmatn" }}
          >
            صفحه اصلی
          </span>
        </div>
      </Link>

      <Link to="/explore">
        <div className="flex sm:hover:text-slate-800 flex-row pb-6 pt-4 sm:pt-0 pl-4 sm:pr-0 sm:text-slate-500 text-blue-500 opacity-80 sm:opacity-100">
        {window.innerWidth > 1024 ? <BiHash className="ml-5 mb-1 text-2xl" /> :(
            <BiHash className="ml-5 mb-1" style={{fontSize:'30px'}} />
          )}
          <span
            className="text-md font-semibold pt-1 lg:block hidden sm:hidden"
            style={{ fontFamily: "Vazirmatn" }}
          >
            گشت و گذار
          </span>
        </div>
      </Link>

      <Link to="/blogs">
        <div className="flex flex-row sm:hover:text-slate-800 pb-6 pt-4 sm:pt-0 pl-4 sm:pr-0 sm:text-slate-500 text-blue-500 opacity-80 sm:opacity-100">
        {window.innerWidth > 1024 ? <BiListUl className="ml-5 mb-1 text-2xl" /> :(
            <BiListUl className="ml-5 mb-1" style={{fontSize:'30px'}} />
          )}
          <span
            className="text-md font-semibold pt-1 lg:block hidden sm:hidden"
            style={{ fontFamily: "Vazirmatn" }}
          >
            بلاگ ها
          </span>
        </div>
      </Link>

      <Link to="/products">
        <div className="flex flex-row sm:hover:text-slate-800 pb-6 pt-4 sm:pt-0 pl-4 sm:pr-0 sm:text-slate-500 text-blue-500 opacity-80 sm:opacity-100">
        {window.innerWidth > 1024 ? <BiCartAlt className="ml-5 mb-1 text-2xl" /> :(
            <BiCartAlt className="ml-5 mb-1" style={{fontSize:'30px'}} />
          )}
          <span
            className="text-md font-semibold pt-1 lg:block hidden sm:hidden"
            style={{ fontFamily: "Vazirmatn" }}
          >
            محصولات
          </span>
        </div>
      </Link>
      <Link to="/profile">
        <div className="sm:flex flex-row sm:hover:text-slate-800 pb-6 pt-4 sm:pt-0 pl-4 sm:pr-0 sm:text-slate-500 text-blue-500  hidden opacity-80 sm:opacity-100">
        {window.innerWidth > 1024 ? <BiUser className="ml-5 mb-1 text-2xl" /> :(
            <BiUser className="ml-5 mb-1" style={{fontSize:'30px'}} />
          )}
          <span
            className="text-md font-semibold pt-1 lg:block hidden sm:hidden"
            style={{ fontFamily: "Vazirmatn" }}
          >
            پروفایل
          </span>
        </div>
      </Link>
      <Link to="/notifications">
        <div className="sm:flex flex-row sm:hover:text-slate-800 pb-6 pt-4 sm:pt-0 pl-4 sm:pr-0 sm:text-slate-500 text-blue-500  hidden opacity-80 sm:opacity-100">
        {window.innerWidth > 1024 ? <BiBell className="ml-5 mb-1 text-2xl" /> :(
            <BiBell className="ml-5 mb-10" style={{fontSize:'30px'}} />
          )}
          <span
            className="text-md font-semibold pt-1 lg:block hidden sm:hidden"
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
