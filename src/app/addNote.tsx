import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotes } from "../context/NotesContext";
import { CATEGORIES } from "../constants/categories";
import NoteForm from "../components/NoteForm";

export default function AddNote() {
  const router = useRouter();
  const { addNote } = useNotes();
  const { category } = useLocalSearchParams<{ category?: string }>();

  const defaultCategory = CATEGORIES.find((c) => c === category);
    const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="px-6 pb-10 pt-4"
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-6 flex-row items-center">
            <TouchableOpacity
              onPress={goBack}
              className="h-12 w-12 items-center justify-center rounded-full border border-gray-200"
            >
              <Ionicons name="chevron-back" size={22} color="#1E0B4B" />
            </TouchableOpacity>
            <Text className="ml-4 text-2xl font-bold text-navy">New note</Text>
          </View>

          <NoteForm
            submitLabel="Save note"
            defaultCategory={defaultCategory}
onSubmit={async (input) => {
  await addNote(input);
  goBack();
}}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}