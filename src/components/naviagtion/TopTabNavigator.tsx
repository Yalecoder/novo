import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();





export function TopTab() {

  


  return (
    <Tab.Navigator>
      <Tab.Screen name="Home"/>
      {/* <Tab.Screen name="Settings" /> */}
    </Tab.Navigator>
  );

}