import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
import Toast from "react-native-toast-message";

const MinimalistInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#999"
      secureTextEntry={secureTextEntry}
    />
    <View style={styles.inputUnderline} />
  </View>
);

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  function validateCredentials() {
    supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then((res) => {
        if (res.error?.message) {
          Toast.show({
            type: "error",
            text1: "Invalid Credentials",
            text2: res.error?.message,
            autoHide: false,
          });
          return
        }
        console.log("user data ***" , res.data.user)
        router.push("/dashboard");
      });
  }

  return (
    <Layout style={styles.container}>
      <View style={styles.contentWrapper}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require("@/assets/images/logo.png")}
        />
        {error && <Text status="danger">{error}</Text>}
        <View style={styles.formContainer}>
          <MinimalistInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            secureTextEntry={undefined}
          />
          <MinimalistInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#fa4a67" }]}
            activeOpacity={0.8}
            onPress={() => {
              validateCredentials();
            }}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/signup");
            }}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logo: {
    width: 400,
    height: 120,
    marginBottom: 48,
  },
  formContainer: {
    width: "100%",
    maxWidth: 320,
  },
  inputContainer: {
    marginBottom: 32,
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 0,
    color: "#1a1a1a",
    width: "100%",
  },
  inputUnderline: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#0072e9",
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default App;
