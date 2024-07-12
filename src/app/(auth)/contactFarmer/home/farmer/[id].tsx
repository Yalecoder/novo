import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, Fragment, useEffect } from "react";
import { Button, ScrollView, StyleSheet, FlatList } from "react-native";
import Title from "@/components/ui/Title";
import { Chip } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cn } from "@/utils/utlis";

import { useRouter, useGlobalSearchParams } from "expo-router";
import CardComponent from "@/components/ui/Card";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from "react-native-vector-icons/Entypo";
import { StatusBar } from "expo-status-bar";
import { JSFIcons } from "../../../../../../assets/Icons";
import {
  FamerSubscription,
  getFarmerAreaData,
  getOneFarmerBiometric,
  getSubscriptionFarmer,
} from "@/database/actions/getFarmer";
import * as turf from "@turf/turf";
import { useIsFocused } from "@react-navigation/native";
import { marketStore } from "@/context/zustand";
import InformationDialog from "@/components/modal/InformationDialog";
import InformationDialogSubscription from "@/components/modal/informationSubscription";

interface subItemProps {
  title: string;
  value: string;
}

interface itemProps {
  id: string;
  key: number;
  title: string;
  icon: any;
  listItens: subItemProps[];
  className: string;
  color: string;
  route: () => void;
}

function Item({
  listItens,
  icon,
  className,
  title,
  color,
  keyValue,
  route,
}: itemProps) {
  return (
    <View className="mr-5">
      <CardComponent
        className={cn(
          `bg-[${
            keyValue === 0 ? color : color
          }] p-5 mr-5 flex justify-between `,
          className
        )}
      >
        <View className="flex-row items-center">
          {icon}
          <Title text={title} className="font-normal text-white ml-1" />
        </View>
        <Fragment>
          <TouchableOpacity onPress={route}>
            <View className="mb-2">
              <Title
                text="Ver questionário completo"
                className="text-white text-[1rem] font-normal underline"
              />
            </View>
          </TouchableOpacity>
        </Fragment>
      </CardComponent>
    </View>
  );
}

function SeedItem({ listItens, icon, className, title }: itemProps) {
  return (
    <View>
      <CardComponent
        className={cn("bg-[#668856] p-5 mr-5 flex justify-between ", className)}
      >
        <View className="flex-row justify-between items-center">
          <Title text={title} className="font-bold text-white text-[1.2rem]" />
          <Text className="font-bold text-white text-[0.8rem] underline opacity-70">
            Ver detalhes
          </Text>
        </View>
        <Fragment>
          {listItens?.map((item, index) => {
            const [date, time] = item.value.split(",");

            return (
              <View key={index} className="mt-2">
                <Text className="text-[1.1rem] text-white mr-5 font-normal">
                  {item.title}
                </Text>
                <Title
                  text={date}
                  className="text-white text-[1rem] font-normal py-7 pb-0"
                />
                <Title
                  text={time}
                  className="text-white text-[1rem] font-normal"
                />
                <View className="py-7">
                  <Title
                    text="Produto + Quantidade"
                    className="text-white text-[-1.2rem]"
                  />
                  <Title
                    text="Algodão 1 | 4 Kgs"
                    className="text-white text-[-1.2rem]"
                  />
                </View>
              </View>
            );
          })}
        </Fragment>
      </CardComponent>
    </View>
  );
}

function SeedItemGray({ listItens, icon, className, title }: itemProps) {
  return (
    <View>
      <CardComponent
        className={cn("bg-[#F9F1F1] p-5 mr-5 flex justify-between ", className)}
      >
        <View className="flex-row justify-between items-center">
          <Title
            text={title}
            className="font-bold text-[#000000] text-[1.2rem]"
          />

          <Text className="font-bold text-[#000000] text-[0.8rem] underline opacity-70">
            Ver detalhes
          </Text>
        </View>
        <Fragment>
          {listItens?.map((item, index) => {
            const [date, time] = item.value.split(",");

            return (
              <View key={index} className="mt-2 opacity-70">
                <Text className="text-[1.1rem] text-[#000000]  mr-5 font-normal">
                  {item.title}
                </Text>
                <Title
                  text={date}
                  className="text=[#000000] text-[1rem] font-normal py-7 pb-0"
                />
                <Title
                  text={time}
                  className="text-[#000000] text-[1rem] font-normal"
                />
                <View className="py-7">
                  <Title
                    text="Produto + Quantidade"
                    className="text-[#000000] text-[-1.2rem]"
                  />
                  <Title
                    text="Algodão 1 | 4 Kgs"
                    className="text-[#000000] text-[-1.2rem]"
                  />
                </View>
              </View>
            );
          })}
        </Fragment>
      </CardComponent>
    </View>
  );
}

export default function FarmerId() {
  const { push } = useRouter();
  const {
    id,
    birthDate,
    cellphone,
    high_risk_farmer,
    name,
    project,
    reference,
  } = useGlobalSearchParams();

  const [farmerAreas, setFarmerAreas] = useState([]);
  const isFocused = useIsFocused();
  const [isSubscriptionModalVisible, setSubscriptionModalVisible] =
    useState(false);
  const [modalSubscriptionMessage, setSubscriptionModalMessage] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [haveBiometric, setHaveBiometric] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState(false);
  const [refresh, setRefreshPage] = useState(false);

  const hideModal = () => {
    setSubscriptionModalVisible(false);
  };

  const hideModal2 = () => {
    setModalVisible(false);
  };

  const showModal = (message, success) => {
    setModalMessage(message);
    setIsSuccess(success);
    setModalVisible(true);
  };

  const [market] = marketStore((state) => [state.market]);

  const deserializeArray = (jsonString) => JSON.parse(jsonString);

  async function fetchArea() {
    try {
      const farmerArea = await getFarmerAreaData(id);

      const updatedFarmerArea = farmerArea
        ?.map((item, index) => {
          const serial = deserializeArray(item.coordinates);
          // Filtra coordenadas inválidas
          const validCoordinates = serial.filter(
            (coord) =>
              typeof coord.longitude === "number" &&
              typeof coord.latitude === "number"
          );

          if (validCoordinates.length < 3) {
            return item; // Skip items with less than 3 valid coordinates
          }

          // Converta as coordenadas para o formato GeoJSON
          const geoJsonCoordinates = validCoordinates.map((coord) => [
            coord.longitude,
            coord.latitude,
          ]);

          // Feche o polígono adicionando o primeiro ponto no final
          geoJsonCoordinates.push(geoJsonCoordinates[0]);

          // Crie o polígono usando turf
          const polygon = turf.polygon([geoJsonCoordinates]);

          // Calcule a área do polígono em metros quadrados usando turf
          const area = turf.area(polygon);

          // Retorne o item atualizado com a área calculada
          return {
            ...item,
            calculatedArea: area?.toFixed(0),
          };
        })
        .filter((item) => item !== null); // Remove itens nulos do resultado

      setFarmerAreas(updatedFarmerArea);
      return updatedFarmerArea;
    } catch (error) {
      console.error("Error fetching or processing farmer area data:", error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  }

  async function fetchBiometric() {
    try {
      const data = await getOneFarmerBiometric(id);

      setHaveBiometric(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchSubscription() {
    try {
      const data = await getSubscriptionFarmer(id);

      console.log("subscricao", data);

      setSubscriptionData(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchArea();
    fetchBiometric();
    fetchSubscription();
  }, [isFocused, refresh]);

  async function Subscription() {
    try {
      const response = FamerSubscription(id);

      console.log("presessss");
      hideModal();

      showModal("Produtor Inscrito com sucesso!", true);

      setRefreshPage(true);

      console.log("subscription", { response });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const [seedData, setDataSeed] = useState<itemProps[]>([
    {
      id: "1",
      icon: <JSFIcons.fam width={30} />,
      title: "Família",
      color: "#668856",
      route: { pathname: `./familyList` },
      listItens: [
        {
          title: "Agregado Familiar",
          value: "4",
        },
        {
          title: "Casa Melhorada",
          value: "sim",
        },
      ],
    },
    {
      id: "2",
      icon: <JSFIcons.camp width={30} />,
      title: "Campanha",
      color: "#668856",
      route: "./(tabs)",
      listItens: [
        {
          title: "Algodão Estimativa(ha)",
          value: "1",
        },
        {
          title: "Homens Permanentes",
          value: "27",
        },
      ],
    },
  ]);

  const [deliveryData, setDeliverySeed] = useState<itemProps[]>([
    {
      id: "1",
      icon: <MaterialCommunityIcons name="seed" size={24} color="#fff" />,
      title: "Referência",
      color: "#5E6A59",
      listItens: [
        {
          title: "23498249.2349298429",
          value: "6 de Abrirl de 2024, às 14:34:52",
        },
      ],
    },
    {
      id: "2",
      icon: <MaterialCommunityIcons name="seed" size={24} color="#fff" />,
      title: "Referência",
      color: "#668856",
      listItens: [
        {
          title: "23498249.2349298429",
          value: "6 de Abrirl de 2024, às 14:34:52",
        },
      ],
    },
  ]);

  const [deliveryDevolutionData, setDeliveryDevolutionSeed] = useState<
    itemProps[]
  >([
    {
      id: "1",
      icon: <MaterialCommunityIcons name="seed" size={24} color="#fff" />,
      title: "Referência",
      color: "#5E6A59",
      listItens: [
        {
          title: "23498249.2349298429",
          value: "6 de Abrirl de 2024, às 14:34:52",
        },
      ],
    },
    {
      id: "2",
      icon: <MaterialCommunityIcons name="seed" size={24} color="#fff" />,
      title: "Referência",
      color: "#668856",
      listItens: [
        {
          title: "23498249.2349298429",
          value: "6 de Abrirl de 2024, às 14:34:52",
        },
      ],
    },
  ]);

  return (
    <View>
      <InformationDialogSubscription
        isVisible={isSubscriptionModalVisible}
        message={modalSubscriptionMessage}
        isSuccess={true}
        subscription={Subscription}
        onCancel={hideModal}
      />
      <InformationDialog
        isVisible={isModalVisible}
        message={modalMessage}
        isSuccess={isSuccess}
        onClose={hideModal2}
      />
      <StatusBar backgroundColor="#5CA439" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        style={{ backgroundColor: "whitesmoke" }}
      >
        {/* Farmer Profile Card */}

        <View className="flex-1 mb-14 p-5">
          <Title
            text="Perfil do Produtor"
            className="mb-4 font-semibold text-[20px]"
          />
          <View className="">
            <CardComponent
              className={cn("bg-[#5CA439] p-5  flex justify-between ")}
            >
              <View className="flex-row items-center">
                <Title text={name} className="font-normal text-white" />
              </View>
              <Fragment>
                <View>
                  <Text className="text-[1.2rem] text-white mr-5 font-bold">
                    Referência
                  </Text>
                  <Title
                    text={reference}
                    className="text-white font-normal text-[1rem]"
                  />
                </View>
                <View className="pb-2">
                  <Text className="text-[1.2rem] text-white mr-5 font-bold">
                    Telefone
                  </Text>
                  <Title
                    text={cellphone}
                    className="text-white font-normal text-[1rem]"
                  />
                </View>
                <View>
                  <Text className="text-[1.2rem] text-white mr-5 font-bold">
                    Inscrição
                  </Text>
                  <View style={styles.chipContainerWhite}>
                    <Chip
                      key={990}
                      onPress={() => {
                        setSubscriptionModalVisible(true);
                      }}
                      style={styles.chipWhite}
                      textStyle={{ color: "#5CA439", fontSize: 12, padding: 4 }}
                      disabled={subscriptionData?.farmerId ? true : false}
                    >
                      {subscriptionData?.farmerId
                        ? "Inscrito"
                        : "Adicionar Inscrição"}
                    </Chip>
                  </View>
                </View>
                {subscriptionData?.farmerId ? (
                  <>
                    <View>
                      <Text className="text-[1.2rem] text-white mr-5 font-bold">
                        Biométrico
                      </Text>
                      <View style={styles.chipContainerWhite}>
                        <Chip
                          key={990}
                          onPress={() => {
                            push({
                              pathname: "../farmer/biometry",
                              params: { farmerId: id },
                            });
                          }}
                          style={styles.chipWhite}
                          textStyle={{
                            color: "#5CA439",
                            fontSize: 12,
                            padding: 4,
                          }}
                          disabled={haveBiometric?.biometric ? true : false}
                        >
                          {haveBiometric?.biometric
                            ? "Biométria adicionada"
                            : "+ Adicionar Registo"}
                        </Chip>
                      </View>
                    </View>
                  </>
                ) : (
                  <></>
                )}
                <View>
                  <Title
                    text="Ver perfil completo"
                    className="py-8 text-white text-[1rem] font-normal underline"
                  />
                </View>
              </Fragment>
            </CardComponent>
          </View>
        </View>
        {subscriptionData?.farmerId ? (
          <>
            {/* Questionarios Scrollview */}
            <View className="flex-1 mt-5 pl-5">
              <Title
                text={"Questionários"}
                className="mb-3 font-semibold text-[20px] "
              />
              <FlatList
                horizontal
                data={seedData}
                renderItem={(index) => (
                  <Item
                    key={index?.index}
                    title={index?.item?.title}
                    listItens={index?.item?.listItens}
                    icon={index?.item?.icon}
                    color={index?.item?.color}
                    keyValue={index?.index}
                    route={() => push(index?.item?.route)}
                  />
                )}
                keyExtractor={(item) => item.id}
                className="pb-4"
                showsHorizontalScrollIndicator={false}
              />
            </View>
            {/* Areas */}
            <View className="flex-1 mb-5 mt-6 p-5">
              <Title text="Áreas" className="mb-2 font-semibold text-[20px]" />
              {farmerAreas?.map((item, index) => (
                <View className=" h-[5.5rem] mb-5" key={index}>
                  <CardComponent
                    className={cn(
                      " bg-[#fff] p-5  flex flex-row justify-between "
                    )}
                  >
                    <Fragment>
                      <View>
                        <Text className="text-[1.2rem] text-black mr-5 font-bold">
                          Cultura
                        </Text>
                        <Title
                          text={item?.cultureType}
                          className="text-black font-normal text-[1rem]"
                        />
                      </View>
                      <View>
                        <Text className="text-[1.2rem] text-black mr-5 font-bold">
                          Área
                        </Text>
                        <Title
                          text={`${
                            item?.calculatedArea != undefined
                              ? item?.calculatedArea
                              : 0
                          } m²`}
                          className="text-black font-normal text-[1rem]"
                        />
                      </View>

                      <View>
                        <TouchableOpacity
                          onPress={() =>
                            push({
                              pathname: "../farmer/areaDetails",
                              params: {
                                cultureType: item?.cultureType,
                                area:
                                  item?.calculatedArea != undefined
                                    ? item?.calculatedArea
                                    : 0,
                                points: item?.coordinates,
                                observation: item?.observation,
                                coordinates: item?.coordinates,
                              },
                            })
                          }
                        >
                          <Title
                            text="Ver Detalhe"
                            className="py-2 text-black text-[1rem] font-normal underline"
                          />
                        </TouchableOpacity>
                      </View>
                    </Fragment>
                  </CardComponent>
                </View>
              ))}

              <View style={styles.chipContainerCenter} className="text-center ">
                <Chip
                  key={990}
                  onPress={() =>
                    push({
                      pathname: "../farmer/markArea",
                      params: { farmerId: id },
                    })
                  }
                  style={styles.chip}
                  textStyle={{ color: "#fff", fontSize: 12, padding: 4 }}
                >
                  + Adicionar Área
                </Chip>
              </View>
            </View>
            {/* Seeds transations Scrollview*/}
            <View className="p-5">
              <Title
                text={"Transação"}
                className="mb-8 font-semibold text-[20px] "
              />
              <Title
                text={"Entregues"}
                className="mb-4 font-semibold text-[20px] "
              />
              <View>
                {deliveryData.map((item) => {
                  return (
                    <SeedItem
                      key={item.index}
                      title={item.title}
                      listItens={item.listItens}
                      icon={item.icon}
                      className="h-60 mb-5"
                    />
                  );
                })}
              </View>
              <View style={styles.chipContainer} className="text-center ">
                <Chip
                  key={990}
                  onPress={() => console.log(" pressed")}
                  style={styles.chip}
                  textStyle={{ color: "#fff", fontSize: 12, padding: 4 }}
                >
                  Entregar Produto
                </Chip>
              </View>
            </View>
            {/* Devolvidas */}
            <View className="flex-1 mt-5 p-5">
              <Title
                text={"Devolvidas"}
                className="mb-3 font-semibold text-[20px] "
              />
              <View>
                {deliveryDevolutionData.map((item) => {
                  return (
                    <SeedItemGray
                      key={item.index}
                      title={item.title}
                      listItens={item.listItens}
                      icon={item.icon}
                      className="h-60 mb-5"
                    />
                  );
                })}
              </View>

              <View style={styles.chipContainer} className="text-center ">
                <Chip
                  key={990}
                  onPress={() => console.log(" pressed")}
                  style={styles.chip}
                  textStyle={{ color: "#fff", fontSize: 12, padding: 4 }}
                >
                  Devolver Sementes
                </Chip>
              </View>
            </View>
          </>
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  chipContainer: {
    alignSelf: "flex-start",
    marginVertical: 20,
  },
  chipContainerWhite: {
    alignSelf: "flex-start",
    marginVertical: 5,
  },
  chipContainerCenter: {
    alignSelf: "center",
    marginVertical: 20,
  },
  chip: {
    backgroundColor: "#5CA439",
    borderRadius: 60,
  },
  chipWhite: {
    backgroundColor: "#fff",
    borderRadius: 60,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
