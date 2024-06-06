import { axiosInstance } from "./axiosInstance";
import { getSecureStore } from "@/utils";

const getChatRooms = async () => {
  const accessToken = await getSecureStore("accessToken");
  const { data } = await axiosInstance.get("/room/List", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

// const createChatRoom = async ({ user1, user2 }) => {
//   const accessToken = await getSecureStore("accessToken");
//   const { data } = await axiosInstance.post(
//     `/room/?chatUserUUID1=${user1}&chatUserUUID2=${user2}`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );
//   return data;
// };

const createChatRoom = async ({ user1, user2, item1, item2 }) => {
  const accessToken = await getSecureStore("accessToken");
  const { data } = await axiosInstance.post(
    "/room/",
    {
      chatUserUUID1: user1,
      chatUserUUID2: user2,
      chatUserItem1: item1,
      chatUserItem2: item2,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};

export { getChatRooms, createChatRoom };
