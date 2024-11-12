import {
  View,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
  Text,
} from "react-native";
import { useEffect } from "react";
import { Colors } from "@/constants/Colors";

export const LoadingOverlay = () => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true // Return true to prevent default behavior
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.loadingBox}>
        <ActivityIndicator size={85} color={Colors.primary600} />
        <Text style={styles.text}>Loading...please wait</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.80",
    zIndex: 999,
  },
  loadingBox: {
    padding: 25,
    borderRadius: 10,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontFamily: "PoppinsSemiBold",
    fontSize: 12,
    marginTop: 20,
  },
});
