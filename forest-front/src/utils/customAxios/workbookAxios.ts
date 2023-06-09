import axios, { AxiosRequestConfig } from "axios";
import authAxios from "./authAxios";
import { getLocalStorage, setLocalStorage } from "../localStorage";

const { NEXT_PUBLIC_SERVER_URL } = process.env;

const AxiosConFigure: AxiosRequestConfig = {
  baseURL: `${NEXT_PUBLIC_SERVER_URL}`,
  timeout: 5000,
  withCredentials: true,
};

const workbookAxios = axios.create(AxiosConFigure);

workbookAxios.interceptors.request.use(
  (config) => {
    const forestToken = getLocalStorage("forest_access_token");
    if (!config.headers.Authorization && forestToken) {
      config.headers.Authorization = `Bearer ${forestToken}`;
    }

    return config;
  },
  (error) => error,
);

workbookAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = async () => {
        const response = await authAxios.get("/api/auth/reissue");
        const { token } = response.data.data;
        return token;
      };
      const accessToken = await newAccessToken();
      setLocalStorage("forest_access_token", accessToken);
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      return workbookAxios(prevRequest);
    }
    return workbookAxios;
  },
);

export default workbookAxios;
