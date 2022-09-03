import { Link } from "react-router-dom";
import { SuggestSingleUser } from "./SuggestSingleUser/SuggestSingleUser";

function SuggestUsers() {
  return (
    <div className="flex flex-col rounded-lg shadow-md mt-5">
      <div className="p-3">
        <h2
          className="text-slate-400 text-sm pt-5"
          style={{ fontFamily: "Vazirmatn" }}
        >
          کاربران ممتاز
        </h2>
      </div>
      <SuggestSingleUser />
      <SuggestSingleUser />
      <Link to="/popular/users">
        <div
          className="text-center py-3 text-blue-700 text-sm border-t-2 z-10"
          style={{ fontFamily: "Vazirmatn" }}
        >
          مشاهده بیشتر
        </div>
      </Link>
    </div>
  );
}

export {SuggestUsers}
