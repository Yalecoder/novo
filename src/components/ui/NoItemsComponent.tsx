// NoItemsComponent.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoItemsComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sem Dados. Tente sincronizar o dispositivo!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
});

export default NoItemsComponent;
