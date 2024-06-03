import { Stack } from "expo-router";

export default function CommunityLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Chat List" }} />
      <Stack.Screen name="post" options={{ title: "Chat List" }} />
      <Stack.Screen name="postDetail" options={{ title: "Chat List" }} />
    </Stack>
  );
}
