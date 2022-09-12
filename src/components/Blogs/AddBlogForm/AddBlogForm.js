import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { addNewBlog } from "store/Reducers/Blogs/Blogs.Reducer";
import ProfileImage from "assets/images/userprofile/profile-image.webp";
import previewPost from "assets/images/post/preview-post.png";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { fetchOwnerProfile } from "store/Reducers/Users/UsersReducer";
import { ImSpinner6, ImSpinner9 } from "react-icons/im";

function AddBlogForm() {
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState(null);
  const [processLoading, setProcessLoading] = useState(false);
  // const [postingStatus,setPosingStatus] = useState(false)
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewSrc, setPrewviewSrc] = useState(previewPost);

  const userId = jwtDecode(localStorage.getItem("authToken")).user_id;
  const postingStatus = useSelector((state) => state.blogs.postingStatus);
  // console.log(userName);
  const formDataBody = new FormData();
  const handleCreatePost = async (e) => {
    // dispatch(setPostingStatus(true));
    e.preventDefault();

    // set and config form data for send data as payload in post request

    formDataBody.append("title", title);
    formDataBody.append("content", content);
    formDataBody.append("user", userId);
    formDataBody.append("image", image);
    // make a post request with redux for login api

    dispatch(addNewBlog(formDataBody));
  };

  const postCreatedStatus = useSelector((state) => state.blogs.status);
  const ownerUsername = jwtDecode(localStorage.getItem("authToken"));

  useEffect(() => {
    dispatch(fetchOwnerProfile(ownerUsername.name));
  }, []);

  const miniProfile = useSelector((state) => state.users.ownerUser);
  useEffect(() => {
    if (postCreatedStatus !== "") {
      toast.success(postCreatedStatus);
      setImage(null);
      setPrewviewSrc(previewPost);
      setContent("");
      setTitle("");

      document.getElementById("createPostForm").reset();
    }
  }, [postCreatedStatus]);

  const previewFile = (data) => {
    setProcessLoading(true);

    var preview = document.querySelector("img");
    var file = data[0];

    setTimeout(() => {
      if (file && file.size < 2242880) {
        preview.src = URL.createObjectURL(file);
        setPrewviewSrc(preview.src);
        setImage(file);

        // console.log(file,'image Appended');
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
    <div className="flex flex-col  sm:rounded-lg  sm:w-[100%] sm:h-[100%]">
      <div className="grid sm:grid-cols-12 grid-cols-12">
        <div className="sm:col-span-12 col-span-12 flex flex-col sm:justify-evenly">
          <div className="sm:pt-4 pt-2 px-3 sm:px-10">
            <form
              className="flex flex-col"
              onSubmit={handleCreatePost}
              id="createPostForm"
            >
              {errMsg && <div>{errMsg}</div>}
              {processLoading ? (
                <>
                  <span className="text-xs text-red-500">
                    حجم عکس نباید بیشتر از 2 مگابایت باشد *
                  </span>
                  <span className="text-xs text-red-500">
                    فرمت های تصاویر قابل پذیرش jpg و png می باشد *
                  </span>
                  <div
                    className=" relative  my-3 rounded-md flex flex-row justify-center"
                    style={{ height: "300px", border: "2px dashed #ccc" }}
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
              ) : (
                <>
                  <span className="text-xs text-red-500">
                    حجم عکس نباید بیشتر از 2 مگابایت باشد *
                  </span>
                  <span className="text-xs text-red-500">
                    فرمت های تصاویر قابل پذیرش jpg و png می باشد *
                  </span>
                  <div
                    className=" relative  my-3 rounded-md flex flex-row justify-center"
                    style={{ height: "300px", border: "2px dashed #ccc" }}
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
                  className="p-2 w-full border-2 rounded-md font-Vazirmatn bg-slate-100 focus:bg-slate-50"
                />
              </div>
              <div>
                <textarea
                  id="w3review"
                  name="w3review"
                  rows="5"
                  value={content}
                  placeholder="کپشن پست ..."
                  onChange={(e) => setContent(e.target.value)}
                  className="border-2 hidden sm:block mt-2 w-full font-Vazirmatn pr-2 pt-2 bg-slate-100 focus:bg-slate-50"
                  required
                ></textarea>
                <textarea
                  id="w3review"
                  name="w3review"
                  rows="4"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="border-2 block sm:hidden mt-2 w-full"
                ></textarea>
                <div className="w-full flex flex-row justify-center py-5 ">
                  {processLoading ? (
                    <button
                      disabled
                      type="button"
                      className="text-sm  disabled:bg-slate-500 font-Vazirmatn  text-white py-3 w-full rounded-xl shadow-xl flex flex-row justify-center"
                    >
                      <ImSpinner6 className="animate-spin text-white text-lg ml-3" />
                      <span className="text-white"> Image Processing </span>
                    </button>
                  ) : (
                    <>
                      {postingStatus ? (
                        <button
                          disabled
                          type="button"
                          className="text-sm  disabled:bg-slate-500 font-Vazirmatn  text-white py-3 w-full rounded-xl shadow-xl flex flex-row justify-center"
                        >
                          <ImSpinner9 className="animate-spin text-white text-lg ml-3" />
                          <span className="text-white">Posting</span>
                        </button>
                      ) : (
                        <button className="text-sm bg-gradient-to-r from-red-600  to-orange-600 hover:bg-gradient-to-r hover:from-red-700  hover:to-orange-600 disabled:bg-slate-300 font-Vazirmatn  text-white py-3 w-full rounded-xl shadow-xl">
                          انتشار
                        </button>
                      )}
                    </>
                  )}
                </div>
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
