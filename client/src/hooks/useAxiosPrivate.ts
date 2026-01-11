import api from "../api/axios";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

export const useAxiosPrivate = () => {
  const navigate = useNavigate();
  const { authData, refreshAccessToken, logoutUser } = useAuth();

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

          try {
            const newToken = await refreshAccessToken();
            originalRequest.headers.authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch {
            logoutUser();
            navigate("/login", {
              state: { message: "Session expired. Please log in again." },
            });
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
  }, [authData]);

  return api;
};
