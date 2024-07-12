import FamilyMenuFarmers from "@/components/headerMenu/familyMenu";
import MenuFarmars from "@/components/headerMenu/farmars";
import { setCampaingTab, useDefaultStore } from "@/context/zustand";
import { Redirect, Stack } from "expo-router";
import React, { Fragment } from "react";
import { Text } from "react-native";

export default function AppLayout() {
  const [user, tab] = useDefaultStore((state) => [state.user, state.activeTab]);
  const [activeCampaignTab] = setCampaingTab((state) => [
    state.activeCampaignTab,
  ]);

  console.log("----------------------", { user });

  if (!user) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#5CA439" },
        headerShadowVisible: false,
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        options={{
          title: "",
          headerRight: () => (
            <Fragment>
              {tab == "farmars" && <MenuFarmars isContactFarmer={true} />}
            </Fragment>
          ),
        }}
        name="(tabs)"
      />

      <Stack.Screen
        name="home/farmer/[id]"
        options={{ title: "Detalhe do Produtor" }}
      />
      <Stack.Screen
        name="home/farmer/createStepOne"
        options={{ title: "Novo Produtor" }}
      />
      <Stack.Screen
        name="home/farmer/createStepTwo"
        options={{ title: "Foto Do Produtor" }}
      />
      <Stack.Screen
        name="home/farmer/createStepThree"
        options={{ title: "Novo Produtor" }}
      />
      <Stack.Screen
        name="home/farmer/previwerPic"
        options={{ title: "Foto Produtor" }}
      />
      <Stack.Screen
        name="home/farmer/markArea"
        options={{ title: "Marcação de aréa" }}
      />


<Stack.Screen
        name="home/farmer/biometry"
        options={{ title: "Biometria" }}
      />



      <Stack.Screen
        name="home/farmer/areaDetails"
        options={{ title: "Detalhes da aréa" }}
      />
      <Stack.Screen
        name="home/farmer/(tabs)"
        options={{
          title: "Dados da campanha",
          headerRight: () => (
            <Fragment>
              {
                <FamilyMenuFarmers
                  route={
                    activeCampaignTab === "default"
                      ? "../farmer/cotton"
                      : "../otherCultures"
                  }
                />
              }
            </Fragment>
          ),
        }}
      />

      <Stack.Screen
        name="home/farmer/familyList"
        options={{
          title: "Família",
          headerRight: () => (
            <Fragment>{<FamilyMenuFarmers route={"./family"} />}</Fragment>
          ),
        }}
      />
      <Stack.Screen
        name="home/farmer/family"
        options={{ title: "Editar Família" }}
      />
      <Stack.Screen
        name="home/farmer/cotton"
        options={{ title: "Editar Dados Da Campanha" }}
      />
      <Stack.Screen
        name="home/farmer/otherCultures"
        options={{ title: "Editar Dados Da Campanha" }}
      />
    </Stack>
  );
}
