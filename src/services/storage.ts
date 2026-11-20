import AsyncStorage from "@react-native-async-storage/async-storage";

export const KEYS = {
  users: "notes_app_users",
  notes: "notes_app_notes",
  session: "notes_app_session",
} as const;

export async function loadData<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (error) {
    console.warn("Failed to load", key, error);
    return fallback;
  }
}

export async function saveData<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}