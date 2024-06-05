import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useLocalSearchParams } from "expo-router";

export default function ChatRoom() {
  const { chatRoomUUID } = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://3.36.110.119/ws");
    const client = Stomp.over(socket);

    client.connect(
      {},
      () => {
        client.subscribe(`/topic/chat/room/${chatRoomUUID}`, (msg) => {
          const newMessage = JSON.parse(msg.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      },
      (error) => {
        console.error("STOMP connection error", error);
      }
    );

    setStompClient(client);

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, [chatRoomUUID]);

  const sendMessage = () => {
    if (stompClient && stompClient.connected && message.trim()) {
      stompClient.send(
        "/app/chat/send",
        {},
        JSON.stringify({ chatRoomUUID, message })
      );
      setMessage("");
    } else {
      console.error("STOMP client is not connected");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.message}</Text>}
      />
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="메시지를 입력하세요"
      />
      <Button title="전송" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: "gray", padding: 10, marginBottom: 10 },
});
