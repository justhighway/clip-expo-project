import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://15.165.40.73:8080/ws");

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.current.onmessage = (e) => {
      console.log("Message received from server:", e.data);
      const newMessage = JSON.parse(e.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...newMessage, type: "received" },
      ]);
    };

    ws.current.onerror = (e) => {
      console.error("WebSocket error:", e.message);
    };

    ws.current.onclose = (e) => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws.current.readyState === WebSocket.OPEN) {
      const message = {
        text: input,
        timestamp: new Date().toISOString(),
        type: "sent",
      };
      ws.current.send(JSON.stringify(message));
      setMessages((prevMessages) => [...prevMessages, message]);
      setInput("");
    } else {
      console.error("WebSocket is not open");
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.type === "sent"
                ? styles.sentMessage
                : styles.receivedMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>
              {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        )}
      />
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Type a message"
        style={styles.input}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#dcf8c6",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 10,
    color: "#aaa",
    textAlign: "right",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default ChatRoom;
