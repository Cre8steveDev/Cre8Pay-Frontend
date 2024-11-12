import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useAppStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";

export const ErrorOverlay = () => {
  const { error, setError } = useAppStore((state) => state);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );

    return () => backHandler.remove();
  }, []);

  const handleClose = () => {
    setError(null);
  };

  if (!error) return null;

  return (
    <View style={styles.container}>
      <View style={styles.errorBox}>
        <Ionicons name="warning" size={50} color={Colors.secondaryMain} />
        <Text style={styles.title}>{error.title}</Text>
        <Text style={styles.message}>{error.message}</Text>
        <TouchableOpacity style={styles.button} onPress={handleClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
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
    backgroundColor: "rgba(0, 0, 0, 0.80)",
    zIndex: 999,
  },
  errorBox: {
    backgroundColor: Colors.white,
    padding: 25,
    borderRadius: 10,
    alignItems: "center",
    maxWidth: "80%",
  },
  title: {
    color: Colors.textDark,
    fontSize: 18,
    fontFamily: "PoppinsBold",
    marginTop: 15,
    textAlign: "center",
  },
  message: {
    color: Colors.textGray,
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.primary600,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
  },
});
