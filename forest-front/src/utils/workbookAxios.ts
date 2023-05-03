import axios, { AxiosRequestConfig } from "axios";
import { setLocalStorage } from "./localStorage";
import authAxios from "./authAxios";

const { NEXT_PUBLIC_SERVER_URL } = process.env;

const AxiosConFigure: AxiosRequestConfig = {
  baseURL: `${NEXT_PUBLIC_SERVER_URL}:9011`,
  timeout: 5000,
  // withCredentials: true,
};

const workbookAxios = axios.create(AxiosConFigure);

workbookAxios.interceptors.request.use(
  (config) => {
    const forestToken = localStorage.getItem("forest_access_token");
    if (!config.headers.Authorization && forestToken) {
      // config.headers.Authorization = JSON.parse("Bearer " + forestToken);
      config.headers.Authorization = `Bearer ${JSON.parse(forestToken)}`;
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
        console.log(response.data);
        const { accessToken } = response.data.payload;

        return accessToken;
      };
      const accessToken = await newAccessToken();
      setLocalStorage("forest_access_token", accessToken);
      prevRequest.headers.authorization = accessToken;
      return workbookAxios(prevRequest);
    }
    return workbookAxios;
  },
);

export default workbookAxios;
