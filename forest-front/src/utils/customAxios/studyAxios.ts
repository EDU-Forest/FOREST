import axios, { AxiosRequestConfig } from "axios";
import { getLocalStorage, setLocalStorage } from "../localStorage";
import authAxios from "./authAxios";

const { NEXT_PUBLIC_SERVER_URL } = process.env;

const AxiosConFigure: AxiosRequestConfig = {
  baseURL: `${NEXT_PUBLIC_SERVER_URL}`,
  timeout: 5000,
  withCredentials: true,
};

const studyAxios = axios.create(AxiosConFigure);

studyAxios.interceptors.request.use(
  (config) => {
    const forestToken = getLocalStorage("forest_access_token");
    if (!config.headers.Authorization && forestToken) {
      config.headers.Authorization = `Bearer ${forestToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

studyAxios.interceptors.response.use(
  (response) => {
    return response;
  },
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
      return studyAxios(prevRequest);
    }
    return studyAxios;
  },
);

export default studyAxios;
