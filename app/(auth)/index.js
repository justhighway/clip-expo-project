import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { colors } from "@/constants/colors";
import AnimatedTitle from "@/components/AnimatedTitle";
import CustomButton from "@/components/CustomButton";

export default function AuthScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>클립에서,</Text>
        <AnimatedTitle />
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitleText}>
            내 취향을 잘 알아주는 물물교환
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          label="시작하기"
          onPress={() => {
            router.navigate("SignIn");
          }}
        />
        <CustomButton
          label="회원가입"
          variant="outlined"
          onPress={() => {
            router.navigate("SignUp");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subTitleContainer: {
    marginTop: 20,
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: "flex-end",
    gap: 12,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 45,
    fontWeight: "bold",
    color: colors.PURPLE800,
  },
  subTitleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.GREY600,
  },
});
