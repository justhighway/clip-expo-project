import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { getSecureStore } from "@/utils";

export default function Index() {
  const [isSignIn, setIsSignIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSignInStatus = async () => {
      const refreshToken = await getSecureStore("refreshToken");
      setIsSignIn(!!refreshToken);
      setLoading(false);
    };

    checkSignInStatus();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <Redirect href={isSignIn ? "(tabs)" : "(auth)"} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
