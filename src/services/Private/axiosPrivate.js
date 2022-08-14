import axios from "axios";
import { URL } from "config/Urls/Urls.config";
import { http } from "services/Http/axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";


export const axiosPrivate = axios.create({
  baseURL: URL.REQ_URL,
  withCredentials: true,
});


export const requestIntercept = axiosPrivate.interceptors.request.use(
  async (req) => {

    // set authToken from localStorage

    let authToken = localStorage.getItem("authToken")
      ? localStorage.getItem("authToken")
      : null;

    console.log("request intercepter ran");

    //set authToken as authorization header in req structure

    req.headers["Authorization"] = `Bearer ${authToken}`;

    // set expiration lifeCycle 

    const user = jwt_decode(authToken);
    const nowTimestamp = dayjs().unix();
    const isExpired = nowTimestamp > user.exp;

    if (!isExpired) return req;

    //fetch new Access Token and set as req header and save in localStorage

    const response = await http.post(
      "/polls/token/refresh/",
      {},
      {
        withCredentials: true,
      }
    );

    localStorage.setItem("authToken", response?.data?.access);
    req.headers["Authorization"] = `Bearer ${response?.data.access}`;
    return req;
  }
);


// this Commented for a few Bugs



// export const responseIntercept = axiosPrivate.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const prevRequest = error?.config;
//     if (error?.response?.status === 403 && !prevRequest?.sent) {
//       // const refresh = useRefreshToken();
//       // prevRequest.sent = true;
//       // // const newAccessToken = await refresh();
//       // prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//       return axiosPrivate(prevRequest);
//     }
//     return Promise.reject(error);
//   }
// );
