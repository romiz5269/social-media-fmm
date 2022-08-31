import { FaCog } from "react-icons/fa";
import {
  MenuBar,
  NotificationButton,
  ProfileCard,
  SuggestBlogs,
  SuggestTags,
  SuggestUsers,
  UserProfile,
} from "Layout/components";
import AddBlog from "Layout/components/RightSideBar/AddBlog/AddBlog";
import { BiArrowBack } from "react-icons/bi";

function DefaultLayout({ children }) {
  return (
    <div className="container mx-auto max-w-screen-xl grid grid-cols-12">
      <div className="sm:hidden z-10 fixed top-0 w-full bg-white border-b-2 shadow-lg text-orange-500 col-span-12 py-2 px-5 flex flex-row justify-between">
        <div>
          <UserProfile />
        </div>
        <span className="text-xl font-semibold pt-2">LOGO</span>
        <div className="flex flex-row justify-center">
          <NotificationButton />
          <FaCog className="mt-3 mr-10 text-xl" />
        </div>
      </div>
      <div className="fixed sm:hidden bottom-32 right-3">
        <AddBlog />
      </div>
      <div className="fixed sm:hidden col-span-12 z-10 bottom-0 border-2 w-full bg-orange-200 pr-16">
        <MenuBar />
      </div>
      <div className="lg:col-span-3 sm:col-span-3 col-span-3 sm:flex sm:flex-col  sm:items-center pr-14 hidden">
        <div className="sm:sticky sm:top-10">
          <MenuBar />
          <AddBlog />
          {/* <ProfileCard /> */}
        </div>
      </div>
      <div
        style={{ border: "1px solid #e7e7e7" }}
        className="lg:col-span-5 sm:col-span-8  col-span-12  "
      >
        <div className="flex flex-row justify-end py-2 px-2">
          <BiArrowBack className="text-blue-600 text-xl" />
        </div>

        {children}
      </div>
      <div className="lg:col-span-4 hidden sm:hidden lg:flex lg:flex-col px-5">
        <SuggestBlogs />
        <div className="sm:sticky sm:top-0">
          <SuggestUsers />
          <SuggestTags />
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
