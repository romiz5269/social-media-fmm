import { URL } from "config/Urls/Urls.config";
import axios from "axios";
export const http = axios.create({
  baseURL: URL.REQ_URL,
});
