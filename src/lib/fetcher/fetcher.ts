import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { getSession } from 'next-auth/react';

export const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
});

export const fetcher = async (config: AxiosRequestConfig) => {
  const data = await getSession();
  const axiosConfig: AxiosRequestConfig = {
    ...config,
    headers: { 'x-access-token': data?.token },
  };
  const response = await axiosInstance(axiosConfig).then((res) => res.data);
  return response;
};
