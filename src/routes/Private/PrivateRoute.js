import { Navigate } from "react-router-dom";
import DefaultLayout from "Layout/default/DefaultLayout";

const PrivateRoute = ({ Component, hasLayout }) => {
  const isLoggedIn = localStorage.getItem("authToken");
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return hasLayout ? (
    <DefaultLayout>
      <Component />
    </DefaultLayout>
  ) : (
    <Component />
  );
};
export default PrivateRoute;
