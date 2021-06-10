import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
