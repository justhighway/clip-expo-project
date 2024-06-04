import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const notifications = [
  { id: "1", message: "John님이 Jane님의 물건을 좋아했습니다!" },
  { id: "2", message: "Jane님의 물건과 매칭되었습니다!" },
  // 여기에 더 많은 알림 데이터를 추가할 수 있습니다.
];

export default function AlertModal() {
  const router = useRouter();

  const handleConfirmSelection = () => {
    router.back(); // Close the modal
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.message}</Text>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "알림창",
          headerRight: () =>
            Platform.OS == "ios" && (
              <TouchableOpacity onPress={handleConfirmSelection}>
                <Ionicons name="close" size={28} />
              </TouchableOpacity>
            ),
        }}
      />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
  },
  buttonContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});
