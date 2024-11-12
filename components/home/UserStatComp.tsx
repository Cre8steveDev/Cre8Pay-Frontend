import { StyleSheet, Image, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Colors } from "@/constants/Colors";
import ExpenditureStat from "./ExpenditureStat";
import NavigationIcons from "./NavigationIcons";

interface Prop {
  stat: {
    wallet: number;
    bonus: number;
    amountSpent: number;
    dataBought: number;
  };
  name: string;
  image?: string;
}

const UserStatComp: React.FC<Prop> = ({ stat, name, image }) => {
  // Return Elements to view
  return (
    <>
      <LinearGradient
        colors={[Colors.primary600, Colors.primary800]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <Text style={styles.welcomeText}>Welcome, {name}</Text>

        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.walletText}>Wallet Balance</Text>
            <Text style={styles.walletAmount}>
              N
              {stat.wallet.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>

            <Text style={styles.referralText}>Referral Bonus</Text>
            <Text style={styles.referralAmount}>
              N
              {stat.bonus.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>

          {/* Profile Image */}
          <Image
            source={{
              uri:
                image ||
                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
            }}
            style={styles.profileImage}
          />
        </View>
      </LinearGradient>

      <View style={styles.yellowBox}>
        {/* Expenditure Stats */}
        <View style={styles.expenditureContainer}>
          <ExpenditureStat
            iconColor={Colors.primary800}
            title="Total Amount Spent"
            value={"N" + stat.amountSpent.toLocaleString()}
          />

          <ExpenditureStat
            iconColor={Colors.white}
            title="Data Purchase"
            value={
              stat.dataBought === 0 ? "0.00GB" : stat.dataBought / 1000 + "GB"
            }
          />
        </View>

        {/* Link to Actions */}
        <NavigationIcons />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
  },

  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    height: 150,
  },

  welcomeText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },

  walletText: {
    fontFamily: "PoppinsRegular",
    color: Colors.white,
    fontSize: 12,
  },

  walletAmount: {
    fontFamily: "PoppinsBold",
    color: Colors.secondaryMain,
    fontSize: 36,
    lineHeight: 42,
  },

  referralText: {
    fontFamily: "PoppinsRegular",
    color: Colors.white,
    fontSize: 12,
  },

  referralAmount: {
    fontFamily: "PoppinsBold",
    color: Colors.white,
    fontSize: 20,
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginVertical: 10,
    borderWidth: 5,
    borderColor: "white",
    objectFit: "cover",
  },

  yellowBox: {
    backgroundColor: Colors.secondaryMain,
    height: 160,
    width: "90%",
    marginHorizontal: "auto",
    marginTop: -50,
    borderRadius: 10,
    padding: 20,
  },

  expenditureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default UserStatComp;
