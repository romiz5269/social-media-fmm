import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PATH } from "../config/Path/Path.config.jsx";
import * as Page from "../pages/index.BasePage";
import { PublicRoute } from ".";
import PrivateRoute from "./Private/PrivateRoute.Route.jsx";
import ProtectedRoute from "./Protected/ProtectedRoute.Route.jsx";

function AppRoute() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Navigate to="/home" replace />} />
          <Route
            path={PATH.HOME}
            element={
              <PrivateRoute Component={() => <Page.Home />} hasLayout={true} />
            }
          />
          <Route
            path={PATH.EXPLORE}
            element={
              <PublicRoute
                Component={() => <Page.Explore />}
                hasLayout={true}
              />
            }
          />
          <Route
            path={PATH.BLOGS}
            element={
              <PrivateRoute Component={() => <Page.Blogs />} hasLayout={true} />
            }
          />
          <Route
            path={PATH.PRODUCTS}
            element={
              <PrivateRoute
                Component={() => <Page.Products />}
                hasLayout={true}
              />
            }
          />
          <Route
            path={PATH.NOTIFICATIONS}
            element={
              <PrivateRoute
                Component={() => <Page.Notifications />}
                hasLayout={true}
              />
            }
          />
          <Route
            path={PATH.SETTINGS}
            element={
              <PrivateRoute
                Component={() => <Page.Settings />}
                hasLayout={false}
              />
            }
          />
          <Route
            path={PATH.BLOGTHREAD}
            element={
              <PrivateRoute
                Component={() => <Page.BlogDetail />}
                hasLayout={true}
              />
            }
          />
          <Route
            path={PATH.POPULARBLOGS}
            element={
              <PrivateRoute
                Component={() => <Page.PopularBlogs />}
                hasLayout={true}
              />
            }
          />
          <Route
            path={PATH.POPULARUSERS}
            element={
              <PrivateRoute
                Component={() => <Page.PopularUsers />}
                hasLayout={true}
              />
            }
          />
          <Route
            path={PATH.POPULARTAGS}
            element={
              <PrivateRoute
                Component={() => <Page.PopularTags />}
                hasLayout={true}
              />
            }
          />
          <Route
            path={PATH.THREADUSERPROFILE}
            element={
              <PrivateRoute
                Component={() => <Page.ShowUsersProfile />}
                hasLayout={true}
              />
            }
          />
          <Route
            path={PATH.PROFILE}
            element={
              <PrivateRoute
                Component={() => <Page.Profile />}
                hasLayout={true}
              />
            }
          />
          <Route
            path={PATH.REGISTER}
            element={<ProtectedRoute Component={() => <Page.Register />} />}
          />
          <Route
            path={PATH.VERIFY}
            element={
              <PrivateRoute Component={() => <Page.VerifyConfirmationPage />} hasLayout={false} />
            }
          />
          <Route
            path={PATH.LOGIN}
            element={<ProtectedRoute Component={() => <Page.Login />} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default AppRoute;
