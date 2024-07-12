import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import Title from '@/components/ui/Title';
import { useRouter } from 'expo-router';

export default function TaskHistory() {

    const {push} = useRouter()

    const Filter = [
        { id: 1, label: 'Tarefa Recebida'},
        { id: 2, label: 'Tarefa Iniciada'},
        { id: 3, label: 'Tarefa Interrompida'},
        { id: 4, label: 'Tarefa Re-iniciada'},
        { id: 5, label: 'Tarefa Concluída'},
    
    ];
  return (
    <View  >
    <StatusBar backgroundColor='#5CA439' style='' />
    <ScrollView  contentContainerStyle={{ paddingBottom: 80, }} style={{ backgroundColor: "whitesmoke" }}>

        {/* Task Card */}


        {Filter?.map((chip, index) => (

<TouchableOpacity


>
<View tabIndex={index} className="flex-1  p-5 " style={{borderBottomWidth:1, borderColor:"#738276"}}>
            <View >
                
                <Text className='text-[1rem] mr-5 font-bold'
                style={{ color: chip.label === 'Tarefa Concluída' ? '#5CA439' : '#000' }} 
                > {chip?.label} </Text>
                
                <Text>4 de Abrirl de 2024, às 19:39:04</Text>
            </View>
           

        </View>
</TouchableOpacity>

           
          ))}
       
        
        

      
      


    </ScrollView>
</View>
  )
}

