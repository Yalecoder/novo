// TaskObservation.js
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

const TaskObservation = ({ isVisible, onClose, onSubmit }) => {
  const [textValue, setTextValue] = useState('');

  const handleTextChange = (text) => {
    setTextValue(text);
  };

  const handleSubmit = () => {
    onSubmit(textValue);
    setTextValue('');
    onClose(); // Close modal after submitting
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose} // Close modal on hardware back button press
    >
       < StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.5)" />
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButtonTop}>
          <FontAwesome5 name="times" size={24} color="#000" /> 
       
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text className='py-2 text-[1.4rem] font-normal text-[#464646]'>Observações</Text>
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={4}
              placeholder="Escreva aqui as suas obser......."
              value={textValue}
              onChangeText={handleTextChange}
              textAlignVertical="top" 
              textAlign="left" 
            />
          </ScrollView>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Concluir</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 20,
    width: '80%',
    maxHeight: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  textInput: {
    width: '100%',
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    // marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#5CA439',
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  closeButtonTop: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeButton: {
   
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  closeButtonText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline', 
  },
});

export default TaskObservation;
