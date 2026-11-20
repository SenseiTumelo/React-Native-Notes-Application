import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthInput from "../components/AuthInput";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password");
      return;
    }

    try {
      setSubmitting(true);
      await login(email, password);
      showToast("Welcome back ", "success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="px-6 pb-10 pt-8"
          keyboardShouldPersistTaps="handled"
        >
          <Text className="text-3xl font-bold text-navy">Welcome back</Text>
          <Text className="mb-8 mt-2 text-base text-gray-500">
            Log in to see your notes.
          </Text>

          <AuthInput
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <AuthInput
            label="Password"
            placeholder="Your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {error ? (
            <Text className="mb-4 text-sm font-medium text-red-500">{error}</Text>
          ) : null}

          <TouchableOpacity
            onPress={handleLogin}
            disabled={submitting}
            className="items-center rounded-full bg-navy py-4"
          >
            {submitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-base font-bold text-white">Log in</Text>
            )}
          </TouchableOpacity>

          <Text className="mt-6 text-center text-gray-500">
            New here?{" "}
            <Text
              className="font-bold text-primary"
              onPress={() => router.replace("/register")}
            >
              Create an account
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}