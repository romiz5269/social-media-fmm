import { AddBlogForm, SingleBlog } from "components";
import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "services/Http/axios";
import "../../assets/css/output.css";
function Home() {
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [elementSize, setElementSize] = useState("auto");
  useLayoutEffect(() => {
    const height = window.screen.height;
    if (height === 736) {
      setIsMobileLayout(true);
    }
  }, []);
  // const handleRefresh = async () => {
  //   const response = await http
  //     .post("/polls/token/refresh/", {
  //       headers: { Authorizaton: `Bearer ${authToken?.access}` },
  //       withCredentials: true,
  //     })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err.message));
  // };
  // <button onClick={() => handleRefresh()}>refresh</button>;

  return (
    <div className="flex flex-col sm:mt-0 mt-20 sm:mb-0 mb-12">
      <div className="hidden sm:block">
        <AddBlogForm />
      </div>
      <SingleBlog />

      <SingleBlog />
    </div>
  );
}

export { Home };
