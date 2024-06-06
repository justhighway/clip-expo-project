// components/CardSwiper/cardComponents/OverlayLabel.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OverlayLabel = ({ label, color }) => (
  <View style={[styles.overlayLabelContainer, { backgroundColor: color }]}>
    <Text style={styles.overlayLabelText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
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
});

export { OverlayLabel };
