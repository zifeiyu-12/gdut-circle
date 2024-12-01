import { message } from "antd";
import axios, { AxiosError, AxiosResponse } from "axios";
export const BASE_URL = "http://localhost:3000/api/";
export const WS_URL = "ws://localhost:3000/ws/";
// 创建新的axios实例
export const service = axios.create({
  // 公共接口
  baseURL: BASE_URL,
});
// 添加一个请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] =
      config.headers["Content-Type"] ?? "application/json";
    const token = localStorage.getItem("token") ?? "";
    if (config.url === "/user/login" || config.url === "/user/register") {
      return config;
    }
    if (!token && !token.length) {
      window.location.href = "/login";
      return config;
    }
    config.headers.ACCESS_TOKEN = `${token}`;

    return config;
  },
  (error: AxiosError) => {
    message.error("请求错误");
    return Promise.reject(error);
  }
);

// 添加一个响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    if (!data.success && data.message) {
      message.info(data.message);
    }
    if (data.message == "token过期,请重新登录") {
      window.location.href = "/login";
    }
    return data;
  },
  (error: AxiosError) => {
    const { response } = error;
    // 响应失败，关闭等待提示
    // 提示错误信息
    if (JSON.stringify(error).includes("Network Error")) {
      message.error("网络超时");
    }

    // 根据响应的错误状态码，做不同的处理，此处只是作为示例，请根据实际业务处理
    console.log(response);

    return Promise.reject(error);
  }
);
