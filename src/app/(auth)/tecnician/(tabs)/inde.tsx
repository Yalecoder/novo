// import CardComponent from "@/components/ChipComponentui/Card";
// import ChipComponent from "@/components/";

import IconButtonComponent from "@/components/ui/IconButtonComponent";
// import Title from "@/components/ui/Title";
import { Button, ScrollView, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { useRouter, useNavigation, router } from "expo-router";
import FlipSvg from '../../../../../assets/Icons/Grupo_3855.svg';
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
import { Chip } from 'react-native-paper';

export default function Sessions() {
  const [updateTab] = useDefaultStore((state) => [
    state.setTab
  ]);

  const isFocused = useIsFocused()

  const { push } = useRouter()
  const [farmersList, setFarmersList] = useState();


  const chipTopData = [
    { id: 1, label: 'Concluida' },
  ];

  const chipData = [
    { id: 1, label: 'SM.2892847', icon: "information", status: "Viagem Iniciada", date:"4/08/24", period:"Todo dia", agency:"Malema 1", market:"Mercado 001" },
    { id: 2, label: 'SM.693824', icon: "information", status: "Viagem Concluída",date:"9/08/24", period:"Manhã", agency:"Malema 2", market:"Mercado 002" },
    { id: 3, label: 'SM.783209', icon: "information", status: "Viagem Iniciada",date:"18/08/24", period:"Manhã", agency:"Malema 5", market:"Mercado 005" },
    { id: 4, label: 'SM.7832098', status: "Viagem Concluída",date:"30/08/24", period:"Todo dia", agency:"Malema 10", market:"Mercado 20" },
  ];


  // async function fetchData() {
  //   const data = await getData()

  //   //   console.log("farmers",{data})
  //   setFarmersList(data);
  // }

  // useEffect(() => {
  //   if (isFocused) {
  //     console.log('#-----------  farmars')
  //     updateTab('farmars')
  //   }



  //   fetchData()
  // }, [isFocused]);

  return (
    <View >
      <StatusBar backgroundColor='#5CA439' style='' />
      <ScrollView className="p-5" >

      <View style={{marginBottom:50}}>
                {chipData?.map((chip, index) => (
                  <CardComponent action={() => { push('/tecnician/session/kkkkk')}} key={index} className="h-max bg-[#fff] mt-2 mb-2">
                        <Chip
                  key={chip.id}

                  onPress={() => console.log(`${chip.label} pressed`)}
                  style={{
                    backgroundColor: chip.status === 'Viagem Concluída' ? '#5CA439' : '#2D2D2D',
                    borderRadius: 60,
                    alignSelf:"flex-end"
                  }}
                  textStyle={{ fontSize: 10, color: "#fff" }}
                >
                  {chip?.status}

                </Chip>
              
                      <Title text="Referência"  className=" text-[1rem] font-bold"/> 
                      <Title text={chip?.label}  className="pb-2 text-[1.3rem] font-normal"/> 
                      
                      <Title text="Veículo"  className=" text-[1rem] font-bold"/> 
                      <Title text="Mota"  className="pb-2 text-[.8rem] font-normal"/> 
                    
                  </CardComponent>
                ))}
        </View>
      

      </ScrollView>
    </View>
  )
}



const styles = StyleSheet.create({

  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

  }
});