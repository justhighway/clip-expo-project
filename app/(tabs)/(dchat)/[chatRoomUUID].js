import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function ChatRoom() {
  const { chatRoomUUID } = useLocalSearchParams();
  return (
    <View>
      <Text>{chatRoomUUID}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
