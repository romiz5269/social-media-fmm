import useAuth from "hooks/useAuth";
import DefaultLayout from "Layout/default/DefaultLayout";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ Component, hasLayout }) => {
  const isLoggedIn = localStorage.getItem('authToken');
    // const { auth } = useAuth();
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
