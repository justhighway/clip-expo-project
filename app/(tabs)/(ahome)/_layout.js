import { AntDesign } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="BoxModal"
        options={{
          presentation: "modal",
          headerShown: true,
        }}
      />
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
