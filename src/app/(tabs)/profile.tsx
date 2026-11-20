import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import AuthInput from "../../components/AuthInput";

export default function Profile() {
  const { user, logout, updateProfile } = useAuth();

  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!username.trim() || !email.trim()) {
      setError("Username and email cannot be empty");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Enter a valid email address");
      return;
    }
    if (!currentPassword) {
      setError("Enter your current password to save changes");
      return;
    }
    if (newPassword && newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirm) {
      setError("New passwords do not match");
      return;
    }

    try {
      setSaving(true);
      await updateProfile({
        username,
        email,
        currentPassword,
        newPassword: newPassword || undefined,
      });
      setSuccess("Profile updated");
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="px-6 pb-40 pt-6"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-8 items-center">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-primary">
              <Text className="text-3xl font-bold text-white">
                {user?.username.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text className="mt-3 text-2xl font-bold text-navy">
              {user?.username}
            </Text>
            <Text className="text-sm text-gray-500">{user?.email}</Text>
          </View>

          <Text className="mb-4 text-lg font-bold text-navy">Account details</Text>
          <AuthInput label="Username" value={username} onChangeText={setUsername} />
          <AuthInput
            label="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text className="mb-4 mt-2 text-lg font-bold text-navy">Password</Text>
          <AuthInput
            label="New password (leave blank to keep current)"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <AuthInput
            label="Confirm new password"
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />

          <Text className="mb-4 mt-2 text-lg font-bold text-navy">Confirm it's you</Text>
          <AuthInput
            label="Current password"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />

          {error ? (
            <Text className="mb-4 text-sm font-medium text-red-500">{error}</Text>
          ) : null}
          {success ? (
            <Text className="mb-4 text-sm font-medium text-green-600">{success}</Text>
          ) : null}

          <TouchableOpacity
            onPress={handleSave}
            disabled={saving}
            className="items-center rounded-full bg-navy py-4"
          >
            {saving ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-base font-bold text-white">Save changes</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={logout}
            className="mt-4 items-center rounded-full border border-red-200 py-4"
          >
            <Text className="text-base font-bold text-red-500">Log out</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}