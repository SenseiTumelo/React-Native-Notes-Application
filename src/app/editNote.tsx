import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useToast } from "../context/ToastContext";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotes } from "../context/NotesContext";
import { useGoBack } from "../hooks/useGoBack";
import { confirmAction } from "../utils/confirm";
import { formatDate, formatDateTime } from "../utils/format";
import NoteForm from "../components/NoteForm";

export default function EditNote() {
  const goBack = useGoBack();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { notes, editNote, removeNote } = useNotes();
    const { showToast } = useToast();

  const note = notes.find((n) => n.id === id);

  if (!note) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="mb-4 text-base text-gray-500">Note not found</Text>
        <TouchableOpacity
          onPress={goBack}
          className="rounded-full bg-navy px-8 py-3"
        >
          <Text className="font-semibold text-white">Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleDelete = async () => {
    const ok = await confirmAction(
      "Delete note",
      "This note will be permanently deleted."
    );
    if (!ok) return;

    await removeNote(note.id);
        showToast("Note deleted", "info");
    goBack();
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
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={goBack}
                className="h-12 w-12 items-center justify-center rounded-full border border-gray-200"
              >
                <Ionicons name="chevron-back" size={22} color="#1E0B4B" />
              </TouchableOpacity>
              <Text className="ml-4 text-2xl font-bold text-navy">Edit note</Text>
            </View>

            <TouchableOpacity
              onPress={handleDelete}
              className="h-12 w-12 items-center justify-center rounded-full border border-red-200"
            >
              <Ionicons name="trash-outline" size={22} color="#EF4444" />
            </TouchableOpacity>
          </View>

          <Text className="text-sm text-gray-500">
            Added {formatDate(note.createdAt)}
          </Text>
          {note.updatedAt ? (
            <Text className="text-sm text-gray-500">
              Last edited {formatDateTime(note.updatedAt)}
            </Text>
          ) : null}

          <View className="mt-6">
            <NoteForm
              initial={{
                title: note.title,
                content: note.content,
                category: note.category,
              }}
              submitLabel="Save changes"
              onSubmit={async (input) => {
                await editNote(note.id, input);
                 showToast("Note updated", "success");
                goBack();
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}