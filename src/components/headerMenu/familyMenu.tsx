import { View } from "react-native";
import { JSFIcons } from "../../../assets/Icons";
import IconButtonComponent from "../ui/IconButtonComponent";
import { useDefaultStore } from "@/context/zustand";
import { useRouter } from "expo-router";

export default function FamilyMenuFarmers({ route }) {
  const { push } = useRouter();

  function handleNextPage() {
    push(route);
  }

  return (
    <View className="flex-row">
      <IconButtonComponent
        svg={JSFIcons.edit2}
        iconSize={20}
        border={0}
        borderColor="transparent"
        color="#000"
        action={() => handleNextPage()}
        size={20}
      />
    </View>
  );
}
