import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewComment } from "api/Comments/Comments.api";
import { insertNewComment } from "store/Reducers/Blogs/Blogs.Reducer";

function AddComment({ id }) {
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const handleAddComment = (e) => {
    e.preventDefault();

    // const formDataBody = new FormData();

    // formDataBody.append("body", body);

    dispatch(insertNewComment({ id: id, body: body }));
  };

  return (
    <div className="mx-auto flex flex-col justify-between py-2 ">
      <div className="grid grid-cols-6">
        <div className="col-span-1 p-2 flex justify-center flex-row">
          <div>
            <img
              src="#"
              className="rounded-full"
              style={{ width: "45px", height: "45px" }}
            />
          </div>
        </div>
        <div className="col-span-5 flex flex-col justify-evenly">
          <div className="grid grid-cols-5 justify-between">
            <div className="col-span-4 flex flex-row">
              <Link to="/user/mohammadreza">
                <span>MohammadReza</span>
              </Link>
            </div>
          </div>
          <form
            className="w-full mx-auto flex flex-col justify-between pl-5 mt-3"
            onSubmit={handleAddComment}
          >
            <div className="mx-auto w-full">
              <textarea
                className="w-full border-2 border-slate-100 px-3 pt-3 text-sm font-Vazirmatn "
                cols="70"
                rows="10"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder=" دیدگاه خود را بنویسید ..."
                required
              ></textarea>
            </div>
            <div className="mx-auto flex flex-row justify-start w-full">
              <div>
                <button className="bg-blue-500  hover:bg-green-500 ml-2 transition px-5 py-2 mt-5 font-Vazirmatn text-white text-sm rounded-lg shadow-md">
                  ثبت نظر
                </button>
              </div>
              <div>
                <button
                  onClick={(e) => setBody("")}
                  className="bg-red-500 hover:bg-slate-500 transition px-5 py-2 mt-5 font-Vazirmatn text-white text-sm rounded-lg shadow-md"
                >
                  انصراف
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export { AddComment };
