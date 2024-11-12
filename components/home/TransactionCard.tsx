import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { IconName, ITransactions } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface Props {
  data: ITransactions["min"];
}

// Transaction Card Component
const TransactionCard: React.FC<Props> = ({ data }) => {
  const iconNames: { [key: string]: string } = {
    airtime: "phone-portrait",
    data: "wifi",
    funding: "wallet",
  };

  const isFunding = data.type === "funding";

  //   Return Card
  return (
    <View style={styles.container}>
      <View style={styles.nested}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={iconNames[data.type] as IconName}
            size={24}
            color={"white"}
          />
        </View>
        <View>
          <Text style={styles.titleText}>{data.transaction}</Text>
          <Text style={styles.dateTime}>{data.dateTime}</Text>
        </View>
      </View>

      <Text
        style={[
          styles.amountText,
          { color: isFunding ? Colors.primary600 : Colors.gray },
        ]}
      >
        {isFunding ? "+" : "-"}N{data.amount}
      </Text>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: Colors.textGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.0,
    shadowRadius: 1,
    elevation: 5,
  },

  nested: {
    flexDirection: "row",
  },

  titleText: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    color: Colors.textGray,
  },

  dateTime: {
    fontFamily: "PoppinsRegular",
    fontSize: 11,
    color: Colors.textGray,
  },

  iconContainer: {
    backgroundColor: Colors.primary600,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    padding: 1,
    borderRadius: 5,
  },
  amountText: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
});
