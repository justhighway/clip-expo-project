// components/CardSwiper/cardComponents/CardImage.js
import React from "react";
import { Image, StyleSheet } from "react-native";

const CardImage = ({ uri }) => (
  <Image source={{ uri }} style={styles.cardImage} resizeMode="cover" />
);

const styles = StyleSheet.create({
  cardImage: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
});

export { CardImage };
