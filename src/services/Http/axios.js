import { URL } from "config/Urls/Urls.config";
import axios from "axios";
export const http = axios.create({
  baseURL: URL.REQ_URL,
});
export const axiosPrivate = axios.create({
  baseURL: URL.REQ_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
