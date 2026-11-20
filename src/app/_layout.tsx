import { Stack } from "expo-router";
import {StatusBar} from 'expo-status-bar';

export default function RootLayout() {
  return (
  <>
    <StatusBar style="auto" />
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
      <Stack.Screen name="notes" options={{ title: "Notes" }} />
      <Stack.Screen name="addNote" options={{ title: "Add Note" }} />
      <Stack.Screen name="editNote" options={{ title: "Edit Note" }} />
      <Stack.Screen name="deleteNote" options={{ title: "Delete Note" }} />
      <Stack.Screen name="not-found" options={{ title: "Not Found" }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  
  </>

  );
}
