import { View } from "react-native";
import { JSFIcons } from "../../../assets/Icons";
import IconButtonComponent from "../ui/IconButtonComponent";
import { useDefaultStore } from "@/context/zustand";
import {  useRouter } from "expo-router";



export default function MenuFarmars ({isContactFarmer}){

    const {push} = useRouter()

    const [activeTab] = useDefaultStore((state) => [
        state.activeTab
    ])

    function handleNextPage(){
        push('contactFarmer/home/farmer/createStepOne')
    }

    return(

        <View className="flex-row">
           {isContactFarmer==true&&<IconButtonComponent svg={JSFIcons.addFarmar} iconSize={20}  border={0} borderColor="transparent" color="#000" action={() => handleNextPage()} size={20} />
             } 
             {/* <IconButtonComponent svg={JSFIcons.search} iconSize={20}  border={0} borderColor="transparent" color="#000" action={() => {}} size={20} />
              <IconButtonComponent svg={JSFIcons.menuLeft} iconSize={20}  border={0} borderColor="transparent" color="#000" action={() => {}} size={20} /> */}
        </View>
    )
}