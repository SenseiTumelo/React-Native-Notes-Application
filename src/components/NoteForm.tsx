import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Category } from "../types";
import { NoteInput } from "../services/notes";
import { CATEGORIES, CATEGORY_STYLES } from "../constants/categories";
import AuthInput from "./AuthInput";

type Props = {
  initial?: { title?: string; content: string; category: Category };
  defaultCategory?: Category;
  submitLabel: string;
  onSubmit: (input: NoteInput) => Promise<void>;
};

export default function NoteForm({
  initial,
  defaultCategory,
  submitLabel,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [category, setCategory] = useState<Category>(
    initial?.category ?? defaultCategory ?? "Personal"
  );
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError("");

    if (!content.trim()) {
      setError("Please write something in your note");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({ title, content, category });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <View>
      <AuthInput
        label="Title (optional)"
        placeholder="e.g. Sketch One UI screen"
        autoCapitalize="sentences"
        value={title}
        onChangeText={setTitle}
      />

      <AuthInput
        label="Note"
        placeholder="Write your note here..."
        autoCapitalize="sentences"
        multiline
        style={{ minHeight: 150, textAlignVertical: "top" }}
        value={content}
        onChangeText={setContent}
      />

      <Text className="mb-2 text-sm font-semibold text-navy">Category</Text>
      <View className="mb-6 flex-row">
        {CATEGORIES.map((c) => {
          const selected = c === category;
          return (
            <TouchableOpacity
              key={c}
              onPress={() => setCategory(c)}
              className={`mr-2 flex-row items-center rounded-full px-4 py-3 ${
                selected ? CATEGORY_STYLES[c].big : "bg-surface"
              }`}
            >
              <Ionicons
                name={CATEGORY_STYLES[c].icon}
                size={16}
                color={selected ? "#FFFFFF" : "#1E0B4B"}
              />
              <Text
                className={`ml-2 text-sm font-semibold ${
                  selected ? "text-white" : "text-navy"
                }`}
              >
                {c}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error ? (
        <Text className="mb-4 text-sm font-medium text-red-500">{error}</Text>
      ) : null}

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={submitting}
        className="items-center rounded-full bg-navy py-4"
      >
        {submitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-base font-bold text-white">{submitLabel}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}