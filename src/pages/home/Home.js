import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddBlogForm, SingleBlog } from "components";
import { axiosPrivate } from "services/Private/axiosPrivate";
import { getUserid } from "store/Reducers/Users/UsersReducer";
import "../../assets/css/output.css";


function Home() {
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [elementSize, setElementSize] = useState("auto");
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const height = window.screen.height;
    if (height === 736) {
      setIsMobileLayout(true);
    }
  }, []);
  useEffect(() => {
    dispatch(getUserid());
  }, []);
  const username = useSelector((state) => state.users.userData);
  console.log(username);
  const handleGetProfile = async (userid) => {
    try {
      const response = await axiosPrivate.get(`/polls/editprofile/${userid}`);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col sm:mt-0 mt-20 sm:mb-0 mb-12">

      <button onClick={(e) => handleGetProfile(6)}>GET PROFILE</button>

      <div className="hidden sm:block">

        <AddBlogForm />

      </div>
      
      <SingleBlog />

      <SingleBlog />
    </div>
  );
}

export { Home };
