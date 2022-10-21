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
        className="md:hidden z-10 fixed top-0 w-full  backdrop-blur-md  text-slate-500 col-span-12 py-2 px-5 flex flex-row justify-between"
        style={
          theme
            ? { backgroundColor: "#1F1F1F", borderBottom: "1px solid #333" }
            : {
                borderBottom: "0px solid #eee",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
              }
        }
      >
        <div className="flex flex-row">
          <UserProfile />
          <span className="pt-2 pr-5 font-[700] text-lg text-[#0F1419]">
            Home
          </span>
        </div>

        <div className="flex flex-row justify-center">
          {/* <NotificationButton /> */}
          <Link to="/settings">
            <FaCog className="mt-3 mr-10 text-xl dark:text-white text-[#0F1419]" />
          </Link>
        </div>
      </div>
      <div className="fixed sm:hidden bottom-40 right-3 z-30">
        <AddBlog />
      </div>
      <div
        className="fixed md:hidden col-span-12 z-10 bottom-0  w-full"
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
          "2xl:col-span-3 xl:col-span-3 lg:col-span-4 md:col-span-3   sm:flex sm:flex-col  sm:items-center pr-24 hidden"
        }
        style={
          theme
            ? { borderLeft: "1px solid #bcbcbc" }
            : { borderLeft: "1px solid #f8f8f8" }
        }
      >
        <div className="sm:sticky sm:top-10 md:grid grid-cols-12 hidden">
          <div className="2xl:col-span-2 xl:col-span-1 sm:hidden "></div>
          <div className="2xl:col-span-9 xl:col-span-11 lg:col-span-12 md:col-span-12">
            <MenuBar />
            <AddBlog />
          </div>
          {/* <LogoutButton /> */}
        </div>
      </div>

      <div className="2xl:col-span-8 xl:col-span-8 lg:col-span-6 md:col-span-7 col-span-12 grid grid-cols-12 ">
        <div className="2xl:col-span-8 xl:col-span-7 lg:col-span-12 md:col-span-12 col-span-12 sm:pt-0 pt-16">
          {children}
        </div>

        <div
          className="2xl:col-span-4 xl:col-span-5 lg:col-span-4 hidden  xl:flex xl:flex-col pr-[16px]  pt-5 "
          style={
            theme
              ? { borderRight: "1px solid #bcbcbc" }
              : { borderRight: "1px solid #f8f8f8" }
          }
        >
          <span>{window.innerWidth}</span>
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
