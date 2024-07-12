import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import ButtonComponent from './Button';
import IconButtonComponent from './IconButtonComponent';
import FlipSvg from '../../../assets/Icons/Grupo_3870.svg'; 
import Title from './Title';
import CustomImage from './CustomImage';

const ModalComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
         
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <CustomImage
        defaultImage={require("../../../assets/Done.png")}
       
      />
            <Text style={{fontSize:20, textAlign:"center", marginBottom:30}}>Produtor adicionado com sucesso!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
     
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor:"#707070",
    opacity:0.8,
  },
  modalView: {
    
    width:300,
    height:400,
    backgroundColor: 'white',
    borderRadius: 20,
     paddingTop: 50,
    alignItems: 'center',
    alignSelf:"center",
    textAlign:"center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
   
    
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#5CA439',
    width:"80%"
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding:5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
   
  },
});

export default ModalComponent;