import { Colors } from "@/constants/Colors";
import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";

interface OTPInputProps {
  length?: number;
  otpValue: string;
  onOTPChange: (otp: string) => void;
  containerStyle?: object;
  inputStyle?: object;
  filledInputStyle?: object;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onOTPChange,
  containerStyle = {},
  inputStyle = {},
  filledInputStyle = {},
  otpValue,
}) => {
  const [otp, setOTP] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  useEffect(() => {
    if (otpValue === "") {
      setOTP(Array(length).fill(""));
    }
  }, [otpValue]);

  const handleChange = (text: string, index: number) => {
    const newOTP = [...otp];
    newOTP[index] = text;
    setOTP(newOTP);
    onOTPChange(newOTP.join(""));

    if (text.length !== 0 && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (
      event.nativeEvent.key === "Backspace" &&
      index > 0 &&
      otp[index] === ""
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            style={[
              styles.input,
              inputStyle,
              otp[index]
                ? [styles.filledInput, filledInputStyle]
                : { backgroundColor: Colors.gray },
            ]}
            cursorColor={Colors.white}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            value={otp[index]}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    width: Dimensions.get("screen").width / 7,
    height: 55,
    textAlign: "center",
    fontSize: 32,
    fontFamily: "PoppinsBold",
    color: "white",
  },
  filledInput: {},
});

export default OTPInput;
