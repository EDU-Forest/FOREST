import axios, { AxiosRequestConfig } from "axios";

const { NEXT_PUBLIC_SERVER_URL } = process.env;

const AxiosConFigure: AxiosRequestConfig = {
  baseURL: `${NEXT_PUBLIC_SERVER_URL}:9012`,
  timeout: 5000,
  // withCredentials: true,
};

const studyAxios = axios.create(AxiosConFigure);

studyAxios.interceptors.request.use(
  (config) => {
    const forestToken = localStorage.getItem("forest_access_token");
    if (!config.headers.Authorization && forestToken) {
      // config.headers.Authorization = JSON.parse("Bearer " + forestToken);
      config.headers.Authorization = `Bearer ${JSON.parse(forestToken)}`;
    }
    console.log("config", config, "forestToken", forestToken);
    return config;
  },
  (error) => error,
);

studyAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("interceptor error", error);
    const prevRequest = error?.config;
    console.log("error step 1");
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      console.log("error step 2");
      prevRequest.sent = true;
      const newAccessToken = async () => {
        const response = await studyAxios.post("/api/auth/reissue");
        console.log("error step 3");
        const { accessToken } = response.data.payload;

        return accessToken;
      };
      const accessToken = await newAccessToken();
      console.log("error step 4");
      prevRequest.headers.authorization = accessToken;
      return studyAxios(prevRequest);
    }
    return studyAxios;
  },
);

export default studyAxios;
