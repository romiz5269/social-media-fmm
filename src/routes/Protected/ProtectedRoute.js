import { Navigate } from "react-router-dom";
import { PATH } from "config/Path/Path.config.js";
import useAuth from "hooks/useAuth";

function ProtectedRoute({ Component }) {
    const isLoggedIn = localStorage.getItem("authToken");

    // const { auth } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={PATH.HOME} />;
  }
  return <Component />;
}

export default ProtectedRoute;
