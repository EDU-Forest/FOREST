import axios, { AxiosRequestConfig } from "axios";
import { useEffect } from "react";

const { NEXT_PUBLIC_SERVER_URL } = process.env;

const AxiosConFigure: AxiosRequestConfig = {
  baseURL: NEXT_PUBLIC_SERVER_URL,
  timeout: 5000,
  // withCredentials: true,
};

const customAxios = axios.create(AxiosConFigure);

customAxios.interceptors.request.use(
  (config) => {
    const forestToken = localStorage.getItem("forest_access_token");
    if (!config.headers.authorization && forestToken) {
      config.headers.authorization = JSON.parse(forestToken);
    }
    return config;
  },
  (error) => error,
);

customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    console.log("error step 1");
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      console.log("error step 2");
      prevRequest.sent = true;
      const newAccessToken = async () => {
        const response = await customAxios.post("/api/auth/reissue");
        console.log("error step 3");
        const { accessToken } = response.data.payload;

        return accessToken;
      };
      const accessToken = await newAccessToken();
      console.log("error step 4");
      prevRequest.headers.authorization = accessToken;
      return customAxios(prevRequest);
    }
    return customAxios;
  },
);

export default customAxios;
