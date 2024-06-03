import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { getItems, getUserItems } from "@/api/items";

export default function Community() {
  const userItems = async () => {
    try {
      const result = await getUserItems();
      console.log("result", result);
    } catch (error) {
      console.log(error);
    }
  };

  const allItems = async () => {
    try {
      const result = await getItems();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="button" onPress={userItems} />
      <Button title="button" onPress={allItems} />
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
