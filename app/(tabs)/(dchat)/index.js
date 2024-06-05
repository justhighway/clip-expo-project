import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { createChatRoom, getChatRooms } from "@/api/chat";
import { colors } from "@/constants/colors";

export default function ChatListScreen() {
  const [chatRooms, setChatRooms] = useState([]);
  const router = useRouter();

  const handleCreateChatRoom = async () => {
    try {
      const chatRoom = await createChatRoom({
        user1: "jaehyeon@gmail.com",
        user2: "jimin@gmail.com",
      });
      console.log("handleCreateChatRoom => ", chatRoom);
      // 새로운 채팅방 생성 후 목록을 다시 불러옵니다.
      fetchChatRooms();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create chat room");
    }
  };

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

  return (
    <View style={styles.container}>
      <Button title="채팅방 생성" onPress={handleCreateChatRoom} />
      {chatRooms.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>아직 채팅방이 없네요!</Text>
          <Text style={styles.emptyText}>물물교환 매칭을 하러가볼까요?</Text>
        </View>
      ) : (
        <FlatList
          data={chatRooms}
          keyExtractor={(item) => item.chatRoomUUID}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.chatRoomContainer}
              onPress={() => router.push(`room/${item.chatRoomUUID}`)}
            >
              <Text style={styles.chatRoomText}>
                {item.chatUserUUID1} & {item.chatUserUUID2}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.WHITE,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginVertical: 5,
  },
  chatRoomContainer: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  chatRoomText: {
    fontSize: 16,
    color: "#333",
  },
});
