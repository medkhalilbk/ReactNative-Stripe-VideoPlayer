import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Layout, Text, Icon } from "@ui-kitten/components";
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

const PaymentMethodButton = ({ title, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.paymentMethod, selected && styles.paymentMethodSelected]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text
      style={[
        styles.paymentMethodText,
        selected && styles.paymentMethodTextSelected,
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const SignupScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("credit");

  return (
    <Layout style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require("@/assets/images/logo.png")}
        />

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          <MinimalistInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
          />
          <MinimalistInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
          <MinimalistInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => {
              supabase.auth
                .signUp({
                  email: email,
                  password: password,
                  options:{
                    data:{
                      fullName
                    }
                  }
                  
                })
                .then((res) => {
                  console.log(res.data)
                  console.log(res.error)
                  Toast.show({
                    type: "success",
                    text1: "Account created !",
                    text2: "You can login now",
                  });
                  router.push("/");
                })
                .catch((error) => {
                  Toast.show({
                    type: "error",
                    text1: "Something went wrong!",
                  });
                });
            }}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginLink}
            activeOpacity={0.6}
            onPress={() => {
              router.back();
            }}
          >
            <Text style={styles.loginLinkText}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 48,
  },
  formContainer: {
    width: "100%",
    maxWidth: 320,
    alignSelf: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 24,
  },
  paymentTitle: {
    marginTop: 32,
  },
  inputContainer: {
    marginBottom: 24,
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
  paymentMethodsContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  paymentMethod: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginRight: 12,
    alignItems: "center",
  },
  paymentMethodSelected: {
    backgroundColor: "#0072e9",
  },
  paymentMethodText: {
    color: "#1a1a1a",
    fontSize: 14,
    fontWeight: "500",
  },
  paymentMethodTextSelected: {
    color: "#fff",
  },
  cardDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  button: {
    backgroundColor: "#fa4a67",
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 32,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginLink: {
    marginTop: 16,
    alignItems: "center",
  },
  loginLinkText: {
    color: "#666",
    fontSize: 14,
  },
});

export default SignupScreen;
