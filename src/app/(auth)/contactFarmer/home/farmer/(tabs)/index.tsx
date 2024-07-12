import { setCampaingTab, setFamerId } from "@/context/zustand";
import { getOneFarmerCotton } from "@/database/actions/getFarmer";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { Fragment, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function IndexTab1() {
  const route = useRoute();
  const [farmer] = setFamerId((state) => [state.farmerId]);
  const [family, setFamily] = useState({});
  const [updateCampaignTab] = setCampaingTab((state) => [state.setCampaignTab]);

  console.log("asdasdsad", { farmer });

  const isFocused = useIsFocused();

  async function getFamily() {
    const data = await getOneFarmerCotton(farmer?.farmerId);

    console.log({ data });

    setFamily(data?.length > 0 ? data[0] : {});

    return data;
  }

  useEffect(() => {
    if (isFocused) {
      console.log("#-----------  algodao 1");
      updateCampaignTab("default");
    }

    getFamily();
  }, [isFocused]);

  const data = [
    {
      id: "1",
      title: "Estimativa (ha)",
      value: family?.estimateHa ? family?.estimateHa : "Nào definido",
    },
    {
      id: "2",
      title: "Nº de Homens Permanentes",
      value: family?.numberOfPermanentMen
        ? family?.numberOfPermanentMen
        : "Nào definido",
    },
    {
      id: "3",
      title: "Nº de Homens Sazonais",
      value: family?.numberOfSeasonalMen
        ? family?.numberOfSeasonalMen
        : "Nào definido",
    },
    {
      id: "4",
      title: "Nº de Mulheres Permanentes",
      value: family?.numberOfPermanentWomen
        ? family?.numberOfPermanentWomen
        : "Nào definido",
    },
    {
      id: "5",
      title: "Nº de mulheres sazonais",
      value: family?.numberOfSeasonalWomen
        ? family?.numberOfSeasonalWomen
        : "Nào definido",
    },
    {
      id: "6",
      title: "Nº de menores",
      value: family?.numberOfMinors ? family?.numberOfMinors : "Nào definido",
    },
  ];

  const renderItem = ({ item }) => (
    <View
      className="pb-3 pt-3"
      style={{ borderBottomWidth: 1, borderColor: "whitesmoke" }}
    >
      <Text className="text-[1.2rem] font-bold">{item.title}</Text>
      <Text className="text-[1rem] pt-1">{item.value}</Text>
    </View>
  );

  return (
    <View className="flex flex-1 bg-white">
      <View className="pr-5 pl-5 pt-3">
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
