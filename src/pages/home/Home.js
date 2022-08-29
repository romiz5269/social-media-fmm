import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddBlogForm, SingleBlog } from "components";
import { axiosPrivate } from "services/Private/axiosPrivate";
import { getUserid } from "store/Reducers/Users/UsersReducer";
import "../../assets/css/output.css";
import { useGetOwnerUsername } from "hooks/useGetOwnerUsername.hook";

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
  useEffect(() => {
    // window.scrollTo(0, 0);
    dispatch(getUserid());
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
        `/polls/token/refresh/`,
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
      {/* <button onClick={(e) => handleGetProfile(6)}>GET PROFILE</button>
      <button onClick={(e) => handleRefresh()}>GET REFRESH</button> */}

      <div className="hidden sm:block">
        <AddBlogForm />
      </div>

      <SingleBlog />

      <SingleBlog />
    </div>
  );
}

export { Home };
