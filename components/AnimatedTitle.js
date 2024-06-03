import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

const AnimatedText = ({ text, isVisible }) => {
  return (
    <Animatable.View
      style={[styles.container, { opacity: isVisible ? 1 : 0 }]}
      animation={isVisible ? "fadeInRight" : "fadeOutLeft"}
      duration={500}
    >
      <Text style={styles.text}>{text}</Text>
    </Animatable.View>
  );
};

export default function AnimatedTitle() {
  const dataArray = [
    "냉장고까지",
    "맥북까지",
    "컴퓨터까지",
    "의자까지",
    "집까지",
    "세상까지",
    "PS5까지",
    "닌텐도까지",
    "태블릿PC까지",
    "TV까지",
    "세탁기까지",
    "청소기까지",
    "책상까지",
    "자동차까지",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // fade-out 시작
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % dataArray.length);
        setIsVisible(true); // fade-in 시작
      }, 1000); // fade-out 이후 1초 후에 fade-in 시작
    }, 4000); // 새로운 문자열이 나타나는 간격 (3초)

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <AnimatedText text={dataArray[currentIndex]} isVisible={isVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 45,
    fontWeight: "bold",
  },
});
