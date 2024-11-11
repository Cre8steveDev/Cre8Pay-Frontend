import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
} from "react-native";
import React, { forwardRef, ReactNode, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

type CustomPasswordInputProp = {
  value: string;
  setValue: (text: string) => void;
  placeholder?: string;
  textColor?: string;
  textSize?: number;
  bgColor?: string;
  keyBoardType?: KeyboardTypeOptions;
  extraStyles?: any;
  children?: ReactNode;
  finishEditing?: () => void;
  returnType?: ReturnKeyTypeOptions;
};

const CustomPasswordInput = forwardRef<TextInput, CustomPasswordInputProp>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <View
        style={[
          props.extraStyles,
          styles.inputContainer,
          { backgroundColor: props.bgColor ? props.bgColor : Colors.white },
        ]}
      >
        <View style={{ width: "90%", flexDirection: "row", gap: 5 }}>
          {props.children}

          <TextInput
            style={[
              styles.input,
              {
                color: props.textColor ? props.textColor : Colors.textGray,
                fontSize: props.textSize ? props.textSize : 18,
              },
            ]}
            ref={ref ?? ref}
            onSubmitEditing={props.finishEditing}
            returnKeyType={props.returnType}
            value={props.value}
            onChangeText={props.setValue}
            placeholder={props.placeholder}
            secureTextEntry={!showPassword}
            placeholderTextColor={Colors.gray}
            cursorColor={Colors.secondaryMain}
            keyboardAppearance="light"
            keyboardType={props.keyBoardType}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.iconContainer}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#b3b3b3"
          />
        </TouchableOpacity>
      </View>
    );
  }
);

export default CustomPasswordInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  input: {
    fontFamily: "PoppinsRegular",
    width: "90%",
  },
  iconContainer: {},
});
