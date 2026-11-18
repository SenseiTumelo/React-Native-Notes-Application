import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
      <Stack.Screen name="notes" options={{ title: "Notes" }} />
      <Stack.Screen name="addNote" options={{ title: "Add Note" }} />
      <Stack.Screen name="editNote" options={{ title: "Edit Note" }} />
      <Stack.Screen name="deleteNote" options={{ title: "Delete Note" }} />
      <Stack.Screen name="not-found" options={{ title: "Not Found" }} />
    </Stack>
  );
}
