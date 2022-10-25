import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  BiArrowBack,
  BiBrush,
  BiCheck,
  BiEditAlt,
  BiHome,
  BiLock,
  BiPencil,
  BiUserCheck,
  BiX,
} from "react-icons/bi";
import LoginBodyBackground from "assets/images/Login/body-background-3.webp";
import { useDispatch } from "react-redux";
import { updateUserData } from "store/Reducers/Users/UsersReducer";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import AdapterJalali2 from "@date-io/date-fns-jalali";
import jMoment from "moment-jalaali";
import { FormControl } from "@mui/material";

const LoginStyle = {
  backgroundImage: `url(${LoginBodyBackground})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  height: "100vh",
};
const SettingForm = ({ profile }) => {
  console.log(profile);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [previewSrc, setPrewviewSrc] = useState(profile?.image);
  const [editable, setEditable] = useState(false);

  // Profile section states
  const [username, setUsername] = useState(profile?.username);
  const [email, setEmail] = useState(profile?.email);

  const [bio, setBio] = useState(profile?.bio);
  const [birthdate, setBirthDate] = useState(profile?.birh_date);
  const [image, setImage] = useState(null);
  const [showSaveChanges, setShowSaveChanges] = useState(false);
  const [whatsChanged, setWhatsChanged] = useState(null);

  //privacy section states
  const [checkPrivatePage, setCheckPrivatePage] = useState(false);

  //theme section states
  const [defaultTheme, setDefaultTheme] = useState(
    localStorage.getItem("color-theme") ? true : false
  );
  const [darkTheme, setDarkTheme] = useState(
    localStorage.getItem("color-theme") ? true : false
  );
  const [themeColor, setThemeColor] = useState(null);

  const previewFile = () => {
    var preview = document.querySelector("img");
    var file = document.querySelector("input[type=file]").files[0];
    setImage(file);
    preview.src = URL.createObjectURL(file);
    setPrewviewSrc(preview.src);
  };

  const profileImage = () => {
    document.getElementById("profile-image-upload").click();
  };

  useEffect(() => {
    setWhatsChanged(null);
    if (username !== "" || bio !== "" || image !== null) {
      if (
        username !== profile.username ||
        bio !== profile.bio ||
        previewSrc !== profile?.image
      ) {
        setWhatsChanged("profile");
        setShowSaveChanges(true);
      } else {
        setWhatsChanged(null);
        setShowSaveChanges(false);
      }
    } else {
      setWhatsChanged(null);
      setShowSaveChanges(false);
    }
  }, [username, bio, image]);

  useEffect(() => {
    if (checkPrivatePage) {
      setShowSaveChanges(true);
      setWhatsChanged("privacy");
    } else {
      setShowSaveChanges(false);
      setWhatsChanged(null);
    }
  }, [checkPrivatePage]);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
      document.body.style.backgroundColor = "#2f3136";
    }
    if (!darkTheme) {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("color-theme");
      document.body.style.backgroundColor = "white";
    }
    if (themeColor !== null) {
      setShowSaveChanges(true);
      setWhatsChanged("theme");
    } else {
      setShowSaveChanges(false);
      setWhatsChanged(null);
    }
  }, [darkTheme, themeColor]);

  
  const handleSaveChanges = (e, changedName) => {
    if (changedName === "profile") {
      dispatch(
        updateUserData({
          id: profile.id,
          username: username,
          email: email,
          bio: bio,
          birth_data: birthdate,
          // profile_picture:profile_picture,
        })
      );
    }
    if (changedName === "theme") {
      if (darkTheme) {
        localStorage.setItem("color-theme", "dark");
      } else {
        localStorage.removeItem("color-theme");
      }
    }
    setShowSaveChanges(false);
    setWhatsChanged(null);
  };
  const handleCancelChanges = (e, changedName) => {
    if (changedName === "profile") {
      setUsername(profile.username);
      setEmail(profile.email);
      setBio(profile.bio);
      setEditable(false);
      setImage(null);
      setPrewviewSrc(profile?.image);
    }

    if (changedName === "privacy") {
      setCheckPrivatePage(false);
    }

    if (changedName === "theme") {
      setDarkTheme(false);
      setThemeColor(null);
    }
  };
  const handleCancelUploadNewImage = () => {
    setEditable(false);
    setImage(null);
    setPrewviewSrc(profile?.image);
  };
  return (
    <section
      className="form-section flex flex-col items-center justify-center sm:flex-col pt-0 relative sm:w-[100%]"
      style={LoginStyle}
    >
      {profile && (
        <div
          className="flex flex-col shadow-2xl mx-auto lg:w-2/6 md:w-3/6 sm:w-4/6 w-full bg-white px-0 overflow-y-auto "
          style={
            darkTheme
              ? { height: "700px", backgroundColor: "#2f3136" }
              : { height: "700px" }
          }
        >
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

          <div
            className={`py-3 flex flex-col justify-center items-center sm:w-4/6 w-full mx-auto relative ${
              whatsChanged === "privacy" || whatsChanged === "theme"
                ? "pointer-events-none"
                : ""
            } `}
          >
            {editable ? (
              <>
                <div
                  className="profile-pic relative border-2 rounded-full"
                  style={{ width: "120px", height: "120px" }}
                >
                  <img
                    alt="User Pic"
                    src={profile?.image}
                    id="profile-image1"
                    onClick={(e) => profileImage()}
                    className="rounded-full border-2 border-slate-900 border-dashed  object-fill"
                    style={{ width: "120px", height: "120px" }}
                  />
                  <input
                    id="profile-image-upload"
                    className="hidden"
                    type="file"
                    onChange={(e) => previewFile()}
                  />
                  <div
                    style={{ color: "#999" }}
                    className="absolute left-4 bottom-0  bg-slate-400  rounded-full text-sm"
                  >
                    <span className="text-xs text-white px-1">
                      Click to upload
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <img
                  src={profile?.image}
                  className="rounded-full border-8 border-white"
                  style={{ height: "120px", width: "120px" }}
                />
              </>
            )}
            {editable ? (
              <div className="sm:flex sm:flex-row flex flex-col absolute bottom-0 sm:left-0 left-5">
                <span
                  className="bg-white rounded-full p-2 shadow-lg hover:cursor-pointer"
                  style={{ border: "1px solid #e7e7e7" }}
                  onClick={(e) => setEditable(!editable)}
                >
                  <BiCheck className="text-green-500 text-xl" />
                </span>
                <span
                  className="bg-white rounded-full p-2 shadow-lg hover:cursor-pointer"
                  style={{ border: "1px solid #e7e7e7" }}
                  onClick={(e) => handleCancelUploadNewImage()}
                >
                  <BiX className="text-red-600 text-xl" />
                </span>
              </div>
            ) : (
              <span
                className="bg-white rounded-full p-2 shadow-lg absolute bottom-0 sm:left-0 left-5 hover:cursor-pointer"
                style={{ border: "1px solid #e7e7e7" }}
                onClick={(e) => setEditable(!editable)}
              >
                <BiEditAlt className="text-xl" />
              </span>
            )}
          </div>
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

          <div></div>
        </div>
      )}
      {showSaveChanges && (
        <div
          className="sm:w-1/4 rounded-lg w-full z-30 absolute bottom-20 shadow-xl px-5 py-4 saveChangesBlock grid grid-cols-12"
          style={{ backgroundColor: "#292929" }}
        >
          <div className="col-span-6 text-white font-Vazirmatn text-sm py-2">
            ذخیره تغییرات
          </div>
          <div className="col-span-6 flex flex-row justify-center">
            <button
              onClick={(e) => handleSaveChanges(e, whatsChanged)}
              className="bg-green-500 ml-5 px-7 py-2 rounded-md font-Vazirmatn text-white text-sm"
            >
              ذخیره
            </button>
            <button
              onClick={(e) => handleCancelChanges(e, whatsChanged)}
              className="bg-red-600 px-7 py-2 rounded-md font-Vazirmatn text-white text-sm"
            >
              لغو
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export { SettingForm };
