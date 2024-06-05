// app/(tabs)/(ahome)/_layout.js:
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="BoxModal" />
      <Stack.Screen name="AlertModal" options={{ presentation: "modal" }} />
      <Stack.Screen
        name="ItemDetailModal"
        options={{
          presentation: "modal",
          headerTitle: "물건 정보",
        }}
      />
    </Stack>
  );
}
