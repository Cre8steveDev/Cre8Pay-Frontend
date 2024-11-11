import React from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Platform } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar style="light" backgroundColor={Colors.primary600} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.secondaryMain,
          tabBarInactiveTintColor: Colors.gray,
          tabBarStyle: {
            height: 65,
            width: "100%",
            paddingHorizontal: 20,
            marginHorizontal: "auto",
            backgroundColor: Colors.primary600,

            ...Platform.select({
              ios: {
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              },
              android: {
                elevation: 5,
              },
            }),
          },
          tabBarLabelStyle: {
            fontSize: 9,
            fontFamily: "PoppinsRegular",
            marginBottom: 12,
            marginTop: -8,
          },
        }}
      >
        <Tabs.Screen
          name="register"
          options={{
            title: "Register",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "person-add" : "person-add-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="login"
          options={{
            title: "Login",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "log-in" : "log-in-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
