// import CardComponent from "@/components/ChipComponentui/Card";
// import ChipComponent from "@/components/";

import IconButtonComponent from "@/components/ui/IconButtonComponent";
// import Title from "@/components/ui/Title";
import { Button, ScrollView, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { useRouter, useNavigation, router } from "expo-router";
import FlipSvg from "../../../../../assets/Icons/Grupo_3855.svg";
// import CardComponent from "@/components/ui/Card";
// import Title from "@/components/ui/Title";
import { marketStore, setFamerId, useDefaultStore } from "@/context/zustand";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getData } from "@/database/actions/getFarmer";
import ChipComponent from "@/components/ui/ChipComponent";
import CardComponent from "@/components/ui/Card";
import Title from "@/components/ui/Title";
import { StatusBar } from "expo-status-bar";

export default function IndexTopTabs() {
  const [updateTab] = useDefaultStore((state) => [state.setTab]);
  const [market] = marketStore((state) => [state.market]);
  const [setId] = setFamerId((state) => [state.setFarmerId]);

  const isFocused = useIsFocused();

  const { push } = useRouter();
  // const [farmersList, setFarmersList] = useState();
  const [farmersList, setFarmersList] = useState([
    { id: 1, label: "Chip 1 sdfsdfsdfs ", icon: "information" },
    { id: 2, label: "Chip 2  ", icon: "information" },
    { id: 3, label: "Chip 3  ", icon: "information" },
    { id: 4, label: "Chip 4 sdfsdfsdfs" },
  ]);

  const chipTopData = [{ id: 1, label: "8 dados por preencher " }];

  const chipData = [
    { id: 1, label: "Chip 1 sdfsdfsdfs ", icon: "information" },
    { id: 2, label: "Chip 2  ", icon: "information" },
    { id: 3, label: "Chip 3  ", icon: "information" },
    { id: 4, label: "Chip 4 sdfsdfsdfs" },
  ];

  async function fetchData() {
    const data = await getData(market);

    setFarmersList(data);
  }

  useEffect(() => {
    if (isFocused) {
      console.log("#-----------  farmars");
      updateTab("farmars");
    }

    fetchData();
  }, [isFocused]);

  return (
    <View>
      <StatusBar backgroundColor="#5CA439" style="" />
      <ScrollView className="p-5">
        <View style={styles.topContainer}>
          <Title
            text="Todos Produtores"
            className="py-3 text-[1.2rem] font-bold"
          />

          <IconButtonComponent
            svg={FlipSvg}
            iconSize={14}
            border={0}
            borderColor="transparent"
            color="#000"
            action={() => {}}
            size={20}
          />
        </View>

        <View style={{ marginBottom: 50 }}>
          {farmersList?.map((chip, index) => (
            <CardComponent
              action={() => {
                setId({ farmerId: chip?.id, farmerName: chip?.name });
                push({
                  pathname: `../home/farmer/${chip?.id}`,
                  params: {
                    birthDate: chip?.birthDate,
                    cellphone: chip?.cellphone,
                    high_risk_farmer: chip?.high_risk_farmer,
                    name: chip?.name,
                    project: chip?.project,
                    reference: chip?.reference,
                  },
                });
              }}
              key={index}
              className="h-max bg-[#fff] mt-2 mb-6"
            >
              <ChipComponent
                chipData={chipTopData}
                color="#F2F2F2"
                textColor="#000000"
              />
              <Title
                text={chip?.name}
                className="py-2 text-[1.2rem] font-bold"
              />
              <Title
                text={chip?.reference}
                className="text-[.9rem] font-normal"
              />
              <Title
                text="Dados Preenchidos"
                className="py-3 text-[.9rem] font-bold"
              />
              <ChipComponent
                chipData={chipData}
                color="#000000"
                textColor="#FFFFFF"
              />
            </CardComponent>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
