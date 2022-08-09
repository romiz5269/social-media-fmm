import {
  FaComment,
  FaEllipsisH,
  FaHeart,
  FaRegComment,
  FaRegComments,
  FaRegEye,
  FaRegHeart,
} from "react-icons/fa";
import ProfileBrand from "assets/images/profilecard/ProfileBrand.jpg";
import ProfileImage from "assets/images/userprofile/profile-image.webp";
import PostImage from "assets/images/post/Instagram-Post-Ideas.png";
import { Link } from "react-router-dom";
function SingleBlog() {
  return (
    <div className="flex flex-col pb-3 border-b-2 border-b-slate-300 sm:pt-3">
      <div className="grid grid-cols-6">
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
        <div className="col-span-5 flex flex-col justify-evenly">
          <div className="grid grid-cols-5 justify-between">
            <div className="col-span-4 flex flex-row">
              <Link to="/user/mohammadreza">
                <span>MohammadReza</span>
              </Link>
              {/* <span className="text-slate-600 text-sm pt-1 pl-3">
                @mamadiR23
              </span> */}
              <span className="text-slate-500 text-xs pt-1 pr-3 font-Vazirmatn">14 ساعت</span>
            </div>
            <div className="col-span-1 flex flex-row justify-end py-1 px-3">
              <FaEllipsisH className="mt-1 text-sm text-slate-600" />
            </div>
          </div>
          <Link to="/thread/blog/4">
            <div className="pt-4 pl-4">
              <h2 className="text-xl text-right pr-3 font-semibold py-2 font-Vazirmatn">
                عنوان پست اول
              </h2>

              <p className="text-xs pt-3 font-Vazirmatn text-slate-700 text-justify  pr-3 leading-5 overflow-x-hidden overflow-y-hidden text-ellipsis">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
                جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد
                وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
            </div>
            <div className="py-2 pl-3">
              <img src={PostImage} className="rounded-lg mt-1" />
            </div>
          </Link>

          <div className="flex flex-row justify-start pb-2">
            <div className="flex flex-row justify-start ml-20">
              <FaRegComment className="ml-3 opacity-60" />
              <span className="text-xs pr-2">22</span>
            </div>
            <div className="flex flex-row justify-start ml-20">
              <FaRegHeart className="opacity-60" />
              <span className="text-xs pr-2">52</span>
            </div>
            <div className="flex flex-row justify-start ml-20">
              <FaRegComments className="opacity-60" />
              <span className="text-xs pr-2">4</span>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export { SingleBlog };
