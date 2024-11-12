import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface Props {
  title: string;
  value: string;
  iconColor: string;
}

// Expenditure stat
const ExpenditureStat: React.FC<Props> = ({ title, value, iconColor }) => {
  return (
    <View style={styles.container}>
      <View style={[{ backgroundColor: iconColor }, styles.iconShape]}></View>

      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

export default ExpenditureStat;

const styles = StyleSheet.create({
  iconShape: {
    width: 15,
    height: 15,
    borderRadius: 100,
  },
  title: {
    fontFamily: "PoppinsRegular",
    fontSize: 10,
  },

  value: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 18,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
