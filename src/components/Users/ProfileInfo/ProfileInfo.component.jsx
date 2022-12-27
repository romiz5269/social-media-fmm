import React from "react";

import { BiWorld } from "react-icons/bi";
import { FaEnvelope } from "react-icons/fa";

function ProfileInfo({ profile, owner }) {
  return (
    <>
      <div className="sm:col-span-12 flex flex-col text-left pl-3 pr-3 pt-10">
        {profile && (
          <>
            <div className="flex flex-row pt-10">
              <span
                className="dark:text-white"
                style={{ fontSize: "25px", fontWeight: "700" }}
              >
                {profile?.username}
              </span>
            </div>
            {profile?.bio && (
              <div className="flex flex-row">
                <span
                  className="text-right  font-Vazirmatn text-[#3B3F43] mt-1 w-2/4 sm:w-4/5 pr-2 pt-8 pb-1 dark:text-slate-200"
                  style={{ fontSize: "14px", fontWeight: "500" }}
                >
                  {profile?.bio}
                </span>
              </div>
            )}
            {profile.username === owner && (
              <div className="flex flex-row py-2">
                <FaEnvelope className="text-lg text-slate-400 mt-1 mr-2 " />
                <span
                  className=" mt-1 pr-2 text-[#536471]  dark:text-slate-300"
                  style={{ fontSize: "13px", fontWeight: "500" }}
                >
                  {profile?.email}
                </span>
              </div>
            )}
            {profile?.last_login && (
              <div className="flex flex-row py-2">
                <BiWorld
                  className="text-xl text-slate-400 mt-1 mr-2"
                  style={{ marginRight: "6px" }}
                />
                <span
                  className=" mt-1 pr-2 text-slate-500 dark:text-slate-300"
                  style={{ fontSize: "13px", fontWeight: "600" }}
                >
                  {profile?.last_login?.slice(0, 10)}
                </span>
              </div>
            )}
            <div className="flex flex-row">
              <div className="text-center mr-2 text-slate-600 font-semibold">
                <span className="text-sm text-[#000]">
                  {profile?.followercount}
                </span>
                <span className="font-Vazirmatn text-xs text-slate-500 font-[500] pr-1">
                  دنبال کنندگان
                </span>
              </div>
              <div className="text-center mr-4 text-slate-600 font-semibold">
                <span className="text-sm text-[#000]">
                  {profile?.followingcount}
                </span>
                <span className="font-Vazirmatn text-xs text-slate-500 font-[500] pr-1">
                  دنبال شوندگان
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileInfo;
