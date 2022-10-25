import { useState } from "react";
import toast from "react-hot-toast";
import { BiCheck, BiEditAlt, BiTrash, BiX } from "react-icons/bi";
import { SlPencil } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { EditSingleBlog } from "store/Reducers/Blogs/Blogs.Reducer";
import previewPost from "assets/images/post/preview-post.png";

function EditBlogForm({ blog }) {
  const [content, setContent] = useState(blog?.content);
  const [title, setTitle] = useState(blog?.title);
  const [previewSrc, setPrewviewSrc] = useState(blog?.myimage);
  const [editable, setEditable] = useState(false);
  const [image, setImage] = useState(null);
  const formDataBody = new FormData();

  const dispatch = useDispatch();
  const hanldeUpdateBlog = (e, id) => {
    e.preventDefault();
    formDataBody.append("id", blog.id);
    formDataBody.append("title", title);
    formDataBody.append("content", content);
    formDataBody.append("myimage", image);
    // make a post request with redux for login api

    dispatch(EditSingleBlog({ id: blog.id, formDataBody }));
    // dispatch(
    //   EditSingleBlog({
    //     id: id,
    //     myimage: image,
    //     content: content,
    //     title: title,
    //   })
    // );
  };

  const previewFile = () => {
    var preview = document.querySelector("img");
    var file = document.querySelector("input[type=file]").files[0];
    console.log("file : ", file);
    setImage(file);
    preview.src = URL.createObjectURL(file);
    setPrewviewSrc(preview.src);
  };
  console.log("image : ", image);
  const profileImage = () => {
    document.getElementById("profile-image-upload").click();
  };
  const handleCancelUploadNewImage = () => {
    setEditable(false);
    setImage(null);
    setPrewviewSrc(blog?.myimage);
  };
  return (
    <>
      {blog ? (
        <div className="flex flex-col items-center justify-center h-[480px] w-full">
          <form
            onSubmit={(e) => hanldeUpdateBlog(e, blog.id)}
            encType="multipart/form-data"
            className="flex flex-col items-center  h-full w-full"
          >
            <div className="w-full">
              {editable ? (
                <>
                  <div
                    className="profile-pic relative w-full rounded-md"
                    style={{ border: "1px solid #e8e8e8" }}
                  >
                    <img
                      alt="User Pic"
                      src={previewSrc}
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
                    src={previewSrc}
                    className="rounded-md"
                    style={{ height: "250px", width: "100%" }}
                  />
                </>
              )}
              {editable ? (
                <div className="sm:flex sm:flex-row flex flex-col absolute top-8 left-5 ">
                  <span
                    className="bg-white  p-2  hover:cursor-pointer"
                    onClick={(e) => setEditable(false)}
                  >
                    <BiCheck className="text-green-500 text-xl" />
                  </span>
                  <span
                    className="bg-white  p-2  hover:cursor-pointer"
                    onClick={(e) => handleCancelUploadNewImage()}
                  >
                    <BiX className="text-red-600 text-xl" />
                  </span>
                </div>
              ) : (
                <span
                  className="bg-white rounded-full p-2  hover:cursor-pointer absolute top-8 left-5"
                  onClick={(e) => setEditable(true)}
                >
                  <SlPencil className="text-xl" />
                </span>
              )}
            </div>
            <div className="w-full my-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-2 h-[50px] bg-white outline-none px-2 py-2 text-md font-Vazirmatn text-slate-600 rounded-md "
                style={{ border: "1px solid #e8e8e8" }}
              />
            </div>
            <div className="w-full my-2 ">
              <textarea
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="4"
                className="border-2 w-[100%] bg-white outline-none px-2 py-2 text-md font-Vazirmatn text-slate-600 rounded-md "
                style={{ border: "1px solid #e8e8e8" }}
              />
            </div>
            <div className="w-full">
              <button className=" bg-gradient-to-r from-blue-500 to-blue-600 py-2 px-10  text-white font-Vazirmatn w-full rounded-md ">
                ثبت تغییرات
              </button>
            </div>
          </form>
        </div>
      ) : (
        "failed to load data"
      )}
    </>
  );
}

export { EditBlogForm };
