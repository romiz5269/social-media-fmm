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
            className="flex flex-col relative bg-orange-400 sm:mt-0 mt-20 sm:mb-0 mb-12"
            style={{ height: "150px" }}
          >
            <div className="absolute object-fill bottom-0 top-16 right-12">
              {editable ? (
                <>
                  <div
                    className="profile-pic relative"
                    style={{ width: "140px", height: "140px" }}
                  >
                    <img
                      alt="User Pic"
                      src={previewSrc}
                      id="profile-image1"
                      onClick={(e) => profileImage()}
                      className="rounded-full border-8 border-white object-fill"
                      style={{ width: "140px", height: "140px" }}
                    />
                    <input
                      id="profile-image-upload"
                      className="hidden"
                      type="file"
                      onChange={(e) => previewFile()}
                    />
                    <div  style={{ color: "#999" }} className="absolute left-6 bottom-12  bg-slate-400 px-2 pb-2 rounded-full text-xl "><span className="text-xs text-white">Click to upload</span></div>
                  </div>
                </>
              ) : (
                <img
                  src={profile.user_related_name?.image}
                  className="rounded-full border-8 border-white"
                  style={{ height: "140px", width: "140px" }}
                />
              )}
            </div>

            {editable ? (
              <>
                <div className="absolute left-12 bottom-0 top-28">
                  <div
                    className="px-5 py-5 bg-white border-2 rounded-full"
                    onClick={() => setEditable(!editable)}
                  >
                    <FaRegTimesCircle
                      className="text-slate-800"
                      style={{ height: "25px", width: "25px" }}
                    />
                  </div>
                </div>
                <div className="absolute left-32 bottom-0 top-28">
                  <div className="px-5 py-5 bg-white border-2 rounded-full">
                    <FaCheck
                      className="text-slate-800"
                      style={{ height: "25px", width: "25px" }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="absolute left-12 bottom-0 top-28">
                <div
                  className="px-5 py-5 bg-white border-2 rounded-full"
                  onClick={() => setEditable(!editable)}
                >
                  <FaPencilAlt
                    className="text-slate-800"
                    style={{ height: "25px", width: "25px" }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="sm:grid sm:grid-cols-12 mt-16">
            <div className="sm:col-span-6 flex flex-col text-left pl-3">
              <div className="flex flex-row">
                <FaUser className="text-xs text-slate-500 mt-2 mr-2" />
                {editable ? (
                  <input
                    value={profile.username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                ) : (
                  <span className="text-xl font-semibold pr-2">
                    {profile.username}
                  </span>
                )}
              </div>
              <div className="flex flex-row py-2">
                <FaEnvelope className="text-xs text-slate-500 mt-2 mr-2" />
                <span className="text-sm mt-1 pr-2">
                  {profile.email}
                </span>
              </div>
              <div className="flex flex-row py-2">
                <FaCalendar className="text-xs text-slate-500 mt-2 mr-2" />
                <span className="text-sm mt-1 pr-2">
                  {profile.date_joined?.slice(0, 10)}
                </span>
              </div>
              <div className="flex flex-row">
                <FaStickyNote className="text-xs text-slate-500 mt-2 mr-2" />
                {editable ? (
                  <textarea onChange={(e) => setBio(e.target.value)}>
                    {bio}
                  </textarea>
                ) : (
                  <span className="text-sm text-right font-Vazirmatn text-slate-700 mt-1 w-2/4 sm:w-4/5 pr-2">
                    {profile.user_related_name?.bio}
                  </span>
                )}
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
