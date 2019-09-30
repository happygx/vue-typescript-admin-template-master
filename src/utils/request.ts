import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import requestConfig from "@/config/requestConfig";
// import {
//   showFullScreenLoading,
//   tryHideFullScreenLoading
// } from "./axiosHelperLoading";

// 公共参数
const conmomPrams: object = {};

class HttpRequest {
  public queue: any; // 请求的url集合
  public constructor() {
    this.queue = {};
  }
  destroy(url: string) {
    delete this.queue[url];
    // 关闭全局的loading...
    if (!Object.keys(this.queue).length) {
      // tryHideFullScreenLoading();
    }
  }
  interceptors(instance: any, url?: string) {
    // 请求拦截
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 在请求前统一添加headers信息
        config.headers = {};

        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // showFullScreenLoading();
        }
        if (url) {
          this.queue[url] = true;
        }
        return config;
      },
      (error: any) => {
        console.error(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        if (url) {
          this.destroy(url);
        }
        const { data, status } = res;
        // 请求成功
        if (status === 200 && data) {
          return data;
        }
        return requestFail(res);
      },
      // 失败回调
      (error: any) => {
        if (url) {
          this.destroy(url);
        }
        console.error(error);
      }
    );
  }
  async request(options: AxiosRequestConfig) {
    const instance = axios.create();
    await this.interceptors(instance, options.url);
    return instance(options);
  }
}

// 请求失败
const requestFail = (res: AxiosResponse) => {
  let errCode = 408;
  let errStr = "网络繁忙！";

  return {
    err: console.error({
      code: res.data.code || errCode,
      msg: res.data.message || errStr
    })
  };
};

// 合并axios参数
const conbineOptions = (opts: any): AxiosRequestConfig => {
  const _data = { ...conmomPrams, ...opts.data };
  const options = {
    method: opts.method || "GET",
    url: opts.url,
    headers: opts.headers
    // baseURL: process.env.VUE_APP_BASE_API,
    // timeout: 5000
  };
  return options.method !== "GET"
    ? Object.assign(options, { data: _data })
    : Object.assign(options, { params: _data });
};

const HTTP = new HttpRequest();

/**
 * 抛出整个项目的api方法
 */
const Api = (() => {
  const apiObj: any = {};
  const requestList: any = requestConfig;
  const fun = (opts: AxiosRequestConfig) => {
    return async (params: any = {}) => {
      Object.assign(opts, params);
      const newOpts = conbineOptions(opts);
      const res = await HTTP.request(newOpts);
      return res;
    };
  };
  Object.keys(requestConfig).forEach(key => {
    let opts = {
      url: requestList[key]
    };
    apiObj[key] = fun(opts);
  });
  return apiObj;
})();

export default Api as any;
