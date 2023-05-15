import axios, { AxiosRequestConfig } from "axios";
import { getLocalStorage, setLocalStorage } from "../localStorage";
import { removeItemLocalStorage } from "../localStorage";

const { NEXT_PUBLIC_SERVER_URL } = process.env;

const AxiosConFigure: AxiosRequestConfig = {
  baseURL: `${NEXT_PUBLIC_SERVER_URL}:9010`,
  timeout: 5000,
  withCredentials: true,
};

const authAxios = axios.create(AxiosConFigure);

authAxios.interceptors.request.use(
  (config) => {
    const forestToken = getLocalStorage("forest_access_token");
    if (!config.headers.Authorization && forestToken) {
      // config.headers.Authorization = `Bearer ${JSON.parse(forestToken)}`;
      config.headers.Authorization = `Bearer ${forestToken}`;
    }

    return config;
  },
  (error) => error,
);

authAxios.interceptors.response.use(
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
      return authAxios(prevRequest);
    } else if (
      (error?.response?.status === 500 && error?.response?.data.slice(0, 11) === "JWT expired") ||
      (error?.response?.status === 401 &&
        error?.response?.data?.error?.message === "Refresh Token이 유효하지 않습니다.")
    ) {
      removeItemLocalStorage("forest_access_token");
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
      return;
    }
    return Promise.reject(error);
  },
);

export default authAxios;
