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

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async () => {
    setError("");

    if (!username.trim() || !email.trim() || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setSubmitting(true);
      await register(username, email, password);
      router.replace("/login");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
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
          <Text className="text-3xl font-bold text-navy">Create account</Text>
          <Text className="mb-8 mt-2 text-base text-gray-500">
            Sign up to start keeping your notes organised.
          </Text>

          <AuthInput
            label="Username"
            placeholder="J.Snow"
            value={username}
            onChangeText={setUsername}
          />
          <AuthInput
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <AuthInput
            label="Password"
            placeholder="At least 6 characters"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <AuthInput
            label="Confirm password"
            placeholder="Repeat your password"
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />

          {error ? (
            <Text className="mb-4 text-sm font-medium text-red-500">{error}</Text>
          ) : null}

          <TouchableOpacity
            onPress={handleRegister}
            disabled={submitting}
            className="items-center rounded-full bg-navy py-4"
          >
            {submitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-base font-bold text-white">Register</Text>
            )}
          </TouchableOpacity>

          <Text className="mt-6 text-center text-gray-500">
            Already have an account?{" "}
            <Text
              className="font-bold text-primary"
              onPress={() => router.replace("/login")}
            >
              Log in
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}