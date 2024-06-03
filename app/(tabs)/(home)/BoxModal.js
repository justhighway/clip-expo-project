// app/(tabs)/(home)/BoxModal.js:
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  Animated,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { getUserItems } from "@/api/items";
import { Stack, useRouter } from "expo-router";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

export default function BoxModal() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const swipeableRef = useRef(null);

  const conditionMapping = {
    1: "S",
    2: "A+",
    3: "A0",
    4: "B+",
    5: "B0",
    6: "C+",
    7: "D+",
    8: "D0",
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await getUserItems();
        setItems(result.result.data.itemDTOList);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleConfirmSelection = () => {
    if (selectedItem) {
      console.log("Selected item:", selectedItem);
      router.back(); // Close the modal
    } else {
      alert("Please select an item.");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const renderRightActions = (progress, dragX, item) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.rightActionContainer,
          { transform: [{ translateX: trans }] },
        ]}
      >
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => console.log("Edit", item)}
        >
          <Text style={styles.actionText}>수정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => console.log("Delete", item)}
        >
          <Text style={styles.actionText}>삭제</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderItem = ({ item }) => (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, item)
      }
      onSwipeableOpen={() => {
        if (swipeableRef.current) {
          swipeableRef.current.close();
        }
      }}
    >
      <TouchableOpacity
        style={[
          styles.itemContainer,
          selectedItem && selectedItem.itemSeq === item.itemSeq
            ? styles.selectedItem
            : null,
        ]}
        onPress={() => handleSelectItem(item)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.itemPictures }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.itemName}</Text>
          <Text style={styles.itemPrice}>
            {item.itemPrice.toLocaleString("ko-KR")} 원
          </Text>
          <Text style={styles.itemCondition}>
            {conditionMapping[item.itemCondition]}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "아이템",
          headerRight: () => (
            <Button
              title="선택"
              onPress={handleConfirmSelection}
              color={"purple"}
            />
          ),
          headerLeft: () =>
            Platform.OS == "ios" && (
              <Button title="취소" onPress={handleCancel} color={"purple"} />
            ),
        }}
      />
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={(item) => item.itemSeq.toString()}
            />
          )}
        </SafeAreaView>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedItem: {
    backgroundColor: "#e0e0e0",
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 18,
    color: "#777",
  },
  itemCondition: {
    fontSize: 16,
    color: "#777",
  },
  buttonContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  rightActionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  actionButton: {
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
    height: "100%",
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
  },
});
