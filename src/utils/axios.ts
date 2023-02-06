import axios, { AxiosError } from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsQueue: any = [];

export const api = axios.create({
  baseURL: "http://localhost:5000",
});

if (cookies) {
  api.defaults.headers["Authorization"] = `Bearer ${cookies.user_token}`;
}

api.interceptors.response.use(
  (res) => res, // if response ok, return and proced
  (erro: any) => {
    if (erro.response?.status === 401) {
      if (erro.response.data?.code === "token.expired") {
        // refresh token
        cookies = parseCookies();

        const { user_refreshToken: refreshToken } = cookies;
        const originalConfig = erro.config;

        // call refresh once independent how many request have been sended
        if (!isRefreshing) {
          isRefreshing = true;

          api
            .post("/refreshToken")
            .then((res) => {
              const data = res.data;

              setCookie(undefined, "user_token", data.token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: "/",
              });

              setCookie(undefined, "user_refreshToken", data.refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
              });

              api.defaults.headers["Authorization"] = `Bearer ${data.token}`;

              failedRequestsQueue.forEach((req: any) =>
                req.onSuccess(data.token)
              );
              failedRequestsQueue = [];
            })
            .catch((erro) => {
              failedRequestsQueue.forEach((req: any) => req.onFailure(erro));
              failedRequestsQueue = [];
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers["Authorization"] = `Bearer ${token}`;

              resolve(api(originalConfig));
            },
            onFailure: (error: AxiosError) => {
              reject(error);
            },
          });
        });
      } else {
        // logout user
        destroyCookie(undefined, "user_token");
        destroyCookie(undefined, "user_refreshToken");
      }
    }

    return Promise.reject(erro);
  }
);
