import React from 'react'
import { BiArrowBack, BiHome } from 'react-icons/bi';

function SettingTopbar({darkTheme,Navigate}) {
  return (
    <>
      <div
        className="py-3 px-2 flex flex-row justify-between shadow-2xl w-full "
        style={darkTheme ? { backgroundColor: "#36393f " } : {}}
      >
        <span className="text-sm text-slate-600 dark:text-white font-Vazirmatn">
          ویرایش حساب کاربری
        </span>

        <div className="flex flex-row">
          <BiHome
            className="text-xl ml-5 text-slate-700 dark:text-slate-300"
            onClick={(e) => Navigate("/home")}
          />
          <BiArrowBack
            className="text-xl text-slate-700 dark:text-slate-300"
            onClick={(e) => Navigate(-1)}
          />
        </div>
      </div>
    </>
  );
}

export default SettingTopbar
