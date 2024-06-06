// components/CardSwiper/cardComponents/BarContainer.js
import { colors } from "@/constants/colors";
import React from "react";
import { View, StyleSheet } from "react-native";

const BarContainer = ({ itemPictures, currentImageIndex }) => (
  <View style={styles.barContainer}>
    {itemPictures.map((_, imgIndex) => (
      <View
        key={imgIndex}
        style={[
          styles.bar,
          imgIndex === currentImageIndex
            ? styles.activeBar
            : styles.inactiveBar,
        ]}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  barContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    top: 10,
  },
  bar: {
    width: "40%",
    height: 7,
    marginHorizontal: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.GREY400,
  },
  activeBar: {
    backgroundColor: colors.WHITE,
  },
  inactiveBar: {
    backgroundColor: colors.GREY400,
  },
});

export { BarContainer };
