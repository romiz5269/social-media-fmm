import { AllExplorePosts } from "components";
import { useEffect } from "react";

function Explore() {
   useEffect(() => {
     window.scrollTo(0, 0);
   });
  return (
    <div>
      <AllExplorePosts />
    </div>
  );
}

export {Explore}
