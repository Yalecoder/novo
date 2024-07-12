// NoResultsComponent.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoResultsComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nenhum resultado encontrado. Tente uma pesquisa diferente.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  text: {
    color: 'red',
    fontSize: 16,
  },
});

export default NoResultsComponent;
