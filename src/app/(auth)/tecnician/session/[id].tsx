// import CardComponent from "@/components/ChipComponentui/Card";
// import ChipComponent from "@/components/";

import IconButtonComponent from "@/components/ui/IconButtonComponent";
// import Title from "@/components/ui/Title";
import {
  Button,
  FlatList,
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View, Text } from "react-native";
import { useRouter, useNavigation, router } from "expo-router";
import Search from "../../../../../assets/Icons/search-24px.svg";
// import CardComponent from "@/components/ui/Card";
// import Title from "@/components/ui/Title";
import { useDefaultStore } from "@/context/zustand";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getData } from "@/database/actions/getFarmer";
import ChipComponent from "@/components/ui/ChipComponent";
import CardComponent from "@/components/ui/Card";
import Title from "@/components/ui/Title";
import { StatusBar } from "expo-status-bar";
import { Chip, IconButton } from "react-native-paper";
import { JSFIcons } from "../../../../../assets/Icons";

export default function SessionId() {
  const data = [
    { id: "1", title: "Mercado Boane" },
    { id: "2", title: "Mercado de Xipamanine" },
    { id: "3", title: "Mercado Magude" },
    { id: "4", title: "Mercado Tine" },
    { id: "5", title: "Mercado Tine 2" },
    { id: "6", title: "Mercado Tine 3" },
    { id: "7", title: "Mercado Tine 4" },
    { id: "8", title: "Mercado Tine 5" },
  ];

  const [keyboardShown, setKeyboardShown] = useState(false);
  const [marketData, setMarketData] = useState(data);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardShown(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardShown(false);
      }
    );

    // Limpar listeners ao desmontar o componente
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  console.log({ keyboardShown });

  // Função para filtrar os dados pelo título
  const filterDataByTitle = (searchTerm) => {
    // Transforma o searchTerm para minúsculas para comparar sem distinção de maiúsculas/minúsculas
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

    // Filtra os dados com base no título usando indexOf para encontrar qualquer parte da palavra
    const result = data.filter(
      (item) => item.title.toLowerCase().indexOf(lowerCaseSearchTerm) !== -1
    );

    setMarketData(result);
  };

  const renderItem = ({ item }) => (
    <View
      className={`w-full p-6 mb-0 border-b-2 ${
        item.id === "1" ? "border-t-2" : ""
      } text-white text-center  border-[#f5f5f5]`}
    >
      <Title text={item.title} className=" text-[1.1rem] font-bold" />
    </View>
  );

  return (
    <View className="flex-1" style={{ marginTop: keyboardShown ? -100 : "" }}>
      <StatusBar backgroundColor="#5CA439" style="light" />

      <View className="p-5">
        <View style={{ marginBottom: 10 }}>
          <CardComponent
            action={() => {}}
            key={8}
            className="h-max bg-[#fff] mt-2 mb-0"
          >
            <Chip
              key={0}
              onPress={() => console.log(` pressed`)}
              style={{
                backgroundColor:
                  "Viagem Concluída" === "Viagem Concluída"
                    ? "#5CA439"
                    : "#2D2D2D",
                borderRadius: 60,
                alignSelf: "flex-end",
              }}
              textStyle={{ fontSize: 10, color: "#fff" }}
            >
              Viagem Concluída
            </Chip>

            <Title text="Referência" className=" text-[1rem] font-bold" />
            <Title
              text="SM.2892847"
              className="pb-2 text-[1.3rem] font-normal"
            />

            <Title text="Veículo" className=" text-[1rem] font-bold" />
            <Title text="Mota" className="pb-2 text-[.8rem] font-normal" />

            <TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                <Text className="py-2 text-black text-[.8rem] font-normal underline">
                  Fechar Sessão
                </Text>
              </View>
            </TouchableOpacity>
          </CardComponent>
        </View>
      </View>

      <View className="p-1">
        <View className="`w-full p-5 rounded-tl rounded-tr justify-between h-max bg-[#fff]">
          <View className="flex-row w-full items-center">
            <View className="w-1/3">
              <Title
                text="Mercados"
                className=" text-[1.3rem] font-bold mr-5"
              />
            </View>
            <View className="border w-60 h-12 p-1 rounded-md">
              <View className="flex flex-row items-center">
                <View
                  className="border-r-2 mr-2 h-10 pt-2 border-[#f5f5f5]"
                  style={{ transform: [{ translateY: -1 }] }}
                >
                  <JSFIcons.searchMarket width={40} />
                </View>
                <TextInput
                  // multiline
                  // numberOfLines={3}
                  onChangeText={(e) => filterDataByTitle(e)}
                  className=" max-w-44 h-10"
                  placeholder="Pesquisar Mercado"
                />
              </View>
            </View>
          </View>
        </View>
        <View className="h-auto">
          <FlatList
            className="pt-2 bg-[#fff] mb-96"
            data={marketData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ width: "100%" }}
          />
        </View>
      </View>
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
