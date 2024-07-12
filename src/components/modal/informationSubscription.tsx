// InformationDialog.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  StatusBar,
} from "react-native";
import CustomImage from "../ui/CustomImage";

const InformationDialogSubscription = ({
  isVisible,
  message,
  isSuccess,
  onClose,
  subscription,
  onCancel
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.5)" />
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalContent,
            isSuccess ? styles.success : styles.error,
          ]}
        >
          <CustomImage defaultImage={require("../../../assets/Icons/warning.png")} />
          <Text style={styles.modalText}>
            Tem certeza que quer inscrever produtor nesta campanha?
          </Text>
          <TouchableOpacity onPress={subscription} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Inscrever</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text className="underline" style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: StatusBar.currentHeight, // to ensure content is not hidden under status bar
  },
  modalContent: {
    backgroundColor: "white",
    padding: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    width: 300,
  },
  success: {
    borderColor: "green",
  },
  error: {
    borderColor: "red",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: "center",
    paddingBottom: 30
  },
  closeButton: {
    backgroundColor: "#5CA439",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  cancelButton: {
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  cancelButtonText: {
    color: "black",
    fontSize: 16,
    paddingTop: 15
  },
});

export default InformationDialogSubscription;
