import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://3.36.110.119:8080",
  withCredentials: true,
});

export { axiosInstance };
