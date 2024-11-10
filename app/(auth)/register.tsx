import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

const Register = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.gray, flex: 1 }}>
      <View>
        <Text>Register</Text>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({});
