import axios, { AxiosRequestConfig } from "axios";

const { NEXT_PUBLIC_SERVER_URL } = process.env;

const AxiosConFigure: AxiosRequestConfig = {
  baseURL: NEXT_PUBLIC_SERVER_URL,
  timeout: 5000,
  // withCredentials: true,
};

const authAxios = axios.create(AxiosConFigure);

export default authAxios;
