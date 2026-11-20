import { View, Text, TouchableOpacity } from "react-native";
import { Note } from "../types";
import { CATEGORY_STYLES } from "../constants/categories";
import { formatDate, formatDateTime } from "../utils/format";

type Props = {
  note: Note;
  onPress?: () => void;
};

export default function NoteCard({ note, onPress }: Props) {
  const style = CATEGORY_STYLES[note.category];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`mb-4 rounded-3xl p-4 ${style.card}`}
    >
      <Text className="text-lg font-bold text-navy" numberOfLines={1}>
        {note.title || "Untitled note"}
      </Text>
      <Text className="mt-1 text-sm text-gray-600" numberOfLines={2}>
        {note.content}
      </Text>

      <View className="mt-3 flex-row flex-wrap">
        <View className="mr-2 rounded-lg bg-white/70 px-2 py-1">
          <Text className="text-xs font-semibold text-navy">
            {formatDate(note.createdAt)}
          </Text>
        </View>
        <View className={`rounded-lg px-2 py-1 ${style.tag}`}>
          <Text className="text-xs font-semibold text-white">{note.category}</Text>
        </View>
      </View>

      {note.updatedAt ? (
        <Text className="mt-2 text-xs text-gray-500">
          Edited {formatDateTime(note.updatedAt)}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}