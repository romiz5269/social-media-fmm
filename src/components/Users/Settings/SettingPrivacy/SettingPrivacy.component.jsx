import React from 'react'
import { BiLock } from 'react-icons/bi';

function SettingPrivacy({whatsChanged,checkPrivatePage,setCheckPrivatePage,darkTheme}) {
  return (
    <>
      <div
        className="py-2 pr-2 flex flex-row justify-start"
        style={{ borderBottom: "1px solid #e7e7e7" }}
      >
        <BiLock className="text-xl ml-2 text-slate-500 dark:text-white" />
        <h3 className="text-md text-slate-700 dark:text-white font-Vazirmatn">
          حریم شخصی و امنیت
        </h3>
      </div>
      <div
        className={
          whatsChanged === "profile" || whatsChanged === "theme"
            ? "pt-2 pb-5 pointer-events-none"
            : "pt-2 pb-5 "
        }
      >
        <form className="flex flex-col">
          <div className="grid grid-cols-12 py-2">
            <div className="sm:col-span-3 col-span-6 sm:py-2 ">
              <span className="font-Vazirmatn text-sm dark:text-slate-200">
                صفحه خصوصی
              </span>
            </div>
            <div className="sm:col-span-9 col-span-6 text-left">
              <label className="switch switch-1-1" for="switch-1-1">
                <input
                  type="checkbox"
                  name="switch-1-1"
                  id="switch-1-1"
                  checked={checkPrivatePage}
                  onChange={(e) => setCheckPrivatePage(!checkPrivatePage)}
                />
                <span
                  className="slider round slider-1-1"
                  // style={
                  //   darkTheme ? { backgroundColor: "red" } : {}
                  // }
                ></span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-12 py-5">
            <div className="sm:col-span-2 col-span-6 sm:py-2 ">
              <span className="font-Vazirmatn text-sm dark:text-slate-200">
                تغییر رمز عبور
              </span>
            </div>
            <div className="sm:col-span-10 col-span-6 text-left">
              <span
                className="font-Vazirmatn text-sm text-blue-600"
                style={darkTheme ? { color: "#23D9C8" } : {}}
              >
                تایید تغییر رمز عبور
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SettingPrivacy
