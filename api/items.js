// api/items.js
import { axiosInstance } from "./axiosInstance";
import { getSecureStore } from "@/utils";

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

const getUserItems = async () => {
  const accessToken = await getSecureStore("accessToken");
  const { data } = await axiosInstance.get("items/member", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

const getCustomizedItems = async (itemSeq) => {
  const accessToken = await getSecureStore("accessToken");
  const { data } = await axiosInstance.get(
    `/items/customized-items/${itemSeq}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const items = data.result.data.itemDTOList;
  if (Array.isArray(items)) {
    const formattedItems = items.map((item) => ({
      ...item,
      itemPictures: Array.isArray(item.itemPictures)
        ? item.itemPictures
        : [item.itemPictures],
    }));
    return formattedItems;
  } else {
    console.error("Fetched Data is not array", items);
    return [];
  }
};

const postLikeAction = async (itemSeq1, itemSeq2, user1, user2) => {
  const accessToken = await getSecureStore("accessToken");
  const { data } = await axiosInstance.post(
    `/items/likeAction`,
    {
      likeSenderUUID: user1,
      likeReceiverUUID: user2,
      likeSenderItemSeq: itemSeq1,
      likeReceiverItemSeq: itemSeq2,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};

export { getUserItems, postItem, getCustomizedItems, postLikeAction };
