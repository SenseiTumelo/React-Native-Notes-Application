import { SafeAreaView } from "react-native-safe-area-context";
import NotesList from "../../components/NotesList";

export default function Work() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <NotesList category="Work" />
    </SafeAreaView>
  );
}