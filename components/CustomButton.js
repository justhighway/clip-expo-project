import React from "react";
import { Dimensions, StyleSheet, Text, View, Pressable } from "react-native";
import { colors } from "@/constants/colors";

const deviceHeight = Dimensions.get("screen").height;

export default function CustomButton({
  label,
  variant = "filled",
  size = "large",
  inValid = false,
  ...props
}) {
  return (
    <Pressable
      disabled={inValid}
      style={({ pressed }) => [
        styles.container,
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        inValid && styles.inValid,
        styles[size], // 크기 스타일 적용
      ]}
      {...props}
    >
      <View style={styles.content}>
        <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  inValid: {
    opacity: 0.5,
  },
  filled: {
    backgroundColor: colors.PURPLE700,
  },
  outlined: {
    borderColor: colors.PURPLE700,
    borderWidth: 1,
  },
  filledPressed: {
    backgroundColor: colors.PURPLE400,
  },
  outlinedPressed: {
    borderWidth: 1,
    opacity: 0.3,
  },
  small: {
    width: "250%",
    height: 50,
  },
  medium: {
    width: "50%",
    height: 50,
  },
  large: {
    width: "100%",
    height: 50,
  },
  text: {
    fontSize: 18,
    fontWeight: "700",
  },
  filledText: {
    color: colors.WHITE,
  },
  outlinedText: {
    color: colors.PURPLE700,
  },
});
