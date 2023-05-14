import axios, { AxiosRequestConfig } from "axios";
import { getLocalStorage, setLocalStorage } from "../localStorage";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setLogout } from "@/stores/user/user";

const { NEXT_PUBLIC_SERVER_URL } = process.env;

function failedAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  dispatch(setLogout());
  router.push("/");
}

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
    // const router = useRouter();
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = async () => {
        const response = await authAxios.get("/api/auth/reissue");
        const { token } = response.data.data;

        return token;
      };
      const accessToken = await newAccessToken();
      if (!accessToken) {
        failedAuth();
        return;
      }
      setLocalStorage("forest_access_token", accessToken);
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      return authAxios(prevRequest);
    }
    return Promise.reject(error);
  },
);

export default authAxios;
