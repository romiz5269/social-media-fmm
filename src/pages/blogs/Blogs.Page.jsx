import { AllBlogs } from "components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs } from "store/Reducers/Blogs/Blogs.Reducer";

function Blogs() {


  return (
    <div className="sm:mt-0 mt-20 sm:px-0 px-2 sm:mb-0 mb-20 ">
      <AllBlogs />
    </div>
  );
}

export { Blogs };
