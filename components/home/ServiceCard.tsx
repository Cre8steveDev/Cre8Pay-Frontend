import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { IconName } from "@/types";
import { Href, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

// Service Card Component
interface Props {
  iconName: IconName;
  title: string;
  subtext: string;
  actionText?: string;
  isActive?: boolean;
  iconColor: string;
  bgColor: string;
  route: Href;
}

const ServiceCard: React.FC<Props> = ({
  iconName,
  title,
  subtext,
  actionText,
  isActive = true,
  iconColor,
  bgColor,
  route,
}) => {
  return (
    <View style={[{ backgroundColor: bgColor }, styles.container]}>
      <Ionicons name={iconName} color={iconColor} size={34} />
      <Text style={styles.titleText}>{title}</Text>

      <Text style={styles.subText}>{subtext}</Text>

      <Text style={styles.actionContainer}>
        {isActive && <Link href={route}>{actionText}</Link>}
        {!isActive && <Text>Coming soon...</Text>}
      </Text>
    </View>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 15,
    width: 140,
    gap: 5,
  },

  titleText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 15,
    color: Colors.white,
  },

  subText: {
    fontFamily: "PoppinsRegular",
    fontSize: 13,
    color: Colors.white,
  },

  actionText: {
    fontFamily: "PoppinsSemiBold",
  },

  actionContainer: {
    marginTop: 10,
    color: Colors.white,
    fontFamily: "PoppinsRegular",
  },
});
