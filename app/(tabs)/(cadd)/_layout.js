import { Stack } from "expo-router";

export default function AddLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "물건 업로드" }} />
    </Stack>
  );
}
