import { useState, useCallback } from "react";
import { createChatRoom, postLikeAction } from "@/api";
import { useRouter } from "expo-router";

const useCardSwiper = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const likeAction = useCallback(
    async (user1, user2, item1, item2) => {
      setLoading(true);

      try {
        const response = await postLikeAction(user1, user2, item1, item2);
        const result = response.result.data;
        console.log("postLikeAction request => ", user1, user2, item1, item2);
        console.log("postLikeAction response => ", response);

        switch (result) {
          case "match":
            const chatRoomResponse = await createChatRoom(
              { user1, user2, item1, item2 } // Fixed the way parameters are passed
            );
            const roomUUID = chatRoomResponse.result.data.chatRoomUUID;
            console.log(
              "createChatRoom request => ",
              user1,
              user2,
              item1,
              item2
            );
            console.log("roomUUID => ", roomUUID);

            router.push({
              pathname: "/(dchat)/[chatRoomUUID]",
              params: { chatRoomUUID: roomUUID },
            });

            return chatRoomResponse;
          case "success":
            console.log("좋아요 성공");
            return true;
          case "fail":
            console.error("좋아요 실패");
            return false;
          default:
            console.error("알 수 없는 결과:", result);
            return false;
        }
      } catch (error) {
        console.error("API 호출 실패:", error);
        setError(error);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const dislikeAction = useCallback(async () => {
    console.log("싫어요 액션");
    // 싫어요에 대한 추가 처리 로직을 여기에 추가할 수 있습니다.
  }, []);

  const passAction = useCallback(async () => {
    console.log("패스 액션");
    // 패스에 대한 추가 처리 로직을 여기에 추가할 수 있습니다.
  }, []);

  return {
    likeAction,
    dislikeAction,
    passAction,
    loading,
    error,
  };
};

export { useCardSwiper };
