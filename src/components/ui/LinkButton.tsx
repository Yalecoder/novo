import { cn } from "@/utils/utlis";
import { Pressable, Text } from "react-native";


interface LinkProps {
    action: ()=> void
    className:string
}




export default function LinkButton({text,className, action}:LinkProps){

    return(
        <Pressable onPress={()=> action()}>
            <Text style={{paddingTop:10}} className={cn(`underline `, className)}>{text}</Text>
        </Pressable>
    )
}