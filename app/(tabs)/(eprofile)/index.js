import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { getSecureStore, removeSecureStore } from "@/utils/secureStore";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await removeSecureStore("accessToken");
    await removeSecureStore("refreshToken");
    router.replace("(auth)");
  };

  const getToken = async () => {
    try {
      const result = await getSecureStore("accessToken");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="로그아웃" onPress={handleLogout} />
      <Button title="액세스 토큰 확인" onPress={getToken} />
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
