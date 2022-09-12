import { useState, useEffect } from "react";

const useCheckThemeMode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("color-theme")
      ? localStorage.getItem("color-theme")
      : null
  );
  return { theme };
};
export default useCheckThemeMode;
