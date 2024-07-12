import { setFamerId } from "@/context/zustand";
import { getOneFarmerFamily } from "@/database/actions/getFarmer";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { Fragment, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function FamilyList() {
  const route = useRoute();
  const [farmer] = setFamerId((state) => [state.farmerId]);
  const [family, setFamily] = useState({});

  console.log("asdasdsad", { farmer });

  const isFocused = useIsFocused();

  async function getFamily() {
    const data = await getOneFarmerFamily(farmer?.farmerId);

    setFamily(data?.length > 0 ? data[0] : {});

    return data;
  }

  useEffect(() => {
    getFamily();
  }, [isFocused]);

  const data = [
    {
      id: "1",
      title: "Casa melhorada",
      value: family?.improvedHouse ? family?.improvedHouse : false,
    },
    {
      id: "2",
      title: "Sabe ler",
      value: family?.knowRead ? family?.knowRead : false,
    },
    {
      id: "3",
      title: "Tem Rádio",
      value: family?.hasRadio ? family?.hasRadio : false,
    },
    {
      id: "4",
      title: "Tem Bicicleta",
      value: family?.hasBicycle ? family?.hasBicycle : false,
    },
    {
      id: "5",
      title: "Tem Motociclo",
      value: family?.hasMotorcycle ? family?.hasMotorcycle : false,
    },
    {
      id: "6",
      title: "Agregado Familiar",
      value: family?.houseHold ? family?.houseHold : false,
    },
    {
      id: "7",
      title: "Género",
      value:
        family?.gender === "male"
          ? "Masculino"
          : family?.gender === "female"
          ? "Feminino"
          : "Não definido",
    },
    {
      id: "8",
      title: "Estado Civil",
      value:
        family?.maritalStatus === "single"
          ? "Solteiro/a"
          : family?.maritalStatus === "divorced"
          ? "Divorciado/a"
          : family?.maritalStatus === "married"
          ? "Casado/a"
          : family?.maritalStatus === "widower"
          ? "Divorciado/a"
          : "Não definido",
    },
    {
      id: "9",
      title: "Religião",
      value: family?.religion ? family?.religion : "Não definido",
    },
    {
      id: "10",
      title: "Etnia",
      value: family?.ethnicity ? family?.ethnicity : "Não definido",
    },
  ];

  const renderItem = ({ item }) => (
    <View
      className="pb-3 pt-3"
      style={{ borderBottomWidth: 1, borderColor: "whitesmoke" }}
    >
      <Text className="text-[1.2rem] font-bold">{item.title}</Text>
      <Text className="text-[1rem] pt-1">
        {item.value == false
          ? "Não"
          : item.value == true
          ? "Sim"
          : item.value
          ? item.value
          : "Não definido"}
      </Text>
    </View>
  );

  return (
    <View className="flex flex-1 bg-white">
      <View className="bg-[#5CA439] w-full p-5">
        <Text className="text-[1.3rem] text-white">Nome do Produtor</Text>
        <Text className="text-white opacity-90">{farmer?.farmerName}</Text>
      </View>

      <View className="pr-5 pl-5">
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{ height: "89%" }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
