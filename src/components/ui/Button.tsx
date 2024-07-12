import { cn } from "@/utils/utlis";
import { Link } from "expo-router";
import {  ActivityIndicator, Pressable, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";


interface ButtonProps {

    title:string
    action: ()=> void
    loading?:boolean    
    className?:string,
    titleClass:string
}




export default function ButtonComponent({className, loading, title, action, titleClass} :ButtonProps){
    return(
        <Pressable disabled={loading} onPress={()=> action()} className={cn(" w-full h-[4rem] flex-row rounded-[10] justify-center items-center", className)}>
            {/* {loading &&<ActivityIndicator size={'small'} color={"#fff"} className="mr-2" />}
            <Text className={cn("text-white text-[1.3rem] font-bold", titleClass)}>{title}</Text>
        */}
            {loading ? (
        <ActivityIndicator size={'small'} color={"#fff"} className="mr-2" />
      ) : (
        <Text className={cn("text-white text-[1.3rem] font-bold", titleClass)}>{title}</Text>

      )}
        </Pressable>
    )
}