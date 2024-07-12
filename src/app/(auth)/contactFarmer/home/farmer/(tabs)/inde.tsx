import { setCampaingTab, setFamerId } from "@/context/zustand";
import { getAuxiliarTable } from "@/database/actions/auxliaryTable";
import {
  getOneFarmerFamily,
  getOneFarmerOtherCultures,
} from "@/database/actions/getFarmer";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function IndexTab() {
  const route = useRoute();
  const [farmer] = setFamerId((state) => [state.farmerId]);
  const [otherCultures, setOtherCultures] = useState([]);
  const [updateCampaignTab] = setCampaingTab((state) => [state.setCampaignTab]);

  const [activeTab] = setCampaingTab((state) => [state.activeCampaignTab]);

  console.log({ activeTab });

  const isFocused = useIsFocused();

  async function fetchOtherCulturesDataSave() {
    const deserializeArray = (jsonString) => JSON.parse(jsonString);

    try {
      const response = await getOneFarmerOtherCultures(farmer?.farmerId);
      if (response && response.otherCultures) {
        const cultures = deserializeArray(response.otherCultures);
        const formattedCultures = cultures.map((culture) => ({
          id: culture?.id,
          name: culture?.name,
          value: culture?.value || "",
        }));

        setOtherCultures(formattedCultures);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchOtherCultures() {
    const deserializeArray = (jsonString) => JSON.parse(jsonString);

    try {
      const data = await getAuxiliarTable();

      const cultures = deserializeArray(data?.otherCultures);
      const formattedCultures = cultures.map((culture) => ({
        id: culture?.id,
        name: culture?.name,
        value: "",
      }));

      setOtherCultures(formattedCultures);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isFocused) {
      console.log("#-----------  algodao");
      updateCampaignTab("other");
    }

    fetchOtherCultures();
    fetchOtherCulturesDataSave();
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <View
      className="pb-3 pt-3"
      style={{ borderBottomWidth: 1, borderColor: "whitesmoke" }}
    >
      <Text className="text-[1.2rem] font-bold">{item.name}</Text>
      <Text className="text-[1rem] pt-1">
        {item.value ? item.value : "Não definido"}
      </Text>
    </View>
  );

  return (
    <View className="flex flex-1 bg-white">
      <View className="pr-5 pl-5">
        <FlatList
          data={otherCultures}
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
