import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { forwardRef, ReactNode } from "react";
import { Colors } from "@/constants/Colors";

type CustomTextInputProp = {
  value: string;
  setValue: (text: string) => void;
  placeholder?: string;
  textColor?: string;
  textSize?: number;
  bgColor?: string;
  keyBoardType?: KeyboardTypeOptions;
  returnType?: ReturnKeyTypeOptions;
  inputStyles?: any;
  containerStyle?: any;
  children?: ReactNode;
  editable?: boolean;
  multiline?: boolean;
  maxlength?: number | undefined;
  finishEditing?: () => void;
};

const CustomTextInput = forwardRef<TextInput, CustomTextInputProp>(
  (props, ref) => {
    return (
      <View
        style={[
          props.containerStyle && props.containerStyle,
          styles.container,
          { backgroundColor: props.bgColor ? props.bgColor : Colors.gray },
        ]}
      >
        {props.children}
        <TextInput
          style={[
            props.inputStyles && props.inputStyles,
            styles.input,
            {
              color: props.textColor ? props.textColor : Colors.textDark,
              fontSize: props.textSize ? props.textSize : 18,
            },
          ]}
          ref={ref ?? ref}
          value={props.value}
          onChangeText={props.setValue}
          placeholder={props.placeholder}
          placeholderTextColor={Colors.textGray}
          onSubmitEditing={props.finishEditing}
          cursorColor={Colors.secondaryMain}
          keyboardAppearance="light"
          keyboardType={props.keyBoardType}
          autoComplete="off"
          multiline={props.multiline}
          maxLength={props.maxlength}
          returnKeyType={props.returnType}
          autoCapitalize="none"
          autoCorrect={false}
          editable={props.editable}
        />
      </View>
    );
  }
);

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  input: {
    fontFamily: "PoppinsRegular",
    width: "95%",
    paddingRight: 8,
  },
});
