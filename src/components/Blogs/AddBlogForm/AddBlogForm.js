import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ProfileImage from "assets/images/userprofile/profile-image.webp";

function AddBlogForm() {
  return (
    <div className="flex flex-col pb-3 border-b-2 border-b-slate-300 sm:pt-3">
      <div className="grid grid-cols-6">
        <div className="col-span-1 p-2 flex justify-center flex-row">
          <div>
            <img
              src={ProfileImage}
              className="rounded-full"
              style={{ width: "40px", height: "40px" }}
            />
          </div>
        </div>
        <div className="col-span-5 flex flex-col justify-evenly">
          <div className="grid grid-cols-5 justify-between">
            <div className="col-span-4 flex flex-row">
              <span>MohammadReza</span>
              {/* <span className="text-slate-600 text-sm pt-1 pl-3">
                @mamadiR23
              </span> */}
            </div>
            <div className="col-span-12 sm:col-span-1 ml-5 sm:ml-0">
              <button
                disabled={true}
                className="text-sm bg-orange-500 disabled:bg-slate-300  text-white px-3 py-2 rounded-xl shadow-xl"
              >
                انتشار
              </button>
            </div>
          </div>
          <div className="pt-4 pl-8 pb-5">
            <form className="flex flex-col">
              <div className="py-3">
                <input type="file" className="p-2 w-full border-2 rounded-md" />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="عنوان ... "
                  className="p-2 w-full border-2 rounded-md font-Vazirmatn"
                />
              </div>
              <div>
                <label htmlFor="w3review" className="text-xs text-slate-500 font-Vazirmatn ">
                  کپشن پست
                </label>

                <textarea
                  id="w3review"
                  name="w3review"
                  rows="4"
                  cols="54"
                  className="border-2 hidden sm:block mt-2"
                ></textarea>
                <textarea
                  id="w3review"
                  name="w3review"
                  rows="4"
                  cols="25"
                  className="border-2 block sm:hidden mt-2"
                ></textarea>
                {/* <CKEditor id="PostCaption" editor={ClassicEditor} data="" /> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AddBlogForm };
