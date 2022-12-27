import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { BiCheck,  BiPencil, BiX } from "react-icons/bi";
import { SlPencil, SlTrash } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { EditSingleBlog } from "store/Reducers/Blogs/Blogs.Reducer";
import previewPost from "assets/images/post/preview-post.png";

function EditBlogForm({ blog }) {
  const [content, setContent] = useState(blog?.content);
  const [title, setTitle] = useState(blog?.title);
  const [previewSrc, setPrewviewSrc] = useState(blog?.myimage);
  const [editable, setEditable] = useState(false);
  const [image, setImage] = useState(blog?.myimage);
  const formDataBody = new FormData();

  const dispatch = useDispatch();
  const hanldeUpdateBlog = (e, id) => {
    e.preventDefault();
    formDataBody.append("id", blog.id);
    formDataBody.append("title", title);
    formDataBody.append("content", content);
    formDataBody.append("image", image);

    // make a post request with redux for login api
    dispatch(EditSingleBlog({ id: blog.id, formDataBody }));

  };

  const previewFile = () => {
    var preview = document.querySelector("img");
    var file = document.querySelector("input[type=file]").files[0];
    setImage(file);
    preview.src = URL.createObjectURL(file);
    setPrewviewSrc(preview.src);
  };
  const profileImage = () => {
    document.getElementById("profile-image-upload").click();
  };
  const handleCancelUploadNewImage = () => {
    setEditable(false);
    setImage(null);
    setPrewviewSrc(blog?.image);
  };
  return (
    <div className="w-full flex flex-col justify-center">
      {blog ? (
        <>
          <form
            onSubmit={(e) => hanldeUpdateBlog(e, blog.id)}
            className="flex flex-col justify-center "
          >
            <div className="flex flex-row justify-center w-full mx-auto pb-3 pt-2">
              <BiPencil className="text-2xl text-slate-500 ml-1" />
              <h3 className="font-Vazirmatn text-lg text-slate-500">
                باکس ویرایش بلاگ
              </h3>
            </div>
            <div className=" flex flex-col justify-center mx-auto mb-4 w-full">
              {editable ? (
                <>
                  <div
                    className="profile-pic relative w-full rounded-md "
                    style={{ border: "1px solid #e8e8e8" }}
                  >
                    <img
                      alt="User Pic"
                      src={previewSrc !== null ? previewSrc : previewPost}
                      id="profile-image1"
                      onClick={(e) => profileImage()}
                      className=" rounded-md object-fill"
                      style={{ width: "100%", height: "250px" }}
                    />
                    <input
                      id="profile-image-upload"
                      className="hidden"
                      type="file"
                      onChange={(e) => previewFile()}
                    />
                    <div
                      style={{ color: "#999" }}
                      className="absolute left-4 bottom-4  bg-slate-400  rounded-full text-sm"
                    >
                      <span className="text-xs text-white px-1">
                        Click to upload
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={previewSrc !== null ? previewSrc : previewPost}
                    className="rounded-md border-dashed border-2"
                    style={{ height: "250px", width: "100%" }}
                  />
                </>
              )}
              {editable ? (
                <div className="sm:flex sm:flex-row flex flex-col absolute top-16 left-8 ">
                  <span
                    className="bg-white  p-2  hover:cursor-pointer border"
                    onClick={(e) => setEditable(false)}
                  >
                    <BiCheck className="text-green-500 text-xl" />
                  </span>
                  <span
                    className="bg-white  p-2  hover:cursor-pointer border"
                    onClick={(e) => handleCancelUploadNewImage()}
                  >
                    <BiX className="text-red-600 text-xl " />
                  </span>
                </div>
              ) : (
                <div className="flex flex-row absolute top-16 left-8">
                  <span
                    className="bg-white  p-2  hover:cursor-pointer border"
                    onClick={(e) => setEditable(true)}
                  >
                    <SlPencil className="text-xl" />
                  </span>
                  <span
                    className="bg-white  p-2  hover:cursor-pointer border"
                    onClick={(e) => {
                      setImage(null);
                      setPrewviewSrc(null);
                    }}
                  >
                    <SlTrash className="text-red-600 text-xl" />
                  </span>
                </div>
              )}
             
            </div>
            <div className="w-full flex flex-col justify-center mx-auto">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-slate-300 rounded-md py-2 pr-3 font-Vazirmatn text-md text-slate-600 focus:bg-slate-100"
              />
            </div>
            <div className="w-full flex flex-col justify-center mx-auto my-4">
              <textarea
                type="text"
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-slate-300 rounded-md py-2 pr-3 font-Vazirmatn text-md text-slate-600 focus:bg-slate-100"
              />
            </div>
            <div className="w-full flex flex-col justify-center mx-auto">
              <button className="w-full transition ease-in-out delay-150 bg-orange-500   hover:bg-red-500 duration-300  px-10 py-2 rounded-md font-Vazirmatn text-white">
                ذخیره تغییرات
              </button>
            </div>
          </form>
        </>
      ) : (
        "Failed to Load Data"
      )}
      <Toaster position="top-center" />
    </div>
  );
}

export { EditBlogForm };
