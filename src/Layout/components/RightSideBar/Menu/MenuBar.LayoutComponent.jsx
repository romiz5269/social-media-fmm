import { Link, useNavigate } from "react-router-dom";

import {
  BiBell,
  BiCartAlt,
  BiCog,
  BiHash,
  BiHomeCircle,
  BiListUl,
  BiLogOutCircle,
  BiUser,
} from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { userLogout } from "api/Users/Users.api";
import { UserLogout } from "store/Reducers/Users/UsersReducer";
import { axiosPrivate } from "services/Private/axiosPrivate";
import { URL } from "config/Urls/Urls.config";
function MenuBar() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleLogout = () => {
    swal({
      title: "آیا برای خروج از حساب اطمینان دارید ؟",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axiosPrivate.post(URL.LOGOUT).then((res) => {
          localStorage.removeItem("authToken");
          Navigate("/login");
        });
      }
    });
  };
  return (
    <div className="md:flex md:flex-col flex flex-row md:justify-center justify-around py-3  w-[100%] md:pr-3 md:pt-5">
      <div className="flex flex-row md:hover:text-slate-800 md:pb-8  md:pl-4 md:pr-0 md:pt-0  text-slate-500  opacity-80 md:opacity-100">
        {window.innerWidth > 1024 ? (
          <Link to="/home">
            <BiHomeCircle className="ml-5 md:mb-1 mt-1 text-3xl dark:text-white text-[#282c30]" />
          </Link>
        ) : (
          <Link to="/home">
            <BiHomeCircle
              className=" dark:text-white text-[#0F1419]"
              style={{ fontSize: "30px" }}
            />
          </Link>
        )}
        <span
          className="text-[20px] font-[550] pt-1 lg:block hidden md:hidden dark:text-white text-[#0F1419]"
          style={{ fontFamily: "Vazirmatn" }}
        >
          <Link to="/home">صفحه اصلی</Link>
        </span>
      </div>

      <div className="flex md:hover:text-slate-800 flex-row md:pb-8 md:pl-4 md:pr-0 md:pt-0  text-slate-500 opacity-80 md:opacity-100">
        {window.innerWidth > 1024 ? (
          <Link to="/explore">
            <BiHash className="ml-5 mb-1 mt-1 text-3xl dark:text-white text-[#282c30]" />
          </Link>
        ) : (
          <Link to="/explore">
            <BiHash
              className=" dark:text-white text-[#0F1419]"
              style={{ fontSize: "30px" }}
            />
          </Link>
        )}
        <span
          className="text-[20px] font-[500] pt-1 lg:block hidden md:hidden dark:text-white text-[#0F1419]"
          style={{ fontFamily: "Vazirmatn" }}
        >
          <Link to="/explore">گشت و گذار</Link>
        </span>
      </div>

      <div className="flex flex-row md:hover:text-slate-800 md:pb-8 md:pl-4 md:pr-0 md:pt-0  text-slate-500 opacity-80 md:opacity-100">
        {window.innerWidth > 1024 ? (
          <Link to="/blogs">
            <BiListUl className="ml-5 mb-1 mt-1 text-3xl dark:text-white text-[#282c30]" />
          </Link>
        ) : (
          <Link to="/blogs">
            <BiListUl
              className=" dark:text-white text-[#0F1419]"
              style={{ fontSize: "30px" }}
            />
          </Link>
        )}
        <span
          className="text-[20px] font-[500] pt-1 lg:block hidden md:hidden dark:text-white text-[#0F1419]"
          style={{ fontFamily: "Vazirmatn" }}
        >
          <Link to="/blogs">بلاگ ها</Link>
        </span>
      </div>

      <div className="flex flex-row  md:hover:text-slate-800 md:pb-8  md:pl-4 md:pr-0 md:pt-0  text-slate-500 opacity-80 md:opacity-100">
        {window.innerWidth > 1024 ? (
          <Link to="/products">
            <BiCartAlt className="ml-5 mb-1 mt-1 text-3xl dark:text-white text-[#282c30]" />
          </Link>
        ) : (
          <Link to="/products">
            <BiCartAlt
              className=" dark:text-white text-[#0F1419]"
              style={{ fontSize: "30px" }}
            />
          </Link>
        )}
        <span
          className="text-[20px] font-[500] pt-1 lg:block hidden md:hidden dark:text-white text-[#0F1419]"
          style={{ fontFamily: "Vazirmatn" }}
        >
          <Link to="/products">محصولات</Link>
        </span>
      </div>
      <div className="flex flex-row md:hover:text-slate-800 md:pb-8 md:pl-4 md:pr-0 md:pt-0  text-slate-500 opacity-80 md:opacity-100">
        {window.innerWidth > 1024 ? (
          <Link to="/profile">
            <BiUser className="ml-5 mb-1 mt-1 text-3xl dark:text-white text-[#282c30]" />
          </Link>
        ) : (
          <Link to="/profile">
            <BiUser
              className=" dark:text-white text-[#0F1419]"
              style={{ fontSize: "30px" }}
            />
          </Link>
        )}
        <span
          className="text-[20px] font-[500] pt-1 lg:block hidden md:hidden dark:text-white text-[#0F1419]"
          style={{ fontFamily: "Vazirmatn" }}
        >
          <Link to="/profile">پروفایل</Link>
        </span>
      </div>

      <div className="md:flex flex-row md:hover:text-slate-800 md:pb-8 md:pl-4 md:pr-0 md:pt-0  text-slate-500  hidden opacity-80 md:opacity-100">
        {window.innerWidth > 1024 ? (
          <Link to="/settings">
            <BiCog className="ml-5 mb-1 mt-1 text-3xl dark:text-white text-[#282c30]" />
          </Link>
        ) : (
          <BiCog
            className=" dark:text-white text-[#0F1419]"
            style={{ fontSize: "30px" }}
          />
        )}
        <span
          className="text-[20px] font-[500] pt-1 lg:block hidden md:hidden dark:text-white text-[#0F1419]"
          style={{ fontFamily: "Vazirmatn" }}
        >
          <Link to="/settings">تنظیمات</Link>
        </span>
      </div>
      <div className="md:flex flex-row md:hover:text-slate-800 md:pb-8 md:pl-4 md:pr-0 md:pt-0  text-slate-500  hidden opacity-80 md:opacity-100">
        {window.innerWidth > 1024 ? (
          <button onClick={handleLogout}>
            <BiLogOutCircle className="ml-5 mb-1 mt-1  text-3xl dark:text-white text-red-600" />
          </button>
        ) : (
          <button onClick={handleLogout}>
            <BiLogOutCircle
              className="ml-5  dark:text-white text-red-600"
              style={{ fontSize: "30px" }}
            />
          </button>
        )}
        <span
          onClick={handleLogout}
          className="text-[18px] font-semibold pt-1 lg:block hidden md:hidden dark:text-white text-red-600 hover:cursor-pointer"
          style={{ fontFamily: "Vazirmatn" }}
        >
          خروج از حساب
        </span>
      </div>
    </div>
  );
}

export { MenuBar };
