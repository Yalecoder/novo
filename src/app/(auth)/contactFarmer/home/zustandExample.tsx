import { useStore } from "@/context/zustand";
import { Text, TouchableOpacity, View } from "react-native";

export default function Increment() {
  const { count, inc } = useStore();

  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity >
        <Text>Incrementar</Text>
      </TouchableOpacity>
    </View>
  );
}
