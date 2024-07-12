import { cn } from "@/utils/utlis";
import { Text } from "react-native";


interface TextProps {

    className?:string
    text:string

}



export default function Title({className, text}:TextProps){


    return( 
        <Text className={cn("text-inherit text-[2rem] font-bold", className)} style={{}}>{text}</Text>
    )
}