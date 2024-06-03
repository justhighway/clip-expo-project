import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, headerTitle: "" }}
      />
      <Stack.Screen name="SignIn" options={{ headerShown: false }} />
      <Stack.Screen
        name="SignUp"
        options={{ headerTransparent: true, headerTitle: "" }}
      />
    </Stack>
  );
}
