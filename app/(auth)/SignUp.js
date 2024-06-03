import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useForm } from "@/hooks/useForm";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { validateSignUp } from "@/utils/validate";
import { postSignUp } from "@/api/auth";
import { colors } from "@/constants/colors";

function SignUpScreen() {
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [loading, setLoading] = useState(false);
  const signUp = useForm({
    initialValue: { username: "", password: "", passwordConfirm: "" },
    validate: validateSignUp,
  });

  const handleSubmit = async () => {
    const { username, password, passwordConfirm } = signUp.values;

    if (!username || !password || !passwordConfirm) {
      Alert.alert("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      Alert.alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);

    try {
      const response = await postSignUp({ username, password });
      setLoading(false);
      console.log("회원가입 성공", response);
      // 성공 시 추가 동작 (예: 로그인 페이지로 이동)
    } catch (error) {
      setLoading(false);
      Alert.alert("회원가입 실패", "오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.introText}>이메일과 비밀번호로</Text>
        <Text style={styles.introText}>회원가입을 진행합니다.</Text>
      </View>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={signUp.errors.username}
          touched={signUp.touched.username}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signUp.getTextInputProps("username")}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          error={signUp.errors.password}
          touched={signUp.touched.password}
          secureTextEntry
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signUp.getTextInputProps("password")}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          error={signUp.errors.passwordConfirm}
          touched={signUp.touched.passwordConfirm}
          secureTextEntry
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          {...signUp.getTextInputProps("passwordConfirm")}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={colors.PURPLE300} />
      ) : (
        <CustomButton label="회원가입" onPress={handleSubmit} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
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

export default SignUpScreen;
