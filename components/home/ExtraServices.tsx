import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ExtraServices = () => {
  return (
    <View style={styles.container}>
      <Text>
        Do more with <Text>Cre8pay</Text>
      </Text>
    </View>
  );
};

export default ExtraServices;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
});
