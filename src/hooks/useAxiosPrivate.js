import { axiosPrivate } from "services/Http/axios";
import { useEffect, useContext } from "react";
import useRefreshToken from "./useRefreshToken";
import AuthContext from "Context/AuthContext/AuthContext.auth";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (req) => {
        const user = jwt_decode(auth.accessToken);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        // console.log("isExpired", isExpired);
        if (!isExpired) return req;
        const response = await refresh();
        localStorage.setItem("authToken", JSON.stringify(response.data));
        req.headers.Authorization = `Bearer ${response?.data.access}`;
        return req;
      }
      // (config) => {
      //   if (!config.headers["Authorization"]) {
      //     config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
      //   }
      //   return config;
      // },
      // (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${newAccessToken.access}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};
export default useAxiosPrivate;
