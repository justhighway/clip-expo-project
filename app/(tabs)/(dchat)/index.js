// app/(tabs)/(dchat)/index.js
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { getChatRooms } from "@/api/chat";
import { useRouter } from "expo-router";

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const router = useRouter();

  const fetchChatRooms = useCallback(async () => {
    try {
      const response = await getChatRooms();
      console.log("fetchChatRooms => ", response.result.data.chatRoomDTOList); // API 응답을 출력하여 데이터 구조를 확인합니다.
      if (response.result.data.chatRoomDTOList) {
        setChatRooms(response.result.data.chatRoomDTOList);
      } else {
        setChatRooms([]);
      }
    } catch (error) {
      console.error(error);
      setChatRooms([]);
    }
  }, []);

  useEffect(() => {
    fetchChatRooms();
  }, [fetchChatRooms]);

  const renderItem = async ({ item }) => {
    const currentUserEmail = await getUserEmail();
    const otherUserEmail =
      item.chatUserUUID1 === currentUserEmail
        ? item.chatUserUUID2
        : item.chatUserUUID1;

    return (
      <TouchableOpacity
        onPress={() => router.push(`/dchat/${item.chatRoomUUID}`)}
      >
        <View>
          <Text>{otherUserEmail}</Text>
          <Text>Item 1: {item.chatUserItem1}</Text>
          <Text>Item 2: {item.chatUserItem2}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={chatRooms}
        renderItem={renderItem}
        keyExtractor={(item) => item.chatRoomUUID}
      />
    </View>
  );
};

export default ChatRoomList;
