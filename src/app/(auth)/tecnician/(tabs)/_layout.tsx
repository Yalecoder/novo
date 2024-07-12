import {
    createMaterialTopTabNavigator,
    MaterialTopTabNavigationOptions,
    MaterialTopTabNavigationEventMap
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { View } from "react-native";
import {TabNavigationState, ParamListBase} from '@react-navigation/native'



const {Navigator} = createMaterialTopTabNavigator()


export const MaterialTopTabs = withLayoutContext <MaterialTopTabNavigationOptions, typeof Navigator, TabNavigationState<ParamListBase>, MaterialTopTabNavigationEventMap>(Navigator)

const Layout = () => {

    return(

        <MaterialTopTabs screenOptions={{tabBarStyle: { backgroundColor: '#5CA439' }, tabBarIndicatorStyle:{backgroundColor:'#fff', height:6}}}>

          <MaterialTopTabs.Screen name="index" options={{title:'Tarefas',tabBarLabelStyle:{color:"#fff", fontWeight:'bold'}}} />
          <MaterialTopTabs.Screen name="inde" options={{title:'Sessões',tabBarLabelStyle:{color:"#fff", fontWeight:'bold'}}} />
          
          
        </MaterialTopTabs>
    )
}

export default Layout;