import { axiosInstance } from "./axiosInstance";
import { getSecureStore } from "@/utils";

const postSignUp = async ({ username, password }) => {
  const { data } = await axiosInstance.post("/members/sign-up", {
    username,
    password,
  });
  return data;
};

const postSignIn = async ({ username, password }) => {
  const { data } = await axiosInstance.post("/members/sign-in", {
    username,
    password,
  });
  return data;
};

const getProfile = async () => {
  const accessToken = await getSecureStore("accessToken");
  const { data } = await axiosInstance.get("/members", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

// Todo: Secure Store에 저장된 Refresh Token을 불러와서 Header로 넣어주는
// Todo: getAccessToken API 구현해야함

export { postSignIn, postSignUp, getProfile };
