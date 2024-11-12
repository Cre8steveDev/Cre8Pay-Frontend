import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import useInputRefs from "@/hooks/useInputRefs";
import validateUserData from "@/lib/validateUserData";
import { Ionicons } from "@expo/vector-icons";
import DropdownSelect from "@/components/form/DropDownSelect";
import CustomTextInput from "@/components/form/CustomTextInput";
import CustomPasswordInput from "@/components/form/CustomPasswordInput";

// OTP Authentication
import OTPAuthScreen from "@/components/auth/OTPVerification";
import { useAppStore } from "@/store";

const Register = () => {
  const inputs = Array(4);
  const [newUser, setNewUser] = useState(newUserData);
  const [isInputValid, setIsInputValid] = useState(false);
  const { setIsLoading, setError } = useAppStore((state) => state);

  const { setRef, focusNext } = useInputRefs(inputs.length);

  // show OTP Verification
  const [showOTPModal, setShowOTPModal] = useState(false);

  useEffect(() => {
    const result = validateUserData(newUser);

    if (result.isValid) {
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
    }
  }, [newUser]);

  // Handle Register function
  const handleRegister = () => {
    try {
      setShowOTPModal(true);
    } catch (error) {}
  };

  // Return View
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.primary600} />

      <Text style={styles.headerText}>Create an Account to Get Started</Text>
      <Text style={styles.headerSubText}>
        Welcome to the Trybe! Enjoy Reliability.
      </Text>

      {/* Registration Form Fields */}
      {/* Full Name  */}
      <View style={[styles.inputBound, { marginTop: 20 }]}>
        <Text style={styles.inputLabel}>Full Name:</Text>
        <CustomTextInput
          value={newUser.fullName}
          setValue={(text: string) =>
            setNewUser((prev) => ({ ...prev, fullName: text }))
          }
          keyBoardType="name-phone-pad"
          ref={setRef(0)}
          finishEditing={() => focusNext(0)}
          returnType={0 === inputs.length - 1 ? "done" : "next"}
          bgColor={Colors.secondary600}
          children={
            <Ionicons name="person" size={24} color={Colors.textGray} />
          }
        />
      </View>

      {/* Email Address  */}
      <View style={[styles.inputBound, { marginTop: 10 }]}>
        <Text style={styles.inputLabel}>Email Address:</Text>
        <CustomTextInput
          value={newUser.email}
          setValue={(text: string) =>
            setNewUser((prev) => ({ ...prev, email: text }))
          }
          keyBoardType="email-address"
          ref={setRef(1)}
          finishEditing={() => focusNext(1)}
          returnType={1 === inputs.length - 1 ? "done" : "next"}
          bgColor={Colors.secondary600}
          children={<Ionicons name="mail" size={24} color={Colors.textGray} />}
        />
      </View>

      {/* Password Input  */}
      <View style={styles.inputBound}>
        <Text style={styles.inputLabel}>Password:</Text>
        <CustomPasswordInput
          value={newUser.password}
          ref={setRef(2)}
          finishEditing={() => focusNext(2)}
          returnType={2 === inputs.length - 1 ? "done" : "next"}
          bgColor={Colors.secondary600}
          setValue={(text: string) =>
            setNewUser((prev) => ({ ...prev, password: text }))
          }
          children={
            <Ionicons name="lock-closed" size={24} color={Colors.textGray} />
          }
        />
      </View>

      {/* Primary Network Provider */}
      <View style={styles.inputBound}>
        <Text style={styles.inputLabel}>Primary Network Provider:</Text>
        <DropdownSelect
          options={networkProviders}
          label="Network Provider"
          selectedValue={newUser.networkProvider}
          icon={<Ionicons name="cellular" size={24} color={Colors.textGray} />}
          onValueChange={(text) =>
            setNewUser((prev) => ({ ...prev, networkProvider: text }))
          }
        />
      </View>

      {/* Phone Number  */}
      <View style={[styles.inputBound, { marginTop: 10 }]}>
        <Text style={styles.inputLabel}>Phone Number:</Text>
        <CustomTextInput
          value={newUser.phone}
          setValue={(text: string) =>
            setNewUser((prev) => ({ ...prev, phone: text }))
          }
          keyBoardType="phone-pad"
          returnType={"done"}
          bgColor={Colors.secondary600}
          children={
            <Ionicons name="phone-portrait" size={24} color={Colors.textGray} />
          }
        />
      </View>

      {/* Next Button */}
      <TouchableOpacity
        onPress={handleRegister}
        disabled={!isInputValid}
        style={[
          isInputValid ? styles.activeBtn : styles.disabledBtn,
          styles.button,
        ]}
      >
        <Text style={styles.btnText}>Register Now</Text>
      </TouchableOpacity>

      {/* OTP Modal */}
      {showOTPModal && (
        <OTPAuthScreen
          userEmail={newUser.email}
          showOTPModal={showOTPModal}
          setShowOTPModal={setShowOTPModal}
        />
      )}
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingTop: 50,
    flex: 1,
    backgroundColor: Colors.primary600,
  },
  headerText: {
    color: "white",
    fontSize: 32,
    fontFamily: "PoppinsBold",
    textAlign: "center",
    lineHeight: 36,
  },
  headerSubText: {
    color: "white",
    fontSize: 13,
    textAlign: "center",
    fontFamily: "PoppinsRegular",
  },

  inputBound: {
    marginTop: 10,
  },

  inputLabel: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.gray,
    fontSize: 11,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontFamily: "PoppinsSemiBold",
    fontSize: 18,
  },
  disabledBtn: { backgroundColor: Colors.gray },
  activeBtn: { backgroundColor: Colors.primary800 },
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    width: "100%",
  },
});

const newUserData = {
  fullName: "",
  email: "",
  password: "",
  networkProvider: "",
  phone: "",
};

const networkProviders = [
  { label: "9mobile Nigeria", value: "9mobile Nigeria" },
  { label: "MTN Nigeria", value: "MTN Nigeria" },
  { label: "Glo Nigeria", value: "Glo Nigeria" },
  { label: "Airtel Nigeria", value: "Airtel Nigeria" },
  { label: "Smile Nigeria", value: "Smile Nigeria" },
];
