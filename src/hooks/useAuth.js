import AuthContext from "Context/AuthContext/AuthContext.auth";
import { useContext, useDebugValue } from "react";

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));
  return useContext(AuthContext);
};

export default useAuth;
