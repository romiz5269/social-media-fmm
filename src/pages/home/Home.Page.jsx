import { useEffect } from "react";
import { AllBlogsByFollow } from "components";
import "../../assets/css/output.css";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="flex flex-col sm:mt-0 sm:mb-0 mb-12">
      <AllBlogsByFollow />
    </div>
  );
}

export { Home };
