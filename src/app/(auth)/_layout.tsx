import MenuFarmars from '@/components/headerMenu/farmars';
import { useDefaultStore } from '@/context/zustand';
import { Redirect, Stack } from 'expo-router';
import React, { Fragment } from 'react';
import { Text } from 'react-native';



export default function AppLayout() {
    const [user, tab] = useDefaultStore((state) => [
        state.user,
        state.activeTab
    ]);

    console.log("----------------------", {user})

    if(!user){

        return <Redirect href={'/login'} />
    }


  return (
    <Stack
        screenOptions={{
          headerShown:false
        }}
    >
      
     
      {/* <Stack.Screen  name='home/farmer/[id]' options={{title:'Detalhe do Produtor'}} />
      <Stack.Screen name='home/farmer/createStepOne' options={{title:'Novo Produtor'}} />
      <Stack.Screen name='home/farmer/createStepTwo' options={{title:'Foto Do Produtor'}} />
      <Stack.Screen name='home/farmer/createStepThree' options={{title:'Novo Produtor'}} />
      <Stack.Screen name='home/farmer/previwerPic' options={{title:'Foto Produtor'}} />
       */}
      
      
    </Stack>
  )
}
