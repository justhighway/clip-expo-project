// app/(auth)/SignIn.js

import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useForm } from "@/hooks/useForm";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { colors } from "@/constants/colors";
import { validateSignIn } from "@/utils/validate";
import { postSignIn } from "@/api/auth";
import BackContainer from "@/components/BackContainer";
import { SafeAreaView } from "react-native-safe-area-context";
import { getSecureStore, setSecureStore } from "@/utils/secureStore";
import { useRouter } from "expo-router";

export default function SignInScreen() {
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const signIn = useForm({
    initialValue: { username: "", password: "" },
    validate: validateSignIn,
  });
  const router = useRouter(); // useRouter 훅 사용

  const handleSubmit = async () => {
    const { username, password } = signIn.values;
    setLoading(true);

    try {
      const response = await postSignIn({ username, password });
      const { accessToken, refreshToken } = response.result.data;

      // Secure Store에 토큰 저장
      await setSecureStore("accessToken", accessToken);
      await setSecureStore("refreshToken", refreshToken);

      setLoading(false);
      let atk = await getSecureStore("accessToken");
      let rfk = await getSecureStore("refreshToken");
      console.log("로그인 성공 / atk ", atk);
      console.log("로그인 성공 / rfk ", rfk);
      router.replace("(tabs)");
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackContainer />
      <View style={styles.subContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.introText}>이메일과 비밀번호로</Text>
          <Text style={styles.introText}>로그인을 진행합니다.</Text>
        </View>
        <View style={styles.inputContainer}>
          <InputField
            autoFocus
            placeholder="이메일"
            error={signIn.errors.username}
            touched={signIn.touched.username}
            inputMode="email"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => passwordRef.current?.focus()}
            {...signIn.getTextInputProps("username")}
          />
          <InputField
            ref={passwordRef}
            placeholder="비밀번호"
            error={signIn.errors.password}
            touched={signIn.touched.password}
            secureTextEntry
            returnKeyType="join"
            onSubmitEditing={handleSubmit}
            {...signIn.getTextInputProps("password")}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={colors.PURPLE300} />
        ) : (
          <CustomButton
            label="로그인"
            variant="filled"
            size="large"
            onPress={handleSubmit}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    padding: 20,
  },
  textContainer: {
    marginVertical: 20,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 30,
  },
  introText: {
    fontWeight: "bold",
    fontSize: 22,
  },
});
