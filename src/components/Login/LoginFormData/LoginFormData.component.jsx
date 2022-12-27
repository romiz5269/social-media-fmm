import React from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {Link} from 'react-router-dom'
function LoginFormData({userRef,email,setEmail,handleSubmit,capsLockCheck,passShow,setPassShow,pwd,setPwd}) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="font-Vazirmatn">فرم ثبت نام</h2>
        <label className="font-Vazirmatn text-xs" htmlFor="username">
          نام کاربری 
        </label>
        <div className="relative">
          <input
            type="text"
            dir="ltr"
            ref={userRef}
            id="email"
            name="email"
            placeholder="email ... "
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="font-Vazirmatn bg-slate-200 focusbg-slate-50 focusoutline-0 w-full"
          />
          {capsLockCheck && (
            <span className="absolute text-xs text-red-500 font-Vazirmatn right-3 top-3">
              ! Caps Lock is on
            </span>
          )}
        </div>

        <label className="font-Vazirmatn" htmlFor="password">
          کلمه عبور 
        </label>
        <div className="relative">
          <input
            type={passShow ? "text" : "password"}
            id="password"
            ref={userRef}
            name="password"
            dir="ltr"
            className="font-Vazirmatn pl-3 bg-slate-200 focus:bg-slate-50 focus:outline-0 w-full"
            placeholder="password ... "
            autoComplete="off"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          {capsLockCheck && (
            <span className="absolute text-xs text-red-500 font-Vazirmatn right-3 top-3">
              ! Caps Lock is on
            </span>
          )}
          {passShow ? (
            <span
              className="absolute bottom-0 right-5 border-2 border-t-slate-300 rounded-full bg-white px-1 py-1"
              onClick={(e) => setPassShow(!passShow)}
            >
              <FaEyeSlash className="text-xs text-red-500" />
            </span>
          ) : (
            <span
              className="absolute bottom-0 right-5 border-2 border-t-slate-300 rounded-full bg-white px-1 py-1"
              onClick={(e) => setPassShow(!passShow)}
            >
              <FaEye className="text-xs" />
            </span>
          )}
        </div>

        <button
          className="bg-gradient-to-r from-cyan-500 to-blue-500 disabled:bg-gradient-to-r disabled:from-slate-500 disabled:to-slate-400 rounded-md my-5 text-white font-Vazirmatn"
          disabled={!email || !pwd ? true : false}
        >
          ورود به حساب
        </button>
        <div className="flex flex-row pb-3 justify-center">
          <div className="pl-2">
            <Link
              className="text-sm mt-2 mr-2 text-slate-600 hover:text-orange-500 hover:underline font-Vazirmatn"
              to="/forgotpassword/configuration"
            >
              فراموشی کلمه عبور
            </Link>
          </div>
          |
          <div>
            <Link
              className="text-sm mt-2 mr-2 text-slate-600 font-Vazirmatn"
              to="/register"
            >
              ساخت حساب
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginFormData
