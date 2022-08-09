import axios from "axios";
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from "react";
import AuthContext from "Context/AuthContext/AuthContext.auth";

const useAxios = ()=>{
    const {authToken,setUser,setAuthToken}=useContext(AuthContext)

    const axiosPrivate = axios.create({
  baseURL: URL.REQ_URL,
  headers: { Authorization: `Bearer ${authToken.access}` },
});

axiosPrivate.interceptors.request.use(async (req) => {
//   if (!authToken) {
//     authToken = localStorage.getItem("ACCESS_TOKEN")
//       ? JSON.parse(localStorage.getItem("ACCESS_TOKEN"))
//       : null;
//     req.headers.Authorization = `Bearer ${authToken?.access}`;
//   }
  const user = jwt_decode(authToken.access);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  console.log("isExpired", isExpired);
  if (!isExpired) return req;
  const response = await http.post(
    "/api/token/refresh",
    {
      refresh: authToken.refresh,
    },
    {
      withCredentials: true,
    }
  );
  localStorage.setItem('ACCESS_TOKEN',JSON.stringify(response.data))

  setAuthToken(response.data)
  setUser(jwt_decode(response.data.access))
  req.headers.Authorization = `Bearer ${response?.data.access}`
  return req;
});
}

export default useAxios;