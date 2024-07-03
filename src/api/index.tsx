import axios, {
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import React, {useMemo} from 'react';
import {store} from './store';
import {setLoaderStart} from './actions';

export const instance = axios.create({
  baseURL: 'https://randomuser.me',
  timeout: 60000,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    AccessControlAllowMethods: 'GET, POST, PUT, DELETE, OPTIONS',
    'Cache-Control': 'no-cache',
    'X-Requested-With': 'XMLHttpRequest', // IMPORTANT!!
  },
  withCredentials: false,
});

instance.interceptors.request.use(
  (
    reqConfig: InternalAxiosRequestConfig<any>,
  ): InternalAxiosRequestConfig<any> => {
    const token = store.getState().auth.token;
    if (token) {
      reqConfig.headers = {
        ...(reqConfig.headers as AxiosHeaders),
        Authorization: `Bearer ${token}`,
      };
    }
    return reqConfig;
  },
  (error: any) => Promise.reject(error),
);

const Interceptor = ({children}: {children: React.ReactNode}) => {
  useMemo(() => {
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        setLoaderStart();
        return response;
      },
      (err: any) => Promise.reject(err),
    );
  }, []);
  return children;
};

export default Interceptor;
