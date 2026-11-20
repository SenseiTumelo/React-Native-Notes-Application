import {View, StyleSheet, SafeAreaView} from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFound() {
  return (
    < SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Oops!' }} />
        <Link href="/" style={styles.button}>
            Go back to Home screen
        </Link>
</SafeAreaView>
  )
};

const styles = StyleSheet.create({
    container: {   
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c3423f',
        height: '100%',
     },  
     button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
     },

});