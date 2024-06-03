import { getSecureStore } from "@/utils/secureStore";
import { axiosInstance } from "./axiosInstance";

const getUserItems = async () => {
  const accessToken = await getSecureStore("accessToken");
  const { data } = await axiosInstance.get("items/member", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

const getItems = async () => {
  const accessToken = await getSecureStore("accessToken");
  const { data } = await axiosInstance.get("items/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export { getUserItems, getItems };
