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
    <div className="sm:flex sm:flex-col flex flex-row sm:justify-center justify-between w-[100%] sm:pr-3 sm:pt-5">
      <Link to="/home">
        <div className="flex flex-row sm:hover:text-slate-800 sm:pb-6 pb-4 sm:pl-4 sm:pr-0 sm:pt-0 pt-4 text-slate-500  opacity-80 sm:opacity-100">
          {window.innerWidth > 1024 ? (
            <BiHomeCircle className="ml-5 sm:mb-1 text-2xl dark:text-white" />
          ) : (
            <BiHomeCircle
              className="ml-5 mb-1 dark:text-white"
              style={{ fontSize: "30px" }}
            />
          )}
          <span
            className="text-md font-semibold pt-1 lg:block hidden sm:hidden dark:text-white"
            style={{ fontFamily: "Vazirmatn" }}
          >
            صفحه اصلی
          </span>
        </div>
      </Link>

      <Link to="/explore">
        <div className="flex sm:hover:text-slate-800 flex-row sm:pb-6 pb-4 pt-4 sm:pt-0 sm:pl-4 sm:pr-0 text-slate-500 opacity-80 sm:opacity-100">
          {window.innerWidth > 1024 ? (
            <BiHash className="ml-5 mb-1 text-2xl dark:text-white" />
          ) : (
            <BiHash
              className="ml-5 mb-1 dark:text-white"
              style={{ fontSize: "30px" }}
            />
          )}
          <span
            className="text-md font-semibold pt-1 lg:block hidden sm:hidden dark:text-white"
            style={{ fontFamily: "Vazirmatn" }}
          >
            گشت و گذار
          </span>
        </div>
      </Link>

      <Link to="/blogs">
        <div className="flex flex-row sm:hover:text-slate-800 sm:pb-6 pb-4 pt-4 sm:pt-0 sm:pl-4 sm:pr-0 text-slate-500 opacity-80 sm:opacity-100">
          {window.innerWidth > 1024 ? (
            <BiListUl className="ml-5 mb-1 text-2xl dark:text-white" />
          ) : (
            <BiListUl
              className="ml-5 mb-1 dark:text-white"
              style={{ fontSize: "30px" }}
            />
          )}
          <span
            className="text-md font-semibold pt-1 lg:block hidden sm:hidden dark:text-white"
            style={{ fontFamily: "Vazirmatn" }}
          >
            بلاگ ها
          </span>
        </div>
      </Link>

      <Link to="/products">
        <div className="flex flex-row  sm:hover:text-slate-800 sm:pb-6 pb-4 pt-4 sm:pt-0 sm:pl-4 sm:pr-0 text-slate-500 opacity-80 sm:opacity-100">
          {window.innerWidth > 1024 ? (
            <BiCartAlt className="ml-5 mb-1 text-2xl dark:text-white" />
          ) : (
            <BiCartAlt
              className="ml-5 mb-1 dark:text-white"
              style={{ fontSize: "30px" }}
            />
          )}
          <span
            className="text-md font-semibold pt-1 lg:block hidden sm:hidden dark:text-white"
            style={{ fontFamily: "Vazirmatn" }}
          >
            محصولات
          </span>
        </div>
      </Link>
      <Link to="/profile">
        <div className="sm:flex flex-row sm:hover:text-slate-800 sm:pb-6 pb-4 pt-4 sm:pt-0 pl-4 sm:pr-0 text-slate-500  hidden opacity-80 sm:opacity-100">
          {window.innerWidth > 1024 ? (
            <BiUser className="ml-5 mb-1 text-2xl dark:text-white" />
          ) : (
            <BiUser
              className="ml-5 mb-1 dark:text-white"
              style={{ fontSize: "30px" }}
            />
          )}
          <span
            className="text-md font-semibold pt-1 lg:block hidden sm:hidden dark:text-white"
            style={{ fontFamily: "Vazirmatn" }}
          >
            پروفایل
          </span>
        </div>
      </Link>
      <Link to="/notifications">
        <div className="sm:flex flex-row sm:hover:text-slate-800 pb-6 pt-4 sm:pt-0 pl-4 sm:pr-0 text-slate-500  hidden opacity-80 sm:opacity-100">
          {window.innerWidth > 1024 ? (
            <span className="relative  pt-1 " style={{ paddingRight: "1px" }}>
              <BiBell className="ml-5 mb-1 text-2xl dark:text-white" />
              <span
                className="absolute top-0 right-0 bg-orange-500 rounded-full text-center text-white dark:bg-green-600"
                style={{ width: "25px", height: "15px", fontSize: "10px" }}
              >
                +99
              </span>
            </span>
          ) : (
            <span className="relative">
              <BiBell
                className="ml-5 mb-3 dark:text-white"
                style={{ fontSize: "30px" }}
              />
            </span>
          )}
          <span
            className="text-md font-semibold pt-1 lg:block hidden sm:hidden dark:text-white"
            style={{ fontFamily: "Vazirmatn" }}
          >
            اعلان ها
          </span>
        </div>
      </Link>
      <Link to="/settings">
        <div className="sm:flex flex-row sm:hover:text-slate-800 pb-6 pt-4 sm:pt-0 pl-4 sm:pr-0 text-slate-500  hidden opacity-80 sm:opacity-100">
          {window.innerWidth > 1024 ? (
            <BiCog className="ml-5 mb-1 text-2xl dark:text-white" />
          ) : (
            <BiCog
              className="ml-5 mb-2 dark:text-white"
              style={{ fontSize: "30px" }}
            />
          )}
          <span
            className="text-md font-semibold pt-1 lg:block hidden sm:hidden dark:text-white"
            style={{ fontFamily: "Vazirmatn" }}
          >
            تنظیمات
          </span>
        </div>
      </Link>
      <div className="sm:flex flex-row sm:hover:text-slate-800 pb-6 pt-4 sm:pt-0 pl-4 sm:pr-0 text-slate-500  hidden opacity-80 sm:opacity-100">
        {window.innerWidth > 1024 ? (
          <button onClick={handleLogout}>
            <BiLogOutCircle className="ml-5 mb-1 text-2xl dark:text-white text-red-600" />
          </button>
        ) : (
          <button onClick={handleLogout}>
            <BiLogOutCircle
              className="ml-5 dark:text-white text-red-600"
              style={{ fontSize: "30px" }}
            />
          </button>
        )}
        <span
          onClick={handleLogout}
          className="text-md font-semibold pt-1 lg:block hidden sm:hidden dark:text-white text-red-600 hover:cursor-pointer"
          style={{ fontFamily: "Vazirmatn" }}
        >
          خروج از حساب
        </span>
      </div>
    </div>
  );
}

export { MenuBar };
