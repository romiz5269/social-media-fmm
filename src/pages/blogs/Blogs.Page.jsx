import { AllBlogs } from "components";
import { useEffect } from "react";
function Blogs() {
   useEffect(() => {
     window.scrollTo(0, 0);
   });
  return (
    <div className="sm:mt-0  sm:px-0  sm:mb-0 mb-20">
      <AllBlogs />
    </div>
  );
}
export { Blogs };
