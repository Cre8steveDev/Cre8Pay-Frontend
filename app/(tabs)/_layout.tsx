import { Redirect, Tabs } from "expo-router";
import React, { useEffect } from "react";

import { Animated, Text } from "react-native";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useUserStore } from "@/store";

// First, update TabLayout.tsx with custom styles
import { View, StyleSheet, Dimensions } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useUserStore();

  if (!user) return <Redirect href={"/(auth)/login"} />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.textGray,
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarBackground: () => <View style={styles.tabBarBackground} />,
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarLabel: () => null, // Hide default label
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeIconContainer,
              ]}
            >
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
              <Text
                style={[styles.labelText, focused && styles.activeLabelText]}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeIconContainer,
              ]}
            >
              <TabBarIcon
                name={focused ? "person" : "person-outline"}
                color={color}
              />
              <Text
                style={[styles.labelText, focused && styles.activeLabelText]}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeIconContainer,
              ]}
            >
              <TabBarIcon
                name={focused ? "settings" : "settings-outline"}
                color={color}
              />
              <Text
                style={[styles.labelText, focused && styles.activeLabelText]}
              >
                Settings
              </Text>
            </View>
          ),
        }}
      />

      {/* Remove some pages from the Tab */}
      <Tabs.Screen
        name="buy-airtime"
        options={{
          tabBarButton: () => null, // This hides the tab but keeps the screen
        }}
      />
      <Tabs.Screen
        name="buy-data"
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="cable-tv"
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="fund-wallet"
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="electricity-bill"
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tabs.Screen
        name="transactions"
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 25,
    left: "16%", // Centers the 70% width bar
    right: "15%",
    height: 65,
    borderRadius: 25,
    backgroundColor: "transparent",
    elevation: 0,
    borderTopWidth: 0,
    width: "65%",
  },

  tabBarBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.white,

    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  tabBarItem: {
    height: 60,
    padding: 8,
  },

  tabBarIcon: {
    marginTop: 5,
  },

  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
    borderRadius: 22,
    minWidth: 60,
  },

  activeIconContainer: {
    backgroundColor: Colors.primary600,
  },

  labelText: {
    fontSize: 8,
    marginTop: 4,
    fontFamily: "PoppinsRegular",
    color: Colors.textGray,
  },

  activeLabelText: {
    color: Colors.white,
    fontFamily: "PoppinsSemiBold",
  },
});
