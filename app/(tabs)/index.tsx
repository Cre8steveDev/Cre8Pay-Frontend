import ExtraServices from "@/components/home/ExtraServices";
import TransactionList from "@/components/home/TransactionList";
import UserStatComp from "@/components/home/UserStatComp";

import { useSessionStore, useUserStore } from "@/store";
import { ITransactions } from "@/types";
import { StyleSheet, ScrollView } from "react-native";

export default function HomeScreen() {
  const user = useUserStore((state) => state.user);
  const token = useSessionStore((state) => state.token);

  // Dummy Data from API
  const apiData = {
    stat: {
      wallet: 46000,
      bonus: 18120,
      amountSpent: 23500.54,
      dataBought: 25560,
    },
    transactions: [],
  };

  // Home screen return to view
  return (
    <ScrollView style={styles.container}>
      {/* Top banner with use state and actions */}
      <UserStatComp
        stat={apiData.stat}
        name={user?.name!}
        image={user?.image}
      />

      {/* Recent Transaction List */}
      <TransactionList data={recentTransactions} />

      {/* Do more with Cre8pay banners */}
      <ExtraServices />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Sample Transaction History Card Data
const recentTransactions: ITransactions["min"][] = [
  {
    type: "airtime",
    transaction: "9mobile Airtime",
    dateTime: "11 November, 2024 | 02:35 PM",
    amount: 400,
    id: "543fsdaigjf89",
  },

  {
    type: "data",
    transaction: "MTN NG Data (2GB)",
    dateTime: "11 November, 2024 | 02:35 PM",
    amount: 530,
    id: "543fsdaigjhbmgjf89",
  },

  {
    type: "funding",
    transaction: "Wallet Funded",
    dateTime: "11 November, 2024 | 02:35 PM",
    amount: 7600,
    id: "543fsdadfasdf3igjf89",
  },

  {
    type: "data",
    transaction: "Glo NG Data (10GB)",
    dateTime: "11 November, 2024 | 02:35 PM",
    amount: 2500,
    id: "df543fsdaigjf89",
  },
];
