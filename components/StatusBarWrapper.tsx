import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export const StatusBarWrapper = () => {
  return (
    <View style={{ backgroundColor: Colors.primary600 }}>
      <StatusBar
        style="light"
        backgroundColor={Colors.primary600}
        translucent={true}
      />
    </View>
  );
};
