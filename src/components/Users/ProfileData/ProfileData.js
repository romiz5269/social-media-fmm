import {
  FaCalendar,
  FaCamera,
  FaCheck,
  FaEnvelope,
  FaPencilAlt,
  FaRegTimesCircle,
  FaStickyNote,
  FaUser,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";
function ProfileData({ profile }) {
  const [editable, setEditable] = useState(false);
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [bio, setBio] = useState(profile.user_related_name?.bio);
  const [previewSrc, setPrewviewSrc] = useState(
    profile.user_related_name?.image
  );

  useEffect(() => {
    if (!editable) {
      setPrewviewSrc(profile.user_related_name?.image);
    }
  }, [editable]);

  const previewFile = (editable) => {
    console.log("preview : changed");
    var preview = document.querySelector("img");
    var file = document.querySelector("input[type=file]").files[0];
    preview.src = URL.createObjectURL(file);
    setPrewviewSrc(preview.src);
  };

  const profileImage = () => {
    document.getElementById("profile-image-upload").click();
  };

  return (
    <>
      {profile && (
        <>
          <div
            className="flex flex-col relative bg-gradient-to-r from-cyan-500 to-blue-500 sm:mt-0 mt-20 sm:mb-0 mb-12"
            style={{ height: "130px" }}
          >
            <div className="absolute object-fill bottom-0 top-20 right-5">
              {editable ? (
                <>
                  <div
                    className="profile-pic relative"
                    style={{ width: "110px", height: "110px" }}
                  >
                    <img
                      alt="User Pic"
                      src={previewSrc}
                      id="profile-image1"
                      onClick={(e) => profileImage()}
                      className="rounded-full border-t-4 border-t-white object-fill"
                      style={{ width: "110px", height: "110px" }}
                    />
                    <input
                      id="profile-image-upload"
                      className="hidden"
                      type="file"
                      onChange={(e) => previewFile()}
                    />
                    <div
                      style={{ color: "#999" }}
                      className="absolute left-6 bottom-4  bg-slate-400 px-2 pb-2 rounded-full text-xl "
                    >
                      <span className="text-xs text-white">
                        Click to upload
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <img
                  src={profile.user_related_name?.image}
                  className="rounded-full border-4 border-white"
                  style={{ height: "110px", width: "110px" }}
                />
              )}
            </div>

            {editable ? (
              <>
                <div className="absolute left-5 bottom-0 top-24">
                  <div
                    className="px-5 py-5 bg-white border-2 rounded-full"
                    onClick={() => setEditable(!editable)}
                  >
                    <FaRegTimesCircle
                      className="text-slate-800"
                      style={{ height: "15px", width: "15px" }}
                    />
                  </div>
                </div>
                <div className="absolute left-24 bottom-0 top-24">
                  <div className="px-5 py-5 bg-white border-2 rounded-full">
                    <FaCheck
                      className="text-slate-800"
                      style={{ height: "15px", width: "15px" }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="absolute left-5 bottom-0 top-24">
                <div
                  className="px-5 py-5 bg-white border-2 rounded-full"
                  onClick={() => setEditable(!editable)}
                >
                  <FaPencilAlt
                    className="text-slate-800"
                    style={{ height: "15px", width: "15px" }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="sm:grid sm:grid-cols-12 mt-16 pr-3 ">
            <div className="sm:col-span-6 flex flex-col text-left pl-3">
              <div className="flex flex-row">
                {editable ? (
                  <input
                    value={profile.username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                ) : (
                  <span
                    className="pr-2 "
                    style={{ fontSize: "18px", fontWeight: "700" }}
                  >
                    {profile.username}
                  </span>
                )}
              </div>
              <div className="flex flex-row">
                {editable ? (
                  <textarea onChange={(e) => setBio(e.target.value)}>
                    {bio}
                  </textarea>
                ) : (
                  <span
                    className="text-right  font-Vazirmatn text-slate-400 mt-1 w-2/4 sm:w-4/5 pr-2 pt-2 pb-5"
                    style={{ fontSize: "14px", fontWeight: "600" }}
                  >
                    {profile.user_related_name?.bio}
                  </span>
                )}
              </div>
              <div className="flex flex-row pb-2">
                <FaEnvelope className="text-lg text-slate-400 mt-1 mr-2 " />
                <span
                  className=" mt-1 pr-2 text-slate-500"
                  style={{ fontSize: "13px", fontWeight: "600" }}
                >
                  {profile.email}
                </span>
              </div>
              <div className="flex flex-row">
                <BiWorld
                  className="text-xl text-slate-400 mt-1 mr-2"
                  style={{ marginRight: "6px" }}
                />
                <span
                  className=" mt-1 pr-2 text-slate-500"
                  style={{ fontSize: "13px", fontWeight: "600" }}
                >
                  {profile.date_joined?.slice(0, 10)}
                </span>
              </div>
            </div>
            <div className="sm:col-span-6 p-5">
              <div className="bg-slate-300 rounded-md flex flex-col">
                <div className="flex flex-row justify-evenly py-2">
                  <div className="text-center flex flex-col text-slate-600 font-semibold">
                    <span className="font-Vazirmatn text-xs">پست ها</span>
                    <span className="text-sm">150</span>
                  </div>
                  <div className="text-center flex flex-col text-slate-600 font-semibold">
                    <span className="font-Vazirmatn text-xs">
                      دنبال کنندگان
                    </span>
                    <span className="text-sm">250</span>
                  </div>
                  <div className="text-center flex flex-col text-slate-600 font-semibold">
                    <span className="font-Vazirmatn text-xs">
                      دنبال شوندگان
                    </span>
                    <span className="text-sm">2k</span>
                  </div>
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
