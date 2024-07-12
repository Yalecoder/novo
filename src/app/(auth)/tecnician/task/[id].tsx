import { View, Text } from 'react-native';
import React, { useState, Fragment } from 'react';
import { Button, ScrollView, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import Title from '@/components/ui/Title';
import { Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cn } from "@/utils/utlis";
import { useRouter } from "expo-router";
import CardComponent from "@/components/ui/Card";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import InformationDialog from '@/components/modal/InformationDialog';
import TaskObservation from '@/components/modal/TaskObservation';
import TaskState from '@/components/modal/TaskState';






interface subItemProps {

    title: string
    value: string
}

interface itemProps {
    id: string
    title: string
    icon: any
    listItens: subItemProps[]
    className: string
}


function Item({ listItens, icon, className, title }: itemProps) {

    return (
        <View className="mr-5">
            <CardComponent className={cn("bg-[#5CA439] p-5 mr-5 flex justify-between ", className)}>
                <View className="flex-row items-center">
                    {icon}
                    <Title text={title} className="font-normal text-white" />
                </View>
                <Fragment>
                    {
                        listItens?.map((item, index) => (
                            <View key={index} className="mt-5">
                                <Text className="text-[1.2rem] text-white mr-5 font-bold" >{item.title}</Text>
                                <Title text={item.value} className="text-white text-[1rem] font-normal" />
                            </View>
                        ))
                    }
                    <View>
                        <Title text="Ver questionário completo" className='py-5 text-white text-[1rem] font-normal underline' />
                    </View>
                </Fragment>
            </CardComponent>
        </View>
    )

}


function SeedItem({ listItens, icon, className, title }: itemProps) {

    return (
        <View className="mr-5">
            <CardComponent className={cn("bg-[#668856] p-5 mr-5 flex justify-between ", className)}>
                <View className="flex-row items-center">
                    {icon}
                    <Title text={title} className="font-bold text-white text-[1.2rem]" />
                </View>
                <Fragment>
                    {
                        listItens?.map((item, index) => (
                            <View key={index} className="mt-5">
                                <Text className="text-[1.2rem] text-white mr-5 font-normal mt-[-1.2rem]" >{item.title}</Text>
                                <Title text={item.value} className="text-white text-[1rem] font-normal py-8 mb-3" />
                            </View>
                        ))
                    }
                    <View>
                        <Title text="Ver Detalhes da Entrega" className='py-5 text-white text-[1rem] font-normal underline' />
                    </View>
                </Fragment>
            </CardComponent>
        </View>
    )

}

function SeedItemGray({ listItens, icon, className, title }: itemProps) {

    return (
        <View className="mr-5">
            <CardComponent className={cn("bg-[lightgray] p-5 mr-5 flex justify-between ", className)}>
                <View className="flex-row items-center">
                    {icon}
                    <Title text={title} className="font-bold text-[#6E0000] text-[1.2rem]" />
                </View>
                <Fragment>
                    {
                        listItens?.map((item, index) => (
                            <View key={index} className="mt-5">
                                <Text className="text-[1.2rem] text-black mr-5 font-normal mt-[-1.2rem]" >{item.title}</Text>
                                <Title text={item.value} className="text-black text-[1rem] font-normal py-8 mb-3" />
                            </View>
                        ))
                    }
                    <View>
                        <Title text="Ver Detalhes da Entrega" className='py-5 text-black text-[1rem] font-normal underline' />
                    </View>
                </Fragment>
            </CardComponent>
        </View>
    )

}


export default function TaskId() {

    const [isModalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);

    const [textAreaModalVisible, setTextAreaModalVisible] = useState(false);
    const [isRadioModalVisible, setRadioModalVisible] = useState(false);
  
    const showModal = (message, success) => {
      setModalMessage(message);
      setIsSuccess(success);
      setModalVisible(true);
    };
  
    const hideModal = () => {
      setModalVisible(false);
    };



    const showTextAreaModal = () => {
        setTextAreaModalVisible(true);
    };

    const hideTextAreaModal = () => {
        setTextAreaModalVisible(false);
    };

    const handleSubmitText = (text) => {
        // Handle submit logic here, e.g., submit to API, update state, etc.
        console.log('Submitted text:', text);
        showModal('Observações editadas com sucesso!', true)

    }
  
    const handleRadioSubmit = (option) => {
        console.log('Selected option:', option);
        // Handle submission logic for the radio option here
        setRadioModalVisible(false); // Close modal after submission
        showModal('Estado alterado com sucesso!', true)
      };
   
      const {push} = useRouter()




    return (
        <View  >
            
            <StatusBar backgroundColor='#5CA439' style='' />
            <ScrollView className='p-5' contentContainerStyle={{ paddingBottom: 80, }} style={{ backgroundColor: "whitesmoke" }}>

                {/* Task Card */}



                <View className="flex-1 mb-10">
                    <View className="mr-1 mb-2">


                        
                        <CardComponent className={cn("bg-[#293E1E] p-5  flex justify-between ")}>
                            <View className="flex-row items-center">
                                <Title text="Maneio de Biodiversidade (picture block)" className="text-[1.4rem] mb-4 font-bold text-white" />
                            </View>
                            <Fragment>

                                <View  >
                                    <Text className="text-[1.2rem] text-white mr-5 font-bold" >4/08/24 | Manhã</Text>
                                    <Text className="text-[1.2rem] text-white mr-5 font-bold" >Agência - Mercado</Text>

                                </View>
                                <View className='my-4' >
                                    <Text className="text-[1.2rem] text-white mr-5 font-bold" >Produtor</Text>
                                    <Title text="Nome do Produtor" className="text-white font-normal text-[1rem]" />
                                </View>

                            </Fragment>
                        </CardComponent>
                    </View>
                    {/* <View >
                    <Title text={"Descrição"} className=" font-bold text-[1.2rem] text-[#000] " />
                    <Text >Descrição da Tarefa. Pode ser detalhada a ponto de ocupar múltiplas linhas de texto.</Text>
                    </View>
                     */}

                </View>

                {/* <TouchableOpacity
        style={styles.button}
        onPress={() => showModal('Produtor adicionado com sucesso!', true)}
      >
        <Text style={styles.buttonText}>Show Success</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => showModal('Error! Something went wrong.', false)}
      >
        <Text style={styles.buttonText}>Show Error</Text>
      </TouchableOpacity> */}


      {/* <TouchableOpacity
                    style={styles.button}
                    onPress={showTextAreaModal}
                >
                    <Text style={styles.buttonText}>Show Text Area Modal</Text>
                </TouchableOpacity> */}

         

                {/* Description*/}
                <View className="flex-1 mt-5">

                    <Title text={"Descrição"} className=" font-bold text-[1.2rem] text-[#000] " />
                    <Text >Descrição da Tarefa. Pode ser detalhada a ponto de ocupar múltiplas linhas de texto.</Text>

                </View>

                {/* Observations */}
                <View className="mt-10" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>

                    <View className='w-[12rem]' >

                        <Title text={"Observações"} className=" font-bold text-[1.2rem] text-[#000]" />
                        <Text >Descrição da Tarefa. Pode ser detalhada a ponto de ocupar múltiplas linhas de texto.</Text>
                    </View>

                    <TouchableOpacity
                    
                    onPress={showTextAreaModal}
                >
<View style={{flexDirection:"row"}}>


                   <MaterialIcons name="mode-edit" size={24} color="#000" style={{marginTop:4}} />
                   <Text className='py-2 text-black text-[1rem] font-normal underline'>Adicionar</Text>
                

              
</View>
</TouchableOpacity>
                </View>

                {/* Actual State */}
                
                <View className="mt-10" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>

<View className='w-[8rem]' >

    <Title text={"Estado Actual"} className=" font-bold text-[1.2rem] text-[#000]" />
    <View style={styles.chipContainer}>
                    <Chip
                        key={99}
                        onPress={() => console.log(' pressed')}
                        style={styles.chip}
                        textStyle={{ color: "#fff", fontSize: 14 }}
                    >
                      Concluída
                    </Chip>
                </View>
</View>
<TouchableOpacity   onPress={() => setRadioModalVisible(true)}>
<View style={{flexDirection:"row"}}>
<MaterialIcons name="mode-edit" size={24} color="#000" style={{marginTop:4}} />
<Text className='py-2 text-black text-[1rem] font-normal underline'>Ver Histórico de Progresso</Text>

</View>
</TouchableOpacity>

</View>

  {/* History */}
  <View className="mt-10" style={{  alignItems: "flex-start" }}>


    <Text >Progresso último actualizado em 14/04/2024</Text>
    <TouchableOpacity   onPress={() => {push('tecnician/task/history')}}>
    <Text className='py-2 text-black text-[1rem] font-normal underline'>Ver Histórico de Progresso</Text>

    </TouchableOpacity>


</View>

            </ScrollView>
            <InformationDialog
        isVisible={isModalVisible}
        message={modalMessage}
        isSuccess={isSuccess}
        onClose={hideModal}
      />

<TaskObservation
                isVisible={textAreaModalVisible}
                onClose={hideTextAreaModal}
                onSubmit={handleSubmitText}
            />
             <TaskState
         isVisible={isRadioModalVisible}
         onClose={() => setRadioModalVisible(false)}
         onSubmit={handleRadioSubmit}
        />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    chipContainer: {
        alignSelf: 'flex-start',
        marginVertical: 20,
    },
    chipContainerWhite: {
        alignSelf: 'flex-start',
        marginVertical: 5,
    },
    chipContainerCenter: {
        alignSelf: 'center',
        marginVertical: 20,
    },
    chip: {
        backgroundColor: "#5CA439",
        borderRadius: 60,
    },
    chipWhite: {
        backgroundColor: "#fff",
        borderRadius: 60,
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    card: {


        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});
