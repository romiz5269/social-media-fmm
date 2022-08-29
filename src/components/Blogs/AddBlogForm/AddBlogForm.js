import { useState } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { addNewBlog } from "store/Reducers/Blogs/Blogs.Reducer";
import ProfileImage from "assets/images/userprofile/profile-image.webp";
import previewPost from "assets/images/post/preview-post.png";

function AddBlogForm() {
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState(null);
  const [processLoading, setProcessLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewSrc, setPrewviewSrc] = useState(previewPost);
  const formDataBody = new FormData();
  const handleCreatePost = async (e) => {
    e.preventDefault();

    // set and config form data for send data as payload in post request

    formDataBody.append("title", title);
    formDataBody.append("content", content);

    // make a post request with redux for login api

    dispatch(addNewBlog(formDataBody));
  };

  const previewFile = (data) => {
    setProcessLoading(true);

    var preview = document.querySelector("img");
    var file = data[0];

    setTimeout(() => {
      if (file && file.size < 2242880) {
        preview.src = URL.createObjectURL(file);
        setPrewviewSrc(preview.src);
        setImage(file);
        formDataBody.append("image", file);
        setProcessLoading(false);
      } else {
        setProcessLoading(false);
        toast.error("Your Image size is too large!");
      }
    }, 2000);
  };
  const profileImage = () => {
    document.getElementById("profile-image-upload").click();
  };
  return (
    <div className="flex flex-col pb-3  shadow-lg rounded-lg sm:pt-3">
      <div className="grid grid-cols-6">
        <div className="col-span-1 p-2 flex justify-center flex-row">
          <div>
            <img
              src={ProfileImage}
              className="rounded-full"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
        </div>
        <div className="col-span-5 flex flex-col justify-evenly">
          <div className="grid grid-cols-5 justify-between">
            <div className="col-span-4  flex flex-row">
              <span>MohammadReza</span>
            </div>
            <div className="col-span-12 sm:col-span-1 ml-5 sm:ml-0"></div>
          </div>
          <div className="pt-4 pl-8 pb-5">
            <form className="flex flex-col" onSubmit={handleCreatePost}>
              <div className="w-full flex flex-row justify-end">
                <button className="text-sm bg-orange-500 disabled:bg-slate-300 font-Vazirmatn  text-white  px-5 py-2 rounded-xl shadow-xl">
                  انتشار
                </button>
              </div>
              {errMsg && <div>{errMsg}</div>}
              {processLoading ? (
                <>
                  <div className="flex flex-row-reverse mx-auto">
                    <div class="loader"></div>
                    <span className="text-md pl-3 mb-3">
                      ... Image Processing{" "}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-sm text-red-500">
                    حجم عکس نباید بیشتر از 2 مگابایت باشد *
                  </span>
                  <span className="text-sm text-red-500">
                    فرمت های تصاویر قابل پذیرش jpg و png می باشد *
                  </span>
                  <div
                    className=" relative border-2 my-3 rounded-md flex flex-row justify-center"
                    style={{ height: "300px" }}
                  >
                    <img
                      alt="User Pic"
                      src={previewSrc}
                      id="profile-image1"
                      onClick={(e) => profileImage()}
                    />
                    <input
                      id="profile-image-upload"
                      className="hidden"
                      accept="image/x-png,image/jpeg"
                      type="file"
                      onChange={(e) => previewFile(e.target.files)}
                    />
                  </div>
                </>
              )}
              <div>
                <input
                  type="text"
                  placeholder="عنوان ... "
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="p-2 w-full border-2 rounded-md font-Vazirmatn"
                />
              </div>
              <div>
                <label
                  htmlFor="w3review"
                  className="text-xs text-slate-500 font-Vazirmatn "
                >
                  کپشن پست
                </label>

                <textarea
                  id="w3review"
                  name="w3review"
                  rows="4"
                  cols="65"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="border-2 hidden sm:block mt-2"
                  required
                ></textarea>
                <textarea
                  id="w3review"
                  name="w3review"
                  rows="4"
                  cols="25"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="border-2 block sm:hidden mt-2"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export { AddBlogForm };
