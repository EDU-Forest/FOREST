import axios, { AxiosRequestConfig } from "axios";
import { setLocalStorage } from "./localStorage";

const { NEXT_PUBLIC_SERVER_URL } = process.env;

const AxiosConFigure: AxiosRequestConfig = {
  baseURL: `${NEXT_PUBLIC_SERVER_URL}:9012`,
  timeout: 5000,
  // withCredentials: true,
};

const studyAxios = axios.create(AxiosConFigure);

studyAxios.interceptors.request.use(
  (config) => {
    console.log("req", config);
    const forestToken = localStorage.getItem("forest_access_token");
    if (!config.headers.Authorization && forestToken) {
      // config.headers.Authorization = JSON.parse("Bearer " + forestToken);
      config.headers.Authorization = `Bearer ${JSON.parse(forestToken)}`;
    }
    return config;
  },
  (error) => error,
);

studyAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("err", error);
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = async () => {
        const response = await studyAxios.get("/api/auth/reissue");
        console.log(response.data);
        const { accessToken } = response.data.payload;

        return accessToken;
      };
      const accessToken = await newAccessToken();
      setLocalStorage("forest_access_token", accessToken);
      prevRequest.headers.authorization = accessToken;
      return studyAxios(prevRequest);
    }
    return studyAxios;
  },
);

export default studyAxios;
