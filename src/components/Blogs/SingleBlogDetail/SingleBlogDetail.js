import { Link } from "react-router-dom";
import { SingleBlog } from "../SingleBlog/SingleBlog";
import ProfileImage from "assets/images/userprofile/profile-image.webp";
import { FaEllipsisH } from "react-icons/fa";
import { AddComment } from "components/comments/AddComment/AddComment";

function SingleBlogDetail() {
  return (
    <div>
      <SingleBlog />
      <AddComment />

      <div className="flex flex-col">
        <div className="grid grid-cols-6 ">
          <div className="col-span-1 p-2 flex justify-center flex-row">
            <div>
              <Link to="/user/mohammadreza">
                <img
                  src={ProfileImage}
                  className="rounded-full"
                  style={{ width: "60px", height: "60px" }}
                />
              </Link>
            </div>
          </div>
          <div className="col-span-5">
            <div className="grid grid-cols-5 justify-between">
              <div className="col-span-4 flex flex-row">
                <Link to="/user/mohammadreza">
                  <span>MohammadReza</span>
                </Link>
                {/* <span className="text-slate-600 text-sm pt-1 pl-3">
                @mamadiR23
              </span> */}
                <span className="text-slate-500 text-xs pt-1 pr-3">14 h</span>
              </div>
              <div className="col-span-1 flex flex-row justify-end py-1 px-3">
                <FaEllipsisH className="mt-1 text-sm text-slate-600" />
              </div>
            </div>
            <div className="pt-4">
              <p className="text-xs pt-3   text-slate-700 text-justify  pl-3 leading-5 overflow-x-hidden overflow-y-hidden text-ellipsis">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6 mb-5 mt-3">
          <div className="col-span-1 p-2 flex justify-center flex-row"></div>
          <div className="col-span-5">
            <div className="grid grid-cols-6 justify-between mt-3 ">
              <div className="col-span-1 p-2 flex justify-center flex-row">
                <div>
                  <Link to="/user/mohammadreza">
                    <img
                      src={ProfileImage}
                      className="rounded-full"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </Link>
                </div>
              </div>

              <div className="col-span-4 flex flex-row">
                <Link to="/user/mohammadreza">
                  <span>MohammadReza</span>
                </Link>
                {/* <span className="text-slate-600 text-sm pt-1 pl-3">
                @mamadiR23
              </span> */}
                <span className="text-slate-500 text-xs pt-1 pr-3">14 h</span>
              </div>
              <div className="col-span-1 flex flex-row justify-end py-1 px-3">
                <FaEllipsisH className="mt-1 text-sm text-slate-600" />
              </div>
            </div>
            <div className="pt-4">
              <p className="text-xs pt-3 font-Vazirmatn text-slate-700 text-justify  pl-3 leading-5 overflow-x-hidden overflow-y-hidden text-ellipsis">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SingleBlogDetail };
