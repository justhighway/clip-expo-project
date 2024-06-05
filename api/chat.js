import { getSecureStore } from "@/utils/secureStore";
import { axiosInstance } from "./axiosInstance";

const getChatRooms = async () => {
  const accessToken = await getSecureStore("accessToken");
  const { data } = await axiosInstance.get("/room/List", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

const createChatRoom = async ({ user1, user2 }) => {
  const accessToken = await getSecureStore("accessToken");
  const { data } = await axiosInstance.post(
    `/room/?chatUserUUID1=${user1}&chatUserUUID2=${user2}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};

export { getChatRooms, createChatRoom };
