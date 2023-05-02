import axios, { AxiosRequestConfig } from "axios";

const { NEXT_PUBLIC_SERVER_URL } = process.env;

const AxiosConFigure: AxiosRequestConfig = {
  baseURL: `${NEXT_PUBLIC_SERVER_URL}:9010`,
  timeout: 5000,
  // withCredentials: true,
};

const beforeAuthAxios = axios.create(AxiosConFigure);

export default beforeAuthAxios;
