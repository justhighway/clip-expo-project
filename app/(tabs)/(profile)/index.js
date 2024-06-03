import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { removeSecureStore } from "@/utils/secureStore";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await removeSecureStore("accessToken");
    await removeSecureStore("refreshToken");
    router.replace("(auth)");
  };

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button title="로그아웃" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
