import React from 'react'
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../../global.css";
// import { SessionProvider } from "./ctx";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "login",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { success, error } = useMigrations(JFSDb, migrations);
  console.log(error, "adicionando migracoes : state", success);

  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // useEffect(() => {
  //   if (error) throw error;
  // }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}
import { Slot, Stack } from "expo-router";
import { JFSDb } from "@/database";
import migrations from "@/database/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import MenuFarmars from "@/components/headerMenu/farmars";

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#5CA439" },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Login", headerShown: false }}
      />

      <Stack.Screen
        name="market"
        options={{ title: "Seleciona o Mercado", headerShown: true }}
      />
    </Stack>
  );
}
