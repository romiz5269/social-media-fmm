import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddBlogForm, AllBlogsByFollow, SingleBlog } from "components";
import { axiosPrivate } from "services/Private/axiosPrivate";
import "../../assets/css/output.css";
import { BiArrowBack } from "react-icons/bi";

function Home() {
  // const {ownerUsername}  = useGetOwnerUsername();
  // console.log("username", ownerUsername);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [elementSize, setElementSize] = useState("auto");
  const myRef = useRef();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const height = window.screen.height;
    if (height === 736) {
      setIsMobileLayout(true);
    }
  }, []);

  const username = useSelector((state) => state.users.userData);
  const handleGetProfile = async (userid) => {
    try {
      const response = await axiosPrivate.get(`/polls/myprofile/${userid}`);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const handleRefresh = async () => {
    try {
      const response = await axiosPrivate.post(
        `/login/api/token/refresh`,
        {},
        { withCredentials: true }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col sm:mt-0 mt-20 sm:mb-0 mb-12">
      <AllBlogsByFollow />
    </div>
  );
}

export { Home };
