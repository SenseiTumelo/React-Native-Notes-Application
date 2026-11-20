import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { useNotes } from "../../context/NotesContext";
import NotesList from "../../components/NotesList";
import { CATEGORIES, CATEGORY_STYLES } from "../../constants/categories";

export default function Home() {
  const { user } = useAuth();
  const { notes } = useNotes();
  const router = useRouter();

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const header = (
    <View className="mb-6">
      <View className="mb-6 flex-row items-center">
        <View className="h-12 w-12 items-center justify-center rounded-full bg-primary">
          <Text className="text-lg font-bold text-white">
            {user?.username.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text className="ml-3 text-base font-semibold text-navy">
          Hi, {user?.username} 👋
        </Text>
      </View>

      <Text className="text-3xl font-bold text-navy">My Notes</Text>
      <Text className="mb-5 mt-1 text-sm text-gray-500">Today, {today}</Text>

      <View className="flex-row justify-between">
        {CATEGORIES.map((category) => {
          const style = CATEGORY_STYLES[category];
          const count = notes.filter((n) => n.category === category).length;

          return (
            <TouchableOpacity
              key={category}
              onPress={() => router.push(style.route)}
              className={`w-[31%] rounded-3xl p-4 ${style.big}`}
            >
              <View className="mb-6 h-8 w-8 items-center justify-center rounded-full bg-white/30">
                <Ionicons name={style.icon} size={18} color="#FFFFFF" />
              </View>
              <Text className="text-base font-bold text-white">{category}</Text>
              <Text className="text-xs text-white/80">
                {count} {count === 1 ? "note" : "notes"}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <NotesList header={header} />
    </SafeAreaView>
  );
}