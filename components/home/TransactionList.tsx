import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import { ITransactions } from "@/types";
import TransactionCard from "./TransactionCard";

interface ListData {
  data: ITransactions["min"][];
}

const TransactionList: React.FC<ListData> = ({ data }) => {
  //
  return (
    <View style={{ padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        {/* Transaction Heading and Link */}
        <Text style={styles.titleText}>Recent Transactions</Text>
        <Link href={"/(tabs)/transactions"} style={styles.link}>
          View All
        </Link>
      </View>

      {/* Render Transactions  */}
      {data.length === 0 && (
        <Text style={styles.noTransaction}>No Transaction yet.</Text>
      )}
      {data.length > 0 && (
        <View>
          {data.map((trnx, index) => (
            <TransactionCard data={trnx} key={index} />
          ))}
        </View>
      )}
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.textGray,
    fontSize: 18,
  },

  link: {
    color: Colors.primary600,
    textDecorationLine: "underline",
  },

  noTransaction: {
    fontFamily: "PoppinsExtraBold",
    fontSize: 24,
    color: Colors.gray,
    textAlign: "center",
    marginVertical: 5,
  },
});
