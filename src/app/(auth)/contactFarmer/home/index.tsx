import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }} className="flex-1">
      <View>
        <Link href="/">
          <Text>Ckkkkkk</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
