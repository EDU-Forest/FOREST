import axios, { AxiosRequestConfig } from "axios";

const { NEXT_PUBLIC_SERVER_URL } = process.env;

const AxiosConFigure: AxiosRequestConfig = {
  baseURL: `${NEXT_PUBLIC_SERVER_URL}:9010`,
  timeout: 5000,
  // withCredentials: true,
};

const authAxios = axios.create(AxiosConFigure);

authAxios.interceptors.request.use(
  (config) => {
    const forestToken = localStorage.getItem("forest_access_token");
    if (!config.headers.Authorization && forestToken) {
      config.headers.Authorization = `Bearer ${JSON.parse(forestToken)}`;
    }
    return config;
  },
  (error) => error,
);

authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = async () => {
        const response = await authAxios.get("/api/auth/reissue");
        const { accessToken } = response.data.payload;

        return accessToken;
      };
      const accessToken = await newAccessToken();
      prevRequest.headers.authorization = accessToken;
      return authAxios(prevRequest);
    }
    return Promise.reject(error);
  },
);

export default authAxios;