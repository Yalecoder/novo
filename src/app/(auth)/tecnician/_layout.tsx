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

        return <Redirect href={'/'} />
    }


  return (
    <Stack
        screenOptions={{
        headerStyle:{backgroundColor:'#5CA439',},
        headerShadowVisible:false,
        headerTintColor:"#fff",
      }}
    >
      <Stack.Screen 
        options={{
            title:'Geral',
            headerRight: ()=> (
              <Fragment>
                <MenuFarmars isContactFarmer={false} />
              </Fragment>
            )
          }}
      name="(tabs)"  />


      
<Stack.Screen name='task/[id]' options={{title:'Detalhe da Tarefa'}} />
<Stack.Screen name='task/index' options={{title:'Filtrar Tarefas'}} />
<Stack.Screen name='task/history' options={{title:'Histórico da Tarefa'}} />

<Stack.Screen      options={{
            title:'Sessão Móvel',
            headerRight: ()=> (
              <Fragment>
                <MenuFarmars isContactFarmer={false} />
              </Fragment>
            )
          }}   name='session/[id]'  />


     
      
      
      
    </Stack>
  )
}
