import React from 'react'
import { BiBrush } from 'react-icons/bi';

function SettingTheme({whatsChanged,themeColor,darkTheme,setDarkTheme,setThemeColor}) {
  return (
    <>
      <div
        className="py-2 pr-2 flex flex-row justify-start"
        style={{ borderBottom: "1px solid #e7e7e7" }}
      >
        <BiBrush className="text-xl ml-2 text-slate-500 dark:text-white" />
        <h3 className="text-md text-slate-700 dark:text-white font-Vazirmatn">
          تنظیمات پوسته
        </h3>
      </div>
      <div
        className={`py-2 ${
          whatsChanged === "profile" || whatsChanged === "privacy"
            ? "pointer-events-none"
            : ""
        }`}
      >
        <form className="flex flex-col">
          <div className="grid grid-cols-12 py-2">
            <div className="sm:col-span-3 col-span-6">
              <span className="font-Vazirmatn text-sm dark:text-slate-200">
                حالت تاریک
              </span>
            </div>
            <div className="sm:col-span-9 col-span-6 text-left">
              <label className="switch switch-1-1" for="switch-2-2">
                <input
                  type="checkbox"
                  name="switch-1-1"
                  id="switch-2-2"
                  checked={darkTheme}
                  onChange={(e) => setDarkTheme(!darkTheme)}
                />
                <span className="slider round slider-1-1"></span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="sm:col-span-3 col-span-6">
              <span className="font-Vazirmatn text-sm  dark:text-slate-200">
                شخصی سازی تم
              </span>
            </div>
            <div className="sm:col-span-9 col-span-6 text-left">
              <input
                type="color"
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="bg-slate-100 outline-none focus:outline-none focus:border-0 w-4/5"
              />
            </div>
          </div>
        </form>
      </div>

    </>
  );
}

export default SettingTheme
