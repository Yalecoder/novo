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

export default function Tasks() {
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
    { id: 1, label: 'Maneio de Biodiversidade (picture block)', icon: "information", status: "Concluída", date:"4/08/24", period:"Todo dia", agency:"Malema 1", market:"Mercado 001" },
    { id: 2, label: 'Maneio de Biodiversidade (picture block) 2', icon: "information", status: "Não Iniciada",date:"9/08/24", period:"Manhã", agency:"Malema 2", market:"Mercado 002" },
    { id: 3, label: 'Maneio de Biodiversidade (picture block) 3', icon: "information", status: "Interrompida",date:"18/08/24", period:"Manhã", agency:"Malema 5", market:"Mercado 005" },
    { id: 4, label: 'Maneio de Biodiversidade (picture block) 4', status: "Em Progresso",date:"30/08/24", period:"Todo dia", agency:"Malema 10", market:"Mercado 20" },
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

        <View style={styles.topContainer} >
          <Title text="Todas as tarefas" className="py-3 text-[1.2rem] font-bold" />

          <IconButtonComponent svg={FlipSvg} iconSize={14} border={0} borderColor="transparent" color="#000" action={() => {push('/tecnician/task') }} size={20} />
        </View>

        <View style={{ marginBottom: 50 }}>
          {chipData?.map((chip, index) => (
            <CardComponent action={() => push('/tecnician/task/8888')} key={index} className="h-max bg-[#fff] mt-2 mb-6">
              <Title text={chip?.label} className="py-2 text-[1.2rem] font-bold" />
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View >
                  <Text className="text-[#000]  text-[.6rem]"> {chip?.date} |

                    <Text className="text-[#5CA439]  text-[.6rem]"> {chip?.period}</Text>
                  </Text>
                  <Text className="text-[#000]  text-[.6rem]">{chip?.agency} - {chip?.market}</Text>
                </View>
              <Chip
                  key={chip.id}

                  onPress={() => console.log(`${chip.label} pressed`)}
                  style={{
                    backgroundColor: chip.status === 'Concluída' ? '#5CA439' : '#2D2D2D',
                    borderRadius: 60
                  }}
                  textStyle={{ fontSize: 10, color: "#fff" }}
                >
                  {chip?.status}

                </Chip>
              </View>

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