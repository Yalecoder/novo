import { StyleSheet } from "react-native";
import { Button, Text, TouchableOpacity, View, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { marketStore } from "@/context/zustand";
import { getAuxiliarTable } from "@/database/actions/auxliaryTable";
import { useEffect, useState } from "react";

export default function Market() {
  const route = useRoute();
  const { navigate, push } = useRouter();
  const [setMarket] = marketStore((state) => [state.setMarket]);
  const [markets, setMarkets] = useState([]);

  async function fetchMarket() {
    const deserializeArray = (jsonString) => JSON.parse(jsonString);

    try {
      const data = await getAuxiliarTable();

      setMarkets(deserializeArray(data?.markets));
    } catch (error) {
      console.log(error);
    }
  }

  console.log({ markets });

  useEffect(() => {
    fetchMarket();
  }, []);

  const { type } = route.params;

  function submit(marketId) {
    setMarket(marketId);

    if (type === "TECHNICIAN") {
      push("tecnician/(tabs)");
    } else if (type === "FARMER_CONTACT") {
      push("contactFarmer/(tabs)");
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => submit(item?.id)}>
      <View className="bg-[#5CA439] p-6 mb-6 items-center rounded-[14]">
        <Text className="text-white text-[1.4rem]">{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="bg-white flex-1 p-5">
      <FlatList
        data={markets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
