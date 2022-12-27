import React from "react";
import { BiEditAlt, BiX } from "react-icons/bi";

function SettingProfileImage({
  whatsChanged,
  editable,
  setEditable,
  previewSrc,
  profile,
  profileImage,
  previewFile,
  handleCancelUploadNewImage,
  handleImageUploading,
}) {
  return (
    <form encType="multipart/form-data" onSubmit={handleImageUploading}>
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
                src={previewSrc}
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
                <span className="text-xs text-white px-1">Click to Browse</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <img
              src={previewSrc}
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
              // onClick={(e) => {
              //   setEditable(!editable);
              // }}
            >
              <button>Save and upload</button>
              {/* <BiCheck className="text-green-500 text-xl" /> */}
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
    </form>
  );
}

export default SettingProfileImage;
