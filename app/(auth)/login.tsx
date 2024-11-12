import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

import { useAppStore, useSessionStore, useUserStore } from "@/store";
import { useRouter } from "expo-router";
import CustomTextInput from "@/components/form/CustomTextInput";
import CustomPasswordInput from "@/components/form/CustomPasswordInput";

import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BACKEND_API from "@/constants/API_URL";
import { handleError } from "@/lib/errorHandler";

/**
 * Login Page Component
 * @returns JSX Element to View
 */
const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const setIsLoading = useAppStore((state) => state.setIsLoading);

  const [hasPreviousLogin, setHasPreviousLogin] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

  const router = useRouter();

  // Retrieve Global store
  const { setUser } = useUserStore((state) => state);
  const { setToken } = useSessionStore((state) => state);
  const { setError } = useAppStore((state) => state);

  // Attempt Login with Fingerprint
  useEffect(() => {
    checkPreviousLogin();
  }, []);

  // Check Previous login
  const checkPreviousLogin = async () => {
    try {
      const previousLogin = await AsyncStorage.getItem(
        "@cre8pay:has_previous_login"
      );
      const biometricEnabled = await AsyncStorage.getItem(
        "@cre8pay:biometric_enabled"
      );
      setHasPreviousLogin(!!previousLogin);
      setIsBiometricEnabled(!!biometricEnabled);
    } catch (error) {
      Alert.alert("Error checking previous login status.");
    }
  };

  // Handle biometric login feature
  const handleBiometricLogin = async () => {
    if (!hasPreviousLogin || !isBiometricEnabled)
      return Alert.alert(
        "Biometric Login not yet enabled.",
        "Kindly login with your registered email and password, then visit your profile section to set up biometric login for subsequent logins."
      );

    try {
      setIsLoading(true);

      // Check if biometrics are enrolled
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert(
          "Biometric Setup Required",
          "Please set up fingerprint authentication in your device settings."
        );
        return;
      }

      // Authenticate
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Fingerprint",
        disableDeviceFallback: true,
        cancelLabel: "Cancel",
      });

      if (result.success) {
        const email = await AsyncStorage.getItem("@cre8pay:userEmail");
        const bioAuthToken = await AsyncStorage.getItem(
          "@cre8pay:bioAuthToken"
        );

        await loginUser({ email: email!, bioAuthToken: bioAuthToken! });
      }
    } catch (error) {
      setError({
        title: "Biometric Error",
        message:
          "An error occured with biometric login. Please sign in using email and password.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async ({
    email,
    password,
    bioAuthToken,
  }: {
    email: string;
    password?: string;
    bioAuthToken?: string;
  }) => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem("@cre8pay:has_previous_login", "true");
      setUser({
        id: "489dfasdf",
        email: "cre8stevedev@gmail.com",
        name: "Stephen",
        image: undefined,
      });
      setToken("54849dfhjdfaskdfjhadgfgfg");

      // const res = await BACKEND_API.post("/auth/login", {
      //   email,
      //   password,
      //   bioAuthToken,
      // });

      // setUser(res.data.user);
      // setToken(res.data.token);
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Return View
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.primary600} />

      <Text style={styles.headerText}>Sign in to your Account</Text>
      <Text style={styles.headerSubText}>
        Enjoy special offers and reliable services.
      </Text>

      {/* Registration Form Fields */}

      {/* Email Address  */}
      <View style={[styles.inputBound, { marginTop: 30 }]}>
        <Text style={styles.inputLabel}>Email Address:</Text>
        <CustomTextInput
          value={userData.email}
          setValue={(text: string) =>
            setUserData((prev) => ({ ...prev, email: text }))
          }
          keyBoardType="email-address"
          returnType={"next"}
          bgColor={Colors.secondary600}
          children={<Ionicons name="mail" size={24} color={Colors.textGray} />}
        />
      </View>

      {/* Password Input  */}
      <View style={styles.inputBound}>
        <Text style={styles.inputLabel}>Password:</Text>
        <CustomPasswordInput
          value={userData.password}
          returnType={"done"}
          bgColor={Colors.secondary600}
          setValue={(text: string) =>
            setUserData((prev) => ({ ...prev, password: text }))
          }
          children={
            <Ionicons name="lock-closed" size={24} color={Colors.textGray} />
          }
        />
      </View>

      {/* Login button */}
      <TouchableOpacity
        onPress={() =>
          loginUser({ email: userData.email, password: userData.password })
        }
        disabled={userData.email.length === 0 || userData.password.length === 0}
        style={[
          userData.email.length !== 0 && userData.password.length !== 0
            ? styles.activeBtn
            : styles.disabledBtn,
          styles.button,
        ]}
      >
        <Text style={styles.btnText}>Sign In Now</Text>
      </TouchableOpacity>

      {/* Fingerprint call to action */}
      <Text style={[styles.fingerText, styles.actionText]}>
        Sign in using your fingerprint
      </Text>
      <TouchableOpacity onPress={handleBiometricLogin}>
        <Ionicons
          name="finger-print"
          size={80}
          color={"white"}
          style={{ textAlign: "center", marginVertical: 15 }}
        />
      </TouchableOpacity>

      {/* Forgot Password Action  */}
      <TouchableOpacity>
        <Text style={[styles.forgotPassText, styles.actionText]}>
          Forgot your password? Reset Now
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Login;

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
  activeBtn: { backgroundColor: Colors.secondaryMain },
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    width: "100%",
  },

  actionText: {
    marginTop: 15,
    textAlign: "center",
    color: "white",
    fontSize: 12,
  },

  fingerText: {},

  forgotPassText: {},
});
