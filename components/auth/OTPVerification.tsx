import {
  BackHandler,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import OTPInput from "./OTPInput";
import Button from "../form/Button";
import { Ionicons } from "@expo/vector-icons";

import hideEmail from "@/lib/hideEmailAddress";

import { useRouter } from "expo-router";
import BACKEND_API from "@/constants/API_URL";

type OTPAuthType = {
  userEmail: string;
  setShowOTPModal: React.Dispatch<React.SetStateAction<boolean>>;
  showOTPModal: boolean;
};

// OTP Screen Component
const OTPAuthScreen = ({
  userEmail,
  showOTPModal,
  setShowOTPModal,
}: OTPAuthType) => {
  const [loading, setLoading] = useState(false);
  const [OTPTimer, setOTPTimer] = useState(60);

  // Define state for the entered OTP Value
  const [OTPValue, setOTPVALUE] = useState("");
  const [OTPVerifySuccess, setOTPVerifySuccess] = useState(false);
  const [triggerResend, setTriggerResend] = useState(1);
  const [otpError, setOtpError] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");

  //   Define router
  const router = useRouter();

  //   Set UP OTP Resent Timer
  useEffect(() => {
    setOTPTimer(60);

    const interval = setInterval(() => {
      setOTPTimer((prev) => prev - 1);
    }, 1000);

    // Prevent leaks
    return () => clearInterval(interval);
  }, [triggerResend]);

  //   Handle Verify OTP
  const handleVerifyOTP = async () => {
    setLoading(true);
    setOtpError(false);

    try {
      const response = await BACKEND_API.post("/api/auth/verify-otp", {
        OTP: OTPValue,
        email: userEmail,
      });

      router.replace("/(tabs)/");
    } catch (error: any) {
      setOtpError(true);
      if (error?.message?.includes("401"))
        setOtpMessage("OTP has expired. Request a new one.");
      if (error?.message?.includes("403"))
        setOtpMessage("Invalid OTP. Please confirm the code sent.");
      if (error?.message?.includes("404"))
        setOtpMessage("An Unknown Error Occurred.");
    }

    return setLoading(false);
  };

  //   Re-request new OTP to mail
  const resendOTPCode = async () => {
    setOTPVALUE("");
    setOtpError(false);
    try {
      const response = await BACKEND_API.post("/api/auth/renew-otp", {
        email: userEmail,
      });

      //   if (response.data.success) {
      //     useToast("New OTP Requested. Check your mail");
      //   }
    } catch (error) {
      console.log(error);
      setOtpError(true);
      setOtpMessage("Error generating a new OTP. Contact Admin.");
    }
    setTriggerResend((prev) => ++prev);
  };

  //   Return JSX Element for the Modal
  return (
    <Modal
      visible={showOTPModal}
      animationType="slide"
      onRequestClose={() => setShowOTPModal(false)}
    >
      <StatusBar backgroundColor={Colors.primary600} translucent />

      <View style={styles.modalContainer}>
        {!OTPVerifySuccess && (
          <>
            <View style={styles.modalContent}>
              <Text style={styles.headingText}>OTP Authentication</Text>
              <Text style={styles.subheading}>
                Please enter the short code sent to your email.{" "}
              </Text>
              <Text style={styles.subheadingBold}>{hideEmail(userEmail)}</Text>

              {/* Input Button */}
              <View style={{ width: "100%" }}>
                <OTPInput
                  otpValue={OTPValue}
                  length={5}
                  onOTPChange={(text: string) => {
                    if (otpError) setOtpError(false);
                    setOTPVALUE(text);
                  }}
                  containerStyle={{ marginTop: 20 }}
                  inputStyle={{ borderRadius: 5 }}
                  filledInputStyle={{
                    backgroundColor: otpError ? "red" : Colors.secondaryMain,
                  }}
                />
              </View>

              {/* Resend OTP Request */}
              <View style={styles.resendOTPContainer}>
                {OTPTimer > 0 && (
                  <Text style={styles.resendText}>
                    Resend OTP code in{" "}
                    <Text style={styles.resendTimer}>{OTPTimer}s</Text>{" "}
                  </Text>
                )}
                {OTPTimer <= 0 && (
                  <TouchableOpacity onPress={() => resendOTPCode()}>
                    <Text style={styles.resendLink}>Request New OTP</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Complete Registration Button  */}
              <Button
                children={
                  <Ionicons name="checkmark-circle" color={"white"} size={24} />
                }
                text={loading ? "Verifying..." : "Complete Registration"}
                disabled={loading || OTPValue.length < 5}
                textColor="black"
                bgColor={Colors.secondaryMain}
                onPress={handleVerifyOTP}
                extraStyles={{ padding: 12, borderRadius: 7, marginTop: 10 }}
              />

              {!loading && otpError && (
                <Text style={styles.otpErrorMessage}>{otpMessage}</Text>
              )}
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default OTPAuthScreen;

// Define Style Sheet for the OTP View Component
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.primary600,
    zIndex: 15,
    padding: 25,
  },

  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "100%",
  },

  headingText: {
    fontFamily: "PoppinsBold",
    width: "100%",
    fontSize: 34,
    lineHeight: 40,
    marginTop: 20,
    color: Colors.white,
    textAlign: "center",
  },

  subheading: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
    color: Colors.gray,
    textAlign: "center",
  },

  subheadingBold: {
    color: Colors.secondaryMain,
    fontFamily: "PoppinsBold",
    fontSize: 18,
    textAlign: "center",
  },

  resendOTPContainer: {
    marginVertical: 15,
  },
  resendText: {
    fontFamily: "PoppinsRegular",
    color: Colors.white,
    textAlign: "center",
  },
  resendTimer: { fontFamily: "PoppinsSemiBold", color: Colors.secondaryMain },
  resendLink: { fontFamily: "PoppinsExtraBold", color: Colors.secondaryMain },
  otpErrorMessage: {
    color: "red",
    textAlign: "center",
    marginVertical: 6,
  },
});
