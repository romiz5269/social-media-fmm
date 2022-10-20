import { FaCog } from "react-icons/fa";
import {
  LogoutButton,
  MenuBar,
  NotificationButton,
  ProfileCard,
  SuggestBlogs,
  SuggestTags,
  SuggestUsers,
  UserProfile,
} from "Layout/components/index.BaseLayoutComponent";
import AddBlog from "Layout/components/RightSideBar/AddBlog/AddBlog.LayoutComponent";
import { BiArrowBack } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCheckThemeMode from "hooks/useCheckThemeMode.hook";

function DefaultLayout({ children }) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const { theme } = useCheckThemeMode();

  useEffect(() => {
    if (theme) {
      document.body.style.backgroundColor = "#2f3136";
    } else {
      document.body.style.backgroundColor = "#fff";
    }
    window.addEventListener("resize", resize);

    function resize() {
      setWindowSize(window.innerWidth);
      console.log(windowSize);
    }

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [window.innerWidth, theme]);
  const Navigate = useNavigate();
  return (
    <div className="min-w-screen grid grid-cols-12 justify-center ">
      <div
        className="sm:hidden z-10 fixed top-0 w-full bg-white  shadow-lg text-slate-500 col-span-12 py-2 px-5 flex flex-row justify-between"
        style={
          theme
            ? { backgroundColor: "#1F1F1F", borderBottom: "1px solid #333" }
            : { borderBottom: "1px solid #e7e7e7" }
        }
      >
        <div>
          <UserProfile />
        </div>
        <span className="text-2xl font-semibold pt-3 dark:text-white text-orange-600">
          LOGO
        </span>
        <div className="flex flex-row justify-center pt-2">
          <NotificationButton />
          <Link to="/settings">
            <FaCog className="mt-3 mr-10 text-xl dark:text-white" />
          </Link>
        </div>
      </div>
      <div className="fixed sm:hidden bottom-40 right-3 z-30">
        <AddBlog />
      </div>
      <div
        className="fixed sm:hidden col-span-12 z-10 bottom-0 w-full flex flex-row justify-center border border-blue-600"
        style={
          theme
            ? { backgroundColor: "#1F1F1F", borderTop: "1px solid #333" }
            : { backgroundColor: "white", borderTop: "1px solid #e7e7e7" }
        }
      >
        <MenuBar />
      </div>
      <div
        className={
          windowSize > 1024
            ? "sm:col-span-3 col-span-3 sm:flex sm:flex-col  sm:items-end hidden pl-[40px] "
            : "lg:col-span-3 sm:col-span-3 col-span-3 sm:flex sm:flex-col  sm:items-center pr-24 hidden"
        }
        style={
          theme
            ? { borderLeft: "1px solid #bcbcbc" }
            : { borderLeft: "1px solid #f6f6f6" }
        }
      >
        <div className="sm:sticky sm:top-10 grid grid-cols-12">
          <div className="col-span-5"></div>
          <div className="col-span-7">
            <MenuBar />
            <AddBlog />
          </div>
          {/* <LogoutButton /> */}
        </div>
      </div>
      <div className="col-span-8 grid grid-cols-12">
        <div className="lg:col-span-8 sm:col-span-8 col-span-12 border">
          {children}
        </div>
        <div
          className="lg:col-span-4 hidden sm:hidden lg:flex lg:flex-col pr-[16px]  pt-5 "
          style={
            theme
              ? { borderRight: "1px solid #bcbcbc" }
              : { borderRight: "1px solid #f6f6f6" }
          }
        >
          <SuggestBlogs />
          <div className="sm:sticky sm:top-0">
            <SuggestUsers theme={theme} />
            <SuggestTags theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
