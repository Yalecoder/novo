import { cn } from "@/utils/utlis"
import { ReactNode } from "react"
import { View , Text, Pressable} from "react-native"



interface CardProps {
    children?:ReactNode,
    className?:string,
    action?: ()=> void
}



export default function CardComponent({children, className, action = () => {} }:CardProps){

    return(
        
        <Pressable  onPress={()=> action()} >
        <View className={cn(`w-full h-full p-5 rounded-[10] justify-between`, className)} >
            {children}
           
        </View>
    </Pressable>
       
    )
}


