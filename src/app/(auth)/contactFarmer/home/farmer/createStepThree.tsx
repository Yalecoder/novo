import React, { useState } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  Image,
  Alert,
  Modal,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import CameraComponent from "@/components/ui/CameraComponent";
import Title from "@/components/ui/Title";
import TextDividerComponent from "@/components/ui/TextDividerComponent";
import ButtonComponent from "@/components/ui/Button";
import CardComponent from "@/components/ui/Card";
import ModalComponent from "@/components/ui/ModalComponent";
import { createFarmes } from "@/database/actions/getFarmer";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import CustomImage from "@/components/ui/CustomImage";
import { useRoute } from "@react-navigation/native";
import { marketStore } from "@/context/zustand";
import InformationDialog from "@/components/modal/InformationDialog";

const createStepThree = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const { push } = useRouter();
  // const { data } = useLocalSearchParams()
  const route = useRoute();
  const { data } = route.params;
  const farmerData = JSON.parse(data);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const [market] = marketStore((state) => [state.market]);

  console.log({ market });

  const onSubmit = (data) => {};

  function formatDate(dateString) {
    const date = new Date(dateString);

    const dateFormatted = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);

    return dateFormatted;
  }
  const handleFormSubmit = () => {
    push("home");
  };

  const showModal = (message, success) => {
    setModalMessage(message);
    setIsSuccess(success);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    push("../../(tabs)");
  };

  async function addFarmer() {
    let data = farmerData;
    data.id = String(new Date().getTime());
    try {
      const data = await createFarmes({ ...farmerData, market });

      showModal("Produtor adicionado com sucesso!", isSuccess);

      console.log("Created", data);
    } catch (error) {
      console.log("Error on create", error);
    }
  }

  return (
    <View className="h-full">
      <InformationDialog
        isVisible={isModalVisible}
        message={modalMessage}
        isSuccess={isSuccess}
        onClose={hideModal}
      />

      <ScrollView>
        <View className="p-5 mb-3">
          <Title
            text="Verifica se os dados do novo produtor estão correctos."
            className="mt-4 pr-40 text-[.8rem] font-bold"
          />
          <View
            style={{
              padding: "12%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              className="rounded-sm"
              source={{ uri: "data:image/png;base64," + farmerData?.photo }}
              style={{ height: 180, width: 180 }}
              resizeMode="cover"
            />
          </View>

          <TextDividerComponent label="Nome" text={farmerData?.name} />
          <TextDividerComponent
            label="Referência"
            text={farmerData?.reference}
          />
          <TextDividerComponent
            label="Data de Nascimento"
            text={formatDate(farmerData?.birthDate)}
          />
          <TextDividerComponent
            label="Telemóvel"
            text={farmerData?.cellphone}
          />
          <TextDividerComponent
            label="PGR"
            text={farmerData?.pgr == "yes" ? "Sim" : "Nao"}
          />
          <TextDividerComponent
            label="Produtor de Alto Risco"
            text={farmerData?.high_risk_farmer == "yes" ? "Sim" : "Nao"}
          />
          <View style={{ borderTopWidth: 1, borderColor: "lightgray" }}></View>

          <ButtonComponent
            className="mt-10 bg-[#5CA439]"
            title="Gravar Novo Produtor"
            action={() => {
              addFarmer();
              setModalVisible(true);
            }}
          />

          <ButtonComponent
            titleClass="text-[#5CA439] font-normal"
            className="mt-6 border-[#5CA439]  border-2"
            title="Voltar"
            action={() => {}}
          />

          {/* <ModalComponent modalVisible={modalVisible}  /> */}
        </View>

        {/* <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <CustomImage
                  defaultImage={require("../../../../../../assets/Done.png")}
                />
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    marginBottom: 30,
                  }}
                >
                  Produtor adicionado com sucesso!
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    push("../../(tabs)");
                  }}
                >
                  <Text style={styles.textStyle}>Ok</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default createStepThree;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#707070",
    opacity: 0.8,
  },
  modalView: {
    width: 300,
    height: 400,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 50,
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    shadowColor: "#000",
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
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#5CA439",
    width: "80%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
