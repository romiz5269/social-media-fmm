import {
  FaCalendar,
  FaCamera,
  FaCheck,
  FaEnvelope,

} from "react-icons/fa";

import { useEffect, useState } from "react";
import { BiArrowBack, BiBell, BiWorld } from "react-icons/bi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { createNewFollow, removeFollow } from "store/Reducers/Users/UsersReducer";
function ProfileData({ profile }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [editable, setEditable] = useState(false);
  const [username, setUsername] = useState(profile.name);
  const [email, setEmail] = useState(profile?.email);
  const [bio, setBio] = useState(profile?.bio);
  console.log(profile)
  const { name } = useParams();
  const owner = jwtDecode(localStorage.getItem("authToken")).name;

  const hasFollow = useSelector((state) => state.users.hasFollowThreadUser);

  const handleAddFollow = (userid) => {
    dispatch(createNewFollow(userid));
  };
  const handleRemoveFollow = (userid) => {
    console.log(name);
    dispatch(removeFollow(userid));
  };

  return (
    <>
      {profile && (
        <>
          <div className="grid grid-cols-12">
            <div className="col-span-11 flex flex-col justify-start pr-3 py-1">
              <span className="text-lg font-[600]">{profile.username}</span>
              <div className="text-slate-600 font-semibold">
                <span className="text-xs text-slate-500 font-[500]">150</span>
                <span className="font-Vazirmatn text-xs text-slate-500 font-[500] pr-1">
                  پست ها
                </span>
              </div>
            </div>
            <div className="col-span-1 flex flex-col items-center justify-center ">
              <BiArrowBack
                onClick={(e) => Navigate(-1)}
                className="text-blue-600 text-lg hover:cursor-pointer dark:text-white"
              />
            </div>
          </div>
          <div
            className="flex flex-col relative bg-gradient-to-r from-blue-500 to-blue-600 sm:mt-0  sm:mb-0 mb-12"
            style={{ height: "150px" }}
          >
            <div className="absolute object-fill bottom-0 top-20 right-5">
              <img
                src={profile?.image}
                className="rounded-full border-8 border-white"
                style={{ height: "120px", width: "120px" }}
              />
            </div>

            {hasFollow && name !== owner && (
              <>
                {hasFollow ? (
                  <div className="absolute left-12 bottom-0 top-32">
                    <div className="px-5 py-2 bg-blue-500 text-white border-2 rounded-full">
                      <button onClick={(e) => handleRemoveFollow(profile.id)}>
                        Followed
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="absolute left-12 bottom-0 top-32">
                    <div className="px-5 py-2 bg-white border-2 rounded-full">
                      <button onClick={(e) => handleAddFollow(profile.id)}>
                        + Follow
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="sm:grid sm:grid-cols-12">
            <div className="col-span-12 pl-3 py-2">
              <div className="flex flex-row justify-end">
                {/* {profile && profile.name !== owner && (
                    
                    // <FollowButtonCheck username={name} owner={owner} />
                  )} */}
                <BiBell />
              </div>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-12 pr-3">
            <div className="sm:col-span-12 flex flex-col text-left pl-3">
              <div className="flex flex-row">
                <span
                  className="pr-2 dark:text-white"
                  style={{ fontSize: "18px", fontWeight: "700" }}
                >
                  {profile?.username}
                </span>
              </div>
              <div className="flex flex-row">
                <span
                  className="text-right  font-Vazirmatn text-slate-400 mt-1 w-2/4 sm:w-4/5 pr-2 pt-2 pb-5 dark:text-slate-200"
                  style={{ fontSize: "14px", fontWeight: "600" }}
                >
                  {profile?.bio}
                </span>
              </div>
              {profile?.username === owner && (
                <div className="flex flex-row py-2">
                  <FaEnvelope className="text-lg text-slate-400 mt-1 mr-2 " />
                  <span
                    className=" mt-1 pr-2 text-slate-500 dark:text-slate-300"
                    style={{ fontSize: "13px", fontWeight: "600" }}
                  >
                    {profile?.email}
                  </span>
                </div>
              )}
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
              <div className="flex flex-row">
                <div className="text-center mr-2 text-slate-600 font-semibold">
                  <span className="text-sm text-[#000]">
                    {profile?.follower}
                  </span>
                  <span className="font-Vazirmatn text-xs text-slate-500 font-[500] pr-1">
                    دنبال کنندگان
                  </span>
                </div>
                <div className="text-center mr-4 text-slate-600 font-semibold">
                  <span className="text-sm text-[#000]">
                    {profile?.following}
                  </span>
                  <span className="font-Vazirmatn text-xs text-slate-500 font-[500] pr-1">
                    دنبال شوندگان
                  </span>
                </div>
              </div>
            </div>
           
          </div>
        </>
      )}
    </>
  );
}

export { ProfileData };
