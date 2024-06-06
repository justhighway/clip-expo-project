// components/CardSwiper/CardSwiper.js
import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Swiper } from "rn-swiper-list";
import { LinearGradient } from "expo-linear-gradient";
import { getCustomizedItems } from "@/api/items";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { CardImage } from "./cardComponents/CardImage";
import { BarContainer } from "./cardComponents/BarContainer";
import { OverlayLabel } from "./cardComponents/OverlayLabel";
import { conditions } from "@/constants/condition";

const CardSwiper = ({ itemSeq, itemUploaderUuid }) => {
  const ref = useRef();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getCustomizedItems(itemSeq);
      setData(response);
      setCurrentImageIndex(Array(response.length).fill(0));
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageChange = (itemIndex, direction) => {
    if (itemIndex >= data.length || itemIndex < 0) return;

    setCurrentImageIndex((prevState) => {
      const newIndex = [...prevState];
      if (direction === "next") {
        newIndex[itemIndex] =
          (newIndex[itemIndex] + 1) % data[itemIndex].itemPictures.length;
      } else if (direction === "prev") {
        newIndex[itemIndex] =
          (newIndex[itemIndex] - 1 + data[itemIndex].itemPictures.length) %
          data[itemIndex].itemPictures.length;
      }
      return newIndex;
    });
  };

  const renderCard = useCallback(
    (item, index) => (
      <TouchableWithoutFeedback
        onPress={(e) => {
          const { locationX } = e.nativeEvent;
          handleImageChange(index, locationX > 200 ? "next" : "prev");
        }}
      >
        <View style={styles.cardContainer}>
          <View style={styles.imageContainer}>
            <CardImage uri={item.itemPictures[currentImageIndex[index]]} />
            <BarContainer
              itemPictures={item.itemPictures}
              currentImageIndex={currentImageIndex[index]}
            />
          </View>
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.9)"]}
            style={styles.gradientBottom}
          />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitleText}>{item.itemName}</Text>
            <Text style={styles.cardDetailsText}>
              {item.itemPrice.toLocaleString()}원 ·{" "}
              {conditions[item.itemCondition]}
            </Text>
          </View>
          <View style={styles.detailButtonContainer}>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() =>
                router.push({
                  pathname: "ItemDetailModal",
                  params: { item: JSON.stringify(item) },
                })
              }
            >
              <Ionicons name="arrow-up" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    ),
    [currentImageIndex, data, router]
  );

  const handleSwipeEnd = useCallback(fetchData, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.subContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : data.length > 0 ? (
          <Swiper
            ref={ref}
            cardStyle={styles.cardStyle}
            data={data}
            renderCard={renderCard}
            onSwipeRight={(cardIndex) => {
              console.log("itemSeq", itemSeq, data[cardIndex].itemSeq);
              console.log(
                "itemUploaderUUID",
                itemUploaderUuid,
                data[cardIndex].itemUpLoaderUuid
              );
            }}
            onSwipedAll={handleSwipeEnd}
            onSwipeLeft={(cardIndex) => console.log("onSwipeLeft", cardIndex)}
            onSwipeTop={(cardIndex) => console.log("onSwipeTop", cardIndex)}
            OverlayLabelRight={() => {
              <OverlayLabel label="LIKE" color="green" />;
            }}
            OverlayLabelLeft={() => (
              <OverlayLabel label="DISLIKE" color="red" />
            )}
            OverlayLabelTop={() => <OverlayLabel label="PASS" color="blue" />}
          />
        ) : (
          <Text>No items available</Text>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardStyle: {
    width: "95%",
    height: "90%",
    borderRadius: 15,
    marginVertical: 20,
  },
  cardContainer: {
    flex: 1,
    borderRadius: 20,
    height: "75%",
    width: "100%",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gradientBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "25%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cardTextContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
  },
  detailButtonContainer: {
    position: "absolute",
    bottom: 40,
    right: 20,
  },
  cardTitleText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  cardDetailsText: {
    fontSize: 18,
    color: "white",
  },
  overlayLabelContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayLabelText: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
  },
  barContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    top: 10,
  },
  bar: {
    width: 30,
    height: 6,
    marginHorizontal: 4,
  },
  activeBar: {
    backgroundColor: "#ffffff",
  },
  inactiveBar: {
    backgroundColor: "#cccccc",
  },
  detailsButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 50,
    padding: 10,
  },
});

export { CardSwiper };
