import Api from "@/utils/request";

export const getKtUploadYxsj = (params = {}) => {
  return Api.getKtUploadYxsj(params);
};

export const getSbUploadYxsj = (params = {}) => {
  return Api.getSbUploadYxsj(params);
};

export const getKtUploadDnsd = (params = {}) => {
  return Api.getKtUploadDnsd(params);
};

export const getSbUploadDnsd = (params = {}) => {
  return Api.getSbUploadDnsd(params);
};

export const getKtUploadGzxx = (params = {}) => {
  return Api.getKtUploadGzxx(params);
};

export const unusualUploadData = (params = {}) => {
  return Api.unusualUploadData(params);
};

export const getBuildingSystem = (params = {}) => {
  return Api.getBuildingSystem(params);
};

export const getDeviceStatus = (params = {}) => {
  return Api.getDeviceStatus(params);
};

export const dynamicRegister = (params = {}) => {
  return Api.dynamicRegister(params);
};

export const iotLink = (params = {}) => {
  return Api.iotLink(params);
};

export const iotBreak = (params = {}) => {
  return Api.iotBreak(params);
};

export const configParam = (params = {}) => {
  return Api.configParam(params);
};

export const iotDeviceRegister = (params = {}) => {
  return Api.iotDeviceRegister(params);
};
