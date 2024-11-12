import Button from "@/components/form/Button";
import { Colors } from "@/constants/Colors";
import { useAppStore, useSessionStore, useUserStore } from "@/store";
import {
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  // Clear the token and user
  const clearToken = useSessionStore((state) => state.clearToken);
  const clearUser = useUserStore((state) => state.clearUser);
  const setIsLoading = useAppStore((state) => state.setIsLoading);

  // Handle Login = Clear token from user's auth field in DB
  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      setTimeout(() => setIsLoading(false), 2000);
    } catch (error) {
    } finally {
      clearToken();
      clearUser();
    }
  };

  // Return JSX to View
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Profile Screen</Text>

      <TouchableOpacity onPress={handleLogOut} style={styles.button}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },

  heading: {
    textAlign: "center",
  },

  button: {
    backgroundColor: Colors.primary600,
    width: "50%",
    marginHorizontal: "auto",
    padding: 15,
    borderRadius: 15,
  },

  buttonText: {
    textAlign: "center",
    fontFamily: "PoppinsBold",
    fontSize: 15,
    color: Colors.white,
  },
});
