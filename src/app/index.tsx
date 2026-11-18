import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import AddButton  from "../components/addButton";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is the Index file inside the app directory.</Text>
      <Link href="/addNote" style={styles.button}>
        <Text style={styles.buttonText}>Create your first note</Text>
      </Link>
      <AddButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#5bc0eb",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
