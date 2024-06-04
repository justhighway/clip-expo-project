import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("ws://15.165.40.73:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/messages", (msg) => {
        const newMessage = JSON.parse(msg.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });

    setClient(stompClient);

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (client && message.trim()) {
      const msg = { content: message, sender: "User" };
      client.send("/app/chat", {}, JSON.stringify(msg));
      setMessage("");
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text>
            {item.sender}: {item.content}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
        style={{ borderWidth: 1, padding: 8, marginVertical: 16 }}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}
