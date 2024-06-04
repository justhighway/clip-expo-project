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

const postItem = async (formData) => {
  const accessToken = await getSecureStore("accessToken");
  const response = await axiosInstance.post("items/form-data", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export { getUserItems, getItems, postItem };
