import { Navigate } from "react-router-dom";
import { PATH } from "config/Path/Path.config.jsx";

function ProtectedRoute({ Component }) {
    const isLoggedIn = localStorage.getItem("authToken");


  if (isLoggedIn) {
    return <Navigate to={PATH.HOME} />;
  }
  return <Component />;
}

export default ProtectedRoute;
