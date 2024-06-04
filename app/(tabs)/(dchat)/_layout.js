import { Stack } from "expo-router";

export default function ChatLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="room" options={{ presentation: "card" }} />
    </Stack>
  );
}
