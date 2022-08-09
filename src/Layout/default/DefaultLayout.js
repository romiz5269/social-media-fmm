import {
  MenuBar,
  NotificationButton,
  ProfileCard,
  SuggestBlogs,
  SuggestTags,
  SuggestUsers,
  UserProfile,
} from "Layout/components";
import ProfileBrand from "assets/images/profilecard/ProfileBrand.jpg";

import AddBlog from "Layout/components/LeftSideBar/AddBlog/AddBlog";
import { FaUserAlt, FaCog, FaRegBell } from "react-icons/fa";
import { Button, Popover, Typography } from "@mui/material";
import { useState } from "react";
function DefaultLayout({ children }) {
  return (
    <div className="container mx-auto max-w-screen-xl grid grid-cols-12 sm:pt-20">
      <div className="sm:hidden z-10 fixed top-0 w-full bg-white border-b-2 shadow-lg text-orange-500 col-span-12 py-2 px-5 flex flex-row justify-between">
        <div>
          <UserProfile />
        </div>
        <span className="text-xl font-semibold pt-2">LOGO</span>
        <div className="flex flex-row justify-center">
          <NotificationButton />
          <FaCog className="mt-3 mr-10 text-xl" />
        </div>
      </div>
      <div className="fixed sm:hidden bottom-32 right-3">
        <AddBlog />
      </div>
      <div className="fixed sm:hidden col-span-12 z-10 bottom-0 border-2 w-full bg-orange-200 pr-16">
        <MenuBar />
      </div>
      <div className="lg:col-span-3 sm:col-span-3 col-span-3 sm:flex sm:flex-col lg:pl-24 sm:pr-10 hidden">
        <div className="sm:sticky sm:top-10">
          <MenuBar />
          <AddBlog />
          <ProfileCard />
        </div>
      </div>
      <div className="lg:col-span-6 sm:col-span-9 col-span-12  border-2 sm:border-l-slate-300 sm:border-r-slate-300">
        {children}
      </div>
      <div className="lg:col-span-3 hidden sm:hidden lg:flex lg:flex-col px-5">
        <SuggestBlogs />
        <div className="sm:sticky sm:top-0">
          <SuggestUsers />
          <SuggestTags />
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
