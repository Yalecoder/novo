import React, { useEffect } from "react";

import { View, Text, ScrollView, FlatList, TouchableOpacity,   } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Title from "@/components/ui/Title";
import { Fragment, useState } from "react";
import { cn } from "@/utils/utlis";
import { useRouter } from "expo-router";
import CardComponent from "@/components/ui/Card";
import { useDefaultStore } from "@/context/zustand";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";



interface subItemProps {

    title:string
    value:string
}

interface itemProps {
    id:string
    title:string
    icon:any
    listItens: subItemProps[]
    className:string
}



function Item({listItens, icon, className, title}:itemProps){

    return(
        <View className="mr-5">
            <StatusBar backgroundColor='#5CA439' style=''/>
            <CardComponent  className={cn("bg-[#5CA439] p-5 mr-5 flex justify-between ", className)}>
            <View className="flex-row items-center">
                {icon}
                <Title text={title} className="font-normal text-white" />
            </View>
            <Fragment>
                {
                    listItens?.map((item, index)=> (
                        <View  key={index} className="mt-5">
                            <Text className="text-[1rem] text-white mr-5" >{item.title}</Text>
                            <Title text={item.value} className="text-white"  />
                        </View>
                    ))
                }
            </Fragment>
        </CardComponent>
        </View>
    )

}



export default function Markets(){

    const [updateTab] = useDefaultStore((state) => [
        state.setTab
    ]);
    const isFocused = useIsFocused()

    const [seedData, setDataSeed] = useState<itemProps[]>([
        {
            id:"1",
            icon:<MaterialCommunityIcons name="seed" size={24} color="#fff" />,
            title: "Semente",
            listItens:[
                {
                    title:'A SAN entregou-lhe:',
                    value:'12'
                },
                {
                    title:'Quantidade de Produtores:',
                    value:'322'
                },
                {
                    title:'Quantidade distribuída:',
                    value:'314'
                },
                {
                    title:'Sobra consigo:',
                    value:'12'
                }
            ]
        },
        {
            id:"2",
            icon:<MaterialCommunityIcons name="seed" size={24} color="#fff" />,
            title: "Semente 2",
            listItens:[
                {
                    title:'A SAN entregou-lhe:',
                    value:'12'
                },
                {
                    title:'Quantidade de Produtores:',
                    value:'322'
                },
                {
                    title:'Quantidade distribuída:',
                    value:'314'
                },
                {
                    title:'Sobra consigo:',
                    value:'12'
                }
            ]
        },
        {
            id:"3",
            icon:<MaterialCommunityIcons name="seed" size={24} color="#fff" />,
            title: "Semente",
            listItens:[
                {
                    title:'A SAN entregou-lhe:',
                    value:'12'
                },
                {
                    title:'Quantidade de Produtores:',
                    value:'322'
                },
                {
                    title:'Quantidade distribuída:',
                    value:'314'
                },
                {
                    title:'Sobra consigo:',
                    value:'12'
                }
            ]
        },
        {
            id:"4",
            icon:<MaterialCommunityIcons name="seed" size={24} color="#fff" />,
            title: "Semente",
            listItens:[
                {
                    title:'A SAN entregou-lhe:',
                    value:'12'
                },
                {
                    title:'Quantidade de Produtores:',
                    value:'322'
                },
                {
                    title:'Quantidade distribuída:',
                    value:'314'
                },
                {
                    title:'Sobra consigo:',
                    value:'12'
                }
            ]
        },
    ])


    useEffect(()=> {
        
        if(isFocused){
            console.log('#-----------  Markets')
            updateTab('Markets')
        }
    }, [isFocused])
    



    return(
        <View style={{flex:1}}>
            <ScrollView showsVerticalScrollIndicator={false} className="p-0 ml-5" contentContainerStyle={{paddingBottom:80, gap:20}} >

                <View className="flex-1 mt-5">
                    <Title text={"Dados de Sementes"} className="mb-3 font-semibold text-[20px] " />
                    <FlatList
                        horizontal
                        data={seedData}
                        renderItem={(item) => <Item key={item.index} title={item.item.title} listItens={item.item.listItens} icon={item.icon}/>}
                        keyExtractor={item => item.id}
                        className="pb-4"
                        showsHorizontalScrollIndicator={false}
                    />
                </View>


                <View className="flex-1 mb-14">
                    <Title text="Dados de Químicos" className="mb-0 font-semibold text-[20px] " />
                    <Item  className="bg-[#293E1E]" title={'Químicos'} listItens={[
                        {
                            title:'Sobra consigo:',
                            value:'12'
                        }
                    ]}/>
                </View>

                <View className="flex-1 mb-14">
                    <Title text="Dados de Kits" className="mb-3 font-semibold text-[20px] " />
                    <Item  className="bg-[#293E1E]" title={'Kits'} listItens={seedData[0].listItens}/>
                </View>

                <View className="flex-1 mb-14">
                    <Title text="Dados de Kits" className="mb-3 font-semibold text-[20px] " />
                    <Item  className="bg-[#5CA439]" title={'Reforço'} listItens={[
                        {
                            title:'Sobra consigo:',
                            value:'12'
                        }
                    ]}/>
                </View>
                
            </ScrollView>
        </View>
    )
}
