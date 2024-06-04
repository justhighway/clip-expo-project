import { Stack } from "expo-router";

export default function CommunityLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Chat List" }} />
      <Stack.Screen name="Boards" options={{ title: "Chat List" }} />
      <Stack.Screen name="Detail" options={{ title: "Chat List" }} />
    </Stack>
  );
}
