import { axiosInstance } from "@/api/axiosInstance";

const setHeader = (key, value) => {
  axiosInstance.defaults.headers.common[key] = value;
};

const removeHeader = (key) => {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }
  delete axiosInstance.defaults.headers.common[key];
};

export { setHeader, removeHeader };
