import { Stack } from "expo-router";

export default function ChatLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "채팅",
          headerTitleAlign: "left",
        }}
      />
      <Stack.Screen
        name="[chatRoomUUID]"
        options={{
          presentation: "card",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            color: "blue",
          },
        }}
      />
    </Stack>
  );
}
