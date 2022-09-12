import useCheckThemeMode from "hooks/useCheckThemeMode.hook";
import { Link } from "react-router-dom";
import { SuggestSingleTag } from "./SuggestSingleTag/SuggestSingleTag";

function SuggestTags() {
  const { theme } = useCheckThemeMode();
  return (
    <div
      className="flex flex-col rounded-md shadow-xl mt-5"
      style={theme ? { backgroundColor: "#36393f" } : {}}
    >
      <div className="p-3">
        <h2 className="text-slate-400 text-sm pt-5 font-Vazirmatn">
          هشتگ های محبوب
        </h2>
      </div>
      <SuggestSingleTag />
      <Link to="/popular/tags">
        <div className="text-center text-sm py-2 text-blue-700 dark:text-green-500 border-t-2 z-10 font-Vazirmatn">
          مشاهده بیشتر
        </div>
      </Link>
    </div>
  );
}

export { SuggestTags };
