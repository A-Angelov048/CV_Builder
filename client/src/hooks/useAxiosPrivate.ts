import api from "../api/axios";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import type { AxiosError } from "axios";

export const useAxiosPrivate = () => {
  const { authData, refreshAccessToken } = useAuth();

  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use((config) => {
      if (!config.headers?.authorization) {
        const token = authData.accessToken;

        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
      }

      return config;
    });

    const resInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 403 &&
          originalRequest &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          const { newToken, isError } = await refreshAccessToken();

          if (!isError) {
            originalRequest.headers.authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          } else {
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
  }, [authData]);

  return api;
};
