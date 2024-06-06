import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

const ImagePickerButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Ionicons name="camera" size={28} color={colors.WHITE} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 150,
    backgroundColor: colors.GREY400,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { ImagePickerButton };
