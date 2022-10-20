import { FaCalendar, FaCamera, FaCheck, FaEnvelope } from "react-icons/fa";
import profilepic from "assets/images/userprofile/defaultprofile.png";
import { useEffect, useState } from "react";
import { BiArrowBack, BiBell, BiWorld } from "react-icons/bi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import {
  createNewFollow,
  removeFollow,
} from "store/Reducers/Users/UsersReducer";
import { clearProfileBlogs } from "store/Reducers/Blogs/Blogs.Reducer";
import { AiOutlineMail } from "react-icons/ai";
function ProfileData({ profile }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [editable, setEditable] = useState(false);
  const [username, setUsername] = useState(profile.name);
  const [email, setEmail] = useState(profile?.email);
  const [bio, setBio] = useState(profile?.bio);
  console.log(profile);
  const { name } = useParams();
  const owner = jwtDecode(localStorage.getItem("authToken")).name;
  console.log(window.location);
  const hasFollow = useSelector((state) => state.users.hasFollowThreadUser);

  const handleAddFollow = (username) => {
    dispatch(createNewFollow(username));
  };
  const handleRemoveFollow = (username) => {
    console.log(name);
    dispatch(removeFollow(username));
    dispatch(clearProfileBlogs());
  };

  return (
    <>
      {profile && (
        <>
          <div
            className="grid grid-cols-12  sticky top-0 z-20 backdrop-blur-md"
            style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
          >
            <div className="col-span-11 flex flex-col justify-start pr-3 py-1 ">
              <span className="text-lg font-[600]">{profile.username}</span>
              <div className="text-slate-600 font-semibold">
                <span className="text-xs text-slate-500 font-[500]">
                  {profile.postcount}
                </span>
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
            style={{ height: "180px" }}
          >
            <div className="absolute object-fill bottom-0 top-28 right-5">
              <img
                src={profile?.image ? profilepic : profilepic}
                className="rounded-full border-2 border-white"
                style={{ height: "150px", width: "150px" }}
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-12">
            <div className="col-span-12">
              <div className="flex flex-row justify-end">
                {name !== owner && window.location.pathname !== "/profile" && (
                  <>
                    {hasFollow ? (
                      <div className="ml-2 mt-2">
                        <div className="px-5 py-1 bg-blue-500 text-white border-2 rounded-full font-Vazirmatn">
                          <button
                            onClick={(e) =>
                              handleRemoveFollow(profile.username)
                            }
                          >
                            دنبال شده
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="ml-2 mt-2">
                        <div className="px-5 py-1 bg-white  rounded-full text-[#0f1419] font-bold font-Vazirmatn"
                        style={{border:"1px solid #d4d4d4"}}
                        >
                          <button
                            onClick={(e) => handleAddFollow(profile.username)}
                          >
                            دنبال کردن
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {/* {profile && profile.name !== owner && (
                    
                    // <FollowButtonCheck username={name} owner={owner} />
                  )} */}
                {/* <BiBell className="text-xl text-slate-500 mt-2" /> */}
              </div>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-12 pr-4 pt-10">
            <div className="sm:col-span-12 flex flex-col text-left">
              <div className="flex flex-row pt-10">
                <span
                  className="dark:text-white"
                  style={{ fontSize: "25px", fontWeight: "700" }}
                >
                  {profile?.username}
                </span>
              </div>
              <div className="flex flex-row pt-3">
                <span
                  className="text-right  font-Vazirmatn text-[#0f1419] w-2/4 sm:w-4/5  dark:text-slate-200"
                  style={{ fontSize: "18px", fontWeight: "300" }}
                >
                  {profile?.bio}
                </span>
              </div>
              {profile?.username === owner && (
                <div className="flex flex-row py-2">
                  <AiOutlineMail className="text-lg text-[#333] mt-1 mr-2 " />
                  <span
                    className=" mt-1 pr-2 text-slate-500 dark:text-slate-300"
                    style={{ fontSize: "13px", fontWeight: "600" }}
                  >
                    {profile?.email}
                  </span>
                </div>
              )}
              {profile.last_login && (
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
                <div className="text-center  text-slate-600 font-semibold">
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
            </div>
          </div>
        </>
      )}
    </>
  );
}

export { ProfileData };
