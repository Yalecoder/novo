import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import Title from '@/components/ui/Title';
import { useRouter } from 'expo-router';

export default function Task() {

    const {push} = useRouter()

    const Filter = [
        { id: 1, label: 'Todas as Tarefas'},
        { id: 2, label: 'Em Progresso'},
        { id: 3, label: 'Interrompidas'},
        { id: 4, label: 'Não Iniciadas'},
        { id: 5, label: 'Concluídas'},
    
    ];
  return (
    <View  >
    <StatusBar backgroundColor='#5CA439' style='' />
    <ScrollView  contentContainerStyle={{ paddingBottom: 80, }} style={{ backgroundColor: "whitesmoke" }}>

        {/* Task Card */}


        {Filter?.map((chip, index) => (

<TouchableOpacity

onPress={() => {push('/tecnician/(tabs)')}}
>
<View tabIndex={index} className="flex-1  p-5 " style={{borderBottomWidth:1, borderColor:"#738276"}}>
            <View >
                <Title text={chip?.label} className=' text-[1rem] mr-5 font-medium'/>
            </View>
           

        </View>
</TouchableOpacity>

           
          ))}
       
        
        

      
      


    </ScrollView>
</View>
  )
}

