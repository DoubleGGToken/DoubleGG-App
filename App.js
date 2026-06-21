import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DOUBLEGG</Text>
      <Text style={styles.sub}>Coming Soon 🚀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#080808', justifyContent:'center', alignItems:'center' },
  text: { fontSize:36, fontWeight:'900', color:'#FFD700' },
  sub: { fontSize:16, color:'#888', marginTop:10 },
});
