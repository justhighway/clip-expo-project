// app/(tabs)/(home)/index.js:
import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Entypo, Octicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import CardSwiper from "@/components/CardSwiper";

export default function Home() {
  const headerHeight = useHeaderHeight();
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ padding: 15 }}
                onPress={() => router.push("/BoxModal")}
              >
                <Entypo name="box" size={26} color={"gray"} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 15 }}
                onPress={() => router.push("/AlertModal")}
              >
                <Octicons name="bell-fill" size={26} color={"gray"} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <CardSwiper />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
