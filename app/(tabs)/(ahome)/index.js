// app/(tabs)/(ahome)/index.js:
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { Entypo, Octicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { CardSwiper } from "@/components";
import { colors } from "@/constants";

export default function Home() {
  const headerHeight = useHeaderHeight();
  const router = useRouter();
  const { item } = useLocalSearchParams();
  const parsedItem = item ? JSON.parse(item) : null;

  useFocusEffect(
    useCallback(() => {
      if (parsedItem) {
        console.log(
          "Selected item:",
          parsedItem.itemSeq,
          parsedItem.itemUpLoaderUuid
        );
      }
    }, [parsedItem])
  );

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
        {item ? (
          <CardSwiper
            itemSeq={parsedItem.itemSeq}
            itemUploaderUuid={parsedItem.itemUpLoaderUuid}
          />
        ) : (
          <Text>상품을 선택해주세요</Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
