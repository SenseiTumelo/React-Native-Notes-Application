import { ReactElement, useMemo, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Category } from "../types";
import { useNotes } from "../context/NotesContext";
import AddButton from "./addButton";
import { useRouter } from "expo-router";
import {
  SortOrder,
  filterByCategory,
  searchNotes,
  sortNotes,
} from "../utils/noteHelpers";
import NoteCard from "./NoteCard";

type Props = {
  category?: Category;
  header?: ReactElement;
};

export default function NotesList({ category, header }: Props) {
  const { notes, loading } = useNotes();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<SortOrder>("newest");

  const visible = useMemo(() => {
    const base = category ? filterByCategory(notes, category) : notes;
    return sortNotes(searchNotes(base, query), order);
  }, [notes, category, query, order]);

  const listHeader = (
    <View>
      {header}

      <View className="mb-4 flex-row items-center rounded-full bg-surface px-4">
        <Ionicons name="search" size={20} color="#9CA3AF" />
        <TextInput
          className="flex-1 px-3 py-4 text-base text-navy"
          placeholder="Search notes..."
          placeholderTextColor="#9CA3AF"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
        />
        {query ? (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ) : null}
      </View>

      <View className="mb-4 flex-row items-center justify-between">
        <View>
          <Text className="text-xl font-bold text-navy">
            {category ?? "All"} Notes
          </Text>
          <Text className="text-sm text-gray-500">
            {visible.length} {visible.length === 1 ? "note" : "notes"}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setOrder((o) => (o === "newest" ? "oldest" : "newest"))}
          className="flex-row items-center rounded-full bg-surface px-4 py-2"
        >
          <Ionicons
            name={order === "newest" ? "arrow-down" : "arrow-up"}
            size={16}
            color="#1E0B4B"
          />
          <Text className="ml-1 text-sm font-semibold text-navy">
            {order === "newest" ? "Newest" : "Oldest"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

    return (
    <View className="flex-1">
      <FlatList
        data={visible}
        keyExtractor={(note) => note.id}
         renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() =>
              router.push({ pathname: "/editNote", params: { id: item.id } })
            }
          />
        )}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={
          <Text className="mt-10 text-center text-gray-500">
            {loading
              ? "Loading..."
              : query
              ? "No notes match your search."
              : "No notes yet. Tap + to add one."}
          </Text>
        }
        contentContainerClassName="px-6 pt-4 pb-40"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
      <AddButton category={category} />
    </View>
  );
}