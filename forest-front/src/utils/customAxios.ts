import axios, { AxiosRequestConfig } from "axios";

const { NEXT_PUBLIC_BASE_URL } = process.env;

const AxiosConFigure: AxiosRequestConfig = {
  baseURL: NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  withCredentials: true,
};

const customAxios = axios.create(AxiosConFigure);
const forestToken = localStorage.getItem("forest_access_token");

customAxios.interceptors.request.use(
  (config) => {
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
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = async () => {
        const response = await customAxios.post("/api/auth/reissue");
        const { accessToken } = response.data.payload;

        return accessToken;
      };
      const accessToken = await newAccessToken();
      prevRequest.headers.authorization = accessToken;
      return customAxios(prevRequest);
    }
    return customAxios;
  },
);

export default customAxios;
