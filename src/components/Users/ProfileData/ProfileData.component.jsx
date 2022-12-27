import profilepic from "assets/images/userprofile/defaultprofile.png";
import React, { Suspense } from "react";
import { BiArrowBack, BiMessageSquareError } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import {
  createNewFollow,
  removeFollow,
} from "store/Reducers/Users/UsersReducer";
import { clearProfileBlogs } from "store/Reducers/Blogs/Blogs.Reducer";
import { BlogLoader } from "components/Loading/BlogLoader/BlogLoader";

const ProfileInfo = React.lazy(() =>
  import("components/Users/ProfileFetchedData/ProfileFetchedData.component")
);
function ProfileData({ profile }) {
  const ProfileTopbar = React.lazy(() =>
    import("components/Users/ProfileTopbar/ProfileTopbar.component")
  );
  const ProfileInfo = React.lazy(() =>
    import("components/Users/ProfileInfo/ProfileInfo.component")
  );
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { name } = useParams();
  const owner = jwtDecode(localStorage.getItem("authToken")).name;
  const hasFollow = useSelector((state) => state.users.hasFollowThreadUser);
  const error = useSelector((state) => state.users.error);

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
          <div className="grid grid-cols-12">
            <div className="col-span-11 flex flex-col justify-start pr-3 py-1 ">
              {!error ? (
                <Suspense fallback={<BlogLoader />}>
                  <ProfileTopbar
                    username={profile?.username}
                    postcount={profile?.postcount}
                  />
                </Suspense>
              ) : (
                <div className="py-2 text-center flex flex-col justify-center items-start">
                  <div className="flex flex-col items-center justify-center">
                    <BiMessageSquareError className="text-[30px] text-slate-400" />
                    <span className="text-md pt-4 text-slate-400 font-bold">
                      {error}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-1 flex flex-col items-center justify-center ">
              <BiArrowBack
                onClick={(e) => Navigate(-1)}
                className="text-blue-600 text-lg hover:cursor-pointer dark:text-white"
              />
            </div>
          </div>
          <div
            className="flex flex-col relative bg-gradient-to-r from-blue-500 to-blue-600  sm:mb-0 mb-12 md:mt-0 mt-3 sm:mt-16"
            style={{ height: "180px" }}
          >
            {profile && (
              <div className="absolute object-fill bottom-0 top-28 right-5">
                <img
                  src={profile?.myimage ? profile?.myimage : profilepic}
                  className="rounded-full border-2 border-white"
                  style={{ height: "150px", width: "150px" }}
                />
              </div>
            )}
          </div>
          <div className="sm:grid sm:grid-cols-12">
            {profile ? (
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
                          <div
                            className="px-5 py-1 bg-white  rounded-full text-[#0f1419] font-bold font-Vazirmatn"
                            style={{ border: "1px solid #d4d4d4" }}
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
                </div>
              </div>
            ) : (
              <BlogLoader />
            )}
          </div>
          {!error ? (
            <Suspense fallback={<BlogLoader />}>
              <ProfileInfo profile={profile} owner={owner} />
            </Suspense>
          ) : (
            <div className="py-5 text-center flex flex-col justify-center items-start mt-16">
              <div className="flex flex-col items-center justify-center">
                <BiMessageSquareError className="text-[30px] text-slate-400" />
                <span className="text-md pt-4 text-slate-400 font-bold">
                  {error}
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export { ProfileData };
