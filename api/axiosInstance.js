import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://15.165.40.73:8080",
  withCredentials: true,
});

export { axiosInstance };
