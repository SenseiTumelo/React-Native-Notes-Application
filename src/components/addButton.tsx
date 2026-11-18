import {View, StyleSheet, SafeAreaView, Pressable, Text} from 'react-native';
import { Link, Stack } from 'expo-router';

export default function AddButton() {
  return (
    < SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Add Note' }} />
        <Link href="/addNote" style={styles.button}>
            <Text style={styles.buttonText}>Add Note</Text>
        </Link>
</SafeAreaView>
  )
};

const styles = StyleSheet.create({
    container: {   
        marginTop: 20,
        
    },
    button: {
        padding: 10,
        backgroundColor: "#5bc0eb",
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});