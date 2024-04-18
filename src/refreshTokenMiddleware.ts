import axios, { AxiosRequestConfig, AxiosResponse, AxiosInterceptorManager } from "axios";

export const refreshTokenMiddleware = (axiosInstance: axios.AxiosInstance) => {
  const refreshTokenInterceptor = axios.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        (config.headers as any).Authorization = `Bearer ${refreshToken}`;
      }
      return config;
    },
    undefined,
    // this ensures interceptor is run before others
    { 
      runWhen: (config) => !!config.headers?.["x-refresh-token"], 
      forceRun: true 
    }
  );

  const refreshTokenResponseInterceptor = axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const { response, config } = error;
      if (
        response &&
        response.status === 401 &&
        config.headers?.["x-refresh-token"]
      ) {
        const refresh_token = localStorage.getItem("refresh_token");
        if (refresh_token) {
          const { data } = await axios.post(
            `${import.meta.env.VITE_APP_BASE_URL}/api/users/refresh-token`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                "x-refresh-token": refresh_token,
              },
            }
          );
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          delete config.headers["x-refresh-token"];
          const newConfig = {
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${data.access_token}`,
            },
          };
          return axiosInstance(newConfig);
        }
      }
      return Promise.reject(error);
    }
  );

  return () => {
    axios.interceptors.request.eject(refreshTokenInterceptor);
    axios.interceptors.response.eject(refreshTokenResponseInterceptor);
  };
};



