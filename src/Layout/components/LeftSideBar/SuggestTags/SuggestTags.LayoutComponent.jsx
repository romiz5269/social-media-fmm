import useCheckThemeMode from "hooks/useCheckThemeMode.hook";
import { Link } from "react-router-dom";
import { SuggestSingleTag } from "./SuggestSingleTag/SuggestSingleTag.LayoutComponent";

function SuggestTags() {
  const { theme } = useCheckThemeMode();
  return (
    <div
      className="flex flex-col rounded-[20px] bg-[#F7F9F9] mt-4 px-4"
      style={theme ? { backgroundColor: "#36393f" } : {}}
    >
      <div className="pb-3">
        <h2 className="text-[#606F7B] text-sm pt-5 font-Vazirmatn">
          هشتگ های محبوب
        </h2>
      </div>
      <SuggestSingleTag />
      <SuggestSingleTag />
      <SuggestSingleTag />
      <Link to="/popular/tags">
        <div className="text-start text-sm py-5 text-blue-400 font-[300] dark:text-green-500 z-10 font-Vazirmatn">
          مشاهده بیشتر
        </div>
      </Link>
    </div>
  );
}

export { SuggestTags };
