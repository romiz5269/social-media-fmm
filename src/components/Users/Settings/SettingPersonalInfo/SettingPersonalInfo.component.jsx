import React from 'react'
import { BiCheck, BiUserCheck } from 'react-icons/bi'
function SettingPersonalInfo({whatsChanged,username,setUsername,bio,setBio,email,birthdate,setBirthDate}) {
  return (
    <>
     <div
            className="py-2 pr-2 flex flex-row justify-start"
            style={{ borderBottom: "1px solid #e7e7e7" }}
          >
            <BiUserCheck className="text-xl ml-2 text-slate-600 dark:text-white" />
            <h3 className="text-md text-slate-600 dark:text-white font-Vazirmatn">
              اطلاعات شخصی
            </h3>
          </div>
          <div
            className={
              whatsChanged === "privacy" || whatsChanged === "theme"
                ? "pt-2 pointer-events-none"
                : "pt-2"
            }
          >
            <form className="flex flex-col w-[100%]">
              <div className="grid grid-cols-12">
                <div className="sm:col-span-5 col-span-12 py-2 sm:py-0">
                  <span className="font-Vazirmatn dark:text-slate-200 text-sm">
                    نام کاربری
                  </span>
                </div>
                <div className="sm:col-span-7 col-span-12">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-slate-100 outline-none focus:outline-none focus:border-0 w-full text-left "
                    style={{ direction: "ltr" }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 py-2">
                <div className="sm:col-span-2 col-span-12 py-2 sm:py-0 flex flex-col justify-center">
                  <span className="font-Vazirmatn dark:text-slate-200 text-sm">
                    ایمیل
                  </span>
                </div>
                <div className="sm:col-span-10 col-span-12 flex flex-row justify-end">
                  <BiCheck className="text-green-500 text-xl ml-2" />
                  <span className="text-slate-500 dark:text-slate-200">
                    {email}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-12 py-3">
                <div className="sm:col-span-5 col-span-12 py-2 sm:py-0 flex flex-col justify-center">
                  <span className="font-Vazirmatn text-sm dark:text-slate-200 ">
                    تاریخ تولد
                  </span>
                </div>
                <div className="sm:col-span-7 col-span-12">
                  {/* <LocalizationProvider dateAdapter={AdapterJalali2}>
                    <DatePicker
                      value={birthdate}
                      onChange={(newValue) => setBirthDate(newValue)}
                      renderInput={(params) => (
                        <TextField
                          className="bg-slate-100 w-full"
                          {...params}
                        />
                      )}
                      className="calender"
                    />
                  </LocalizationProvider> */}
                </div>
              </div>
              <div className="grid grid-cols-12 py-3">
                <div className="sm:col-span-5 col-span-12 py-2 sm:py-0 flex flex-col justify-center">
                  <span className="font-Vazirmatn text-sm dark:text-slate-200">
                    بایوگرافی
                  </span>
                </div>
                <div className="sm:col-span-7 col-span-12">
                  <input
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="bg-slate-100 outline-none focus:outline-none focus:border-0 w-full"
                  />
                </div>
              </div>
            </form>
          </div> 
    </>
  )
}

export default SettingPersonalInfo
