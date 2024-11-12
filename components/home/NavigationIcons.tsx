import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Href, Link, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { IconName } from "@/types";

const NavigationIcons = () => {
  const router = useRouter();

  //   Return  Icons
  return (
    <View style={styles.container}>
      {links.map((link, index) => (
        <View style={styles.nestedContainer} key={index}>
          <Link href={link.route}>
            <View style={styles.iconContainer}>
              <Ionicons name={link.icon} size={28} color="white" />
            </View>
            <View>
              <Text style={styles.labelText}>{link.label}</Text>
            </View>
          </Link>
        </View>
      ))}
    </View>
  );
};

export default NavigationIcons;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: 80,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  nestedContainer: {
    width: "18%",
  },

  iconContainer: {
    padding: 10,
    backgroundColor: Colors.primary600,
    borderRadius: 8,
  },

  labelText: {
    fontSize: 8,
    fontFamily: "PoppinsSemiBold",
    textAlign: "center",
  },
});

interface Links {
  icon: IconName;
  label: string;
  route: Href;
}

const links: Links[] = [
  {
    icon: "wallet",
    label: "Fund Wallet",
    route: "/(tabs)/fund-wallet",
  },
  {
    icon: "wifi",
    label: "Buy Data",
    route: "/(tabs)/buy-data",
  },
  {
    icon: "phone-portrait",
    label: "Buy Airtime",
    route: "/(tabs)/buy-airtime",
  },
  {
    icon: "tv",
    label: "Cable TV",
    route: "/(tabs)/cable-tv",
  },
  {
    icon: "receipt",
    label: "Electricity Bill",
    route: "/(tabs)/electricity-bill",
  },
];
