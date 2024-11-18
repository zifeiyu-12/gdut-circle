import { Response } from "../types/common";
import { service } from "./http";
import request from "./request";
import { AxiosRequestConfig } from "axios";

/**
 * @description: 封装get请求方法
 * @param {string} url url 请求地址
 * @param {string | object} params 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
const get = <T>(
  url: string,
  params?: string | object,
  config?: AxiosRequestConfig
): Promise<Response<T>> => {
  config = {
    method: "get", // `method` 是创建请求时使用的方法
    url, // `url` 是用于请求的服务器 URL
    ...config,
  };
  if (params) {
    config.params = params;
  }
  return service(config);
};

/**
 * @description: 封装post请求方法
 * @param {string} url url 请求地址
 * @param {string | object} data 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
const post = <T>(
  url: string,
  data?: string | object,
  config?: AxiosRequestConfig
): Promise<Response<T>> => {
  config = {
    method: "post",
    url,
    ...config,
  };
  if (data) {
    config.data = data;
  }
  return service(config);
};

/**
 * @description: 封装patch请求方法
 * @param {string} url url 请求地址
 * @param {string | object} data 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
const patch = <T>(
  url: string,
  data?: string | object,
  config?: AxiosRequestConfig
): Promise<Response<T>> => {
  config = {
    method: "patch",
    url,
    ...config,
  };
  if (data) {
    config.data = data;
  }
  return service(config);
};

/**
 * @description: 封装delete请求方法
 * @param {string} url url 请求地址
 * @param {string | object} params 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
const remove = <T>(
  url: string,
  params?: string | object,
  config?: AxiosRequestConfig
): Promise<Response<T>> => {
  config = {
    method: "delete",
    url,
    ...config,
  };
  if (params) {
    config.params = params;
  }
  return service(config);
};

// 包裹请求方法的容器,使用 http 统一调用
const http = {
  get,
  post,
  patch,
  remove,
};

export default http;
