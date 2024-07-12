import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { RadioButton, RadioButtonGroup } from 'react-native-paper';
import { Entypo } from 'react-native-vector-icons';

const TaskState = ({ isVisible, onClose, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onSubmit(selectedOption);
      setSelectedOption(null);
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.5)" />
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Entypo name="cross" size={24} color="#000" />
          </TouchableOpacity>
          <Text className='py-2 text-[1.4rem] font-normal text-[#464646]'>Alterar estado da tarefa</Text>
          <RadioButton.Group onValueChange={handleOptionChange} value={selectedOption}>
            <TouchableOpacity style={styles.option} onPress={() => handleOptionChange(1)}>
              <RadioButton value={1} />
              <Text style={styles.optionText}>Em Progresso</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => handleOptionChange(2)}>
              <RadioButton value={2} />
              <Text style={styles.optionText}>Interrompida</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => handleOptionChange(3)}>
              <RadioButton value={3} />
              <Text style={styles.optionText}>Não Concluída</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => handleOptionChange(4)}>
              <RadioButton value={4} />
              <Text style={styles.optionText}>Concluída</Text>
            </TouchableOpacity>
          </RadioButton.Group>

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Actualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center', // Align modal content to the top
    paddingTop: StatusBar.currentHeight || 20, // Ensure modal content overlaps status bar
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 20,
    width: '80%',
    marginLeft: '10%', // Align content to the left
    marginTop: 20, // Adjust as needed
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#5CA439',
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  cancelButton: {

    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginTop: 10,
  },
  cancelButtonText: {

    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline', 
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default TaskState;
