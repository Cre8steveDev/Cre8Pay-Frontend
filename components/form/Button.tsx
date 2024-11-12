import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";

// Define Types
type ButtonProp = {
  children?: React.ReactNode;
  text: string;
  textColor?: string;
  bgColor?: string;
  onPress: () => void;
  disabled?: boolean;
  extraStyles?: ViewStyle;
};

const Button = ({
  children,
  text,
  textColor,
  bgColor,
  onPress,
  disabled = false,
  extraStyles = {},
}: ButtonProp) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        extraStyles,
        disabled ? { backgroundColor: "gray" } : { backgroundColor: bgColor },
        styles.container,
      ]}
      disabled={disabled}
    >
      <View style={styles.childContainer}>
        {children}
        <Text
          style={{
            color: disabled ? "#bfbfbf" : textColor,
            fontSize: 18,
            fontFamily: "PoppinsBold",
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    // borderRadius: 10,
  },
  childContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
});
