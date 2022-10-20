import { Link } from "react-router-dom";
import { SuggestSingleUser } from "./SuggestSingleUser/SuggestSingleUser.LayoutComponent";

function SuggestUsers({ theme }) {
  return (
    <div
      className="flex flex-col rounded-[20px] bg-[#F7F9F9] mt-4 px-4"
      style={theme ? { backgroundColor: "#36393f" } : {}}
    >
      <div>
        <h2
          className="text-[#606F7B] text-sm pt-5 pb-2"
          style={{ fontFamily: "Vazirmatn" }}
        >
          کاربران ممتاز
        </h2>
      </div>
      <SuggestSingleUser />
      <SuggestSingleUser />
      <SuggestSingleUser />
      <Link to="/popular/users">
        <div
          className="text-start py-5 text-blue-400 dark:text-green-500 text-sm font-[300] z-10"
          style={{ fontFamily: "Vazirmatn" }}
        >
          مشاهده بیشتر
        </div>
      </Link>
    </div>
  );
}

export { SuggestUsers };
