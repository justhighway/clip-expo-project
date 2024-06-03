import { View, StyleSheet, Platform } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="(home)"
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          padding: 0,
          height: 80,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#999",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cards" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(community)"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="space-dashboard" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(add)"
        options={{
          tabBarIcon: () => (
            <View style={style.add}>
              <Ionicons name="add-outline" size={28} color={"white"} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(chat)"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const style = StyleSheet.create({
  add: {
    backgroundColor: "purple",
    borderRadius: 28,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
