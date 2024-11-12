import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import ServiceCard from "./ServiceCard";

const ExtraServices = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Do more with <Text style={styles.subTitleText}>Cre8pay</Text>
      </Text>

      {/* List Service Card */}
      <ScrollView
        horizontal
        style={styles.scrollContainer}
        contentContainerStyle={{ gap: 10, paddingTop: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        <ServiceCard
          iconName="people"
          iconColor={Colors.white}
          title="Refer and Earn up to N25,000"
          subtext="Earn extra cash when your friends join Cre8pay."
          actionText="Invite Now"
          bgColor={Colors.primary600}
          route={"/(tabs)/profile?affiliate=true"}
        />

        <ServiceCard
          iconName="wallet"
          iconColor={Colors.white}
          title="Enjoy Zero Transfer Fees."
          subtext="Need to Send money to friends using the app?"
          isActive={false}
          bgColor={Colors.secondaryMain}
          route={"/(tabs)/"}
        />

        <ServiceCard
          iconName="paper-plane"
          iconColor={Colors.white}
          title="Generate free Invoices."
          subtext="Receive payments for completed jobs and orders."
          isActive={false}
          bgColor={Colors.textGray}
          route={"/(tabs)/"}
        />
      </ScrollView>
    </View>
  );
};

export default ExtraServices;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  scrollContainer: {},

  titleText: {
    fontFamily: "PoppinsBold",
    fontSize: 15,
    color: Colors.textGray,
  },

  subTitleText: {
    color: Colors.primary600,
  },
});
