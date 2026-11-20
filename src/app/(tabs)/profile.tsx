import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-navy">Hi, {user?.username}</Text>
      <TouchableOpacity
        onPress={logout}
        className="mt-6 rounded-full bg-navy px-8 py-3"
      >
        <Text className="font-semibold text-white">Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}