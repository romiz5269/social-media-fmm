import axios from "axios";
import { URL } from "config/Urls/Urls.config";
import { http } from "services/Http/axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import LogoutUser from "utils/LogoutFunc/Logout.Func";

const callApi = () => {
  const axiosPrivate = axios.create({
    baseURL: URL.REQ_URL,
    withCredentials: true,
  });

  axiosPrivate.interceptors.request.use(async (req) => {
    // set authToken from localStorage

    let authToken = localStorage.getItem("authToken")
      ? localStorage.getItem("authToken")
      : null;

    console.log("request intercepter ran");

    //set authToken as authorization header in req structure

    req.headers["Authorization"] = `Bearer ${authToken}`;

    // set expiration lifeCycle
    if (authToken === null || authToken === undefined) return req;

    return req;
  });

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;

      if (error?.response?.status === 401) {
        if (error?.response?.data?.code === "user_not_found") {
          localStorage.removeItem("authToken");
        } else {
          const response = await http
            .post(
              "/account/api/token/refresh",
              {},
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              localStorage.setItem("authToken", res?.data?.access);
            })
            .catch((err) => {
              if (err?.response?.status === 401) {
                localStorage.removeItem("authToken");
              }
            });
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosPrivate;
};

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
    if (authToken === null || authToken === undefined) return req;
    // const user = jwt_decode(authToken);

    // const nowTimestamp = dayjs().unix();
    // const isExpired = nowTimestamp > user.exp;
    // console.log(isExpired)
    // if (!isExpired) return req;

    //fetch new Access Token and set as req header and save in localStorage

    return req;
  }
);

// this Commented for a few Bugs

export const responseIntercept = axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;

    if (error?.response?.status === 401) {
      if (error?.response?.data?.code === "user_not_found") {
        localStorage.removeItem("authToken");
      } else {
       
        const response = await http
          .post(
            "/account/api/token/refresh",
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            localStorage.setItem("authToken", res?.data?.access);
          })
          .catch((err) => {
            if (err?.response?.status === 401) {
              localStorage.removeItem("authToken");
            }
          });
      }
    }

    return Promise.reject(error);
  }
);
