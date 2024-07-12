import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen, Stack, useRouter } from "expo-router";
import { Fragment, useEffect } from "react";
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import "@/styles/global.css";
import { JFSDb } from "@/database";
import migrations from "@/database/drizzle/migrations";
import { Image, Text } from "react-native";
import { JSFIcons } from "../../assets/Icons";
import IconButtonComponent from "@/components/ui/IconButtonComponent";
import { useDefaultStore } from "@/context/zustand";
import MenuFarmars from "@/components/headerMenu/farmars";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  const [activeTab, user] = useDefaultStore((state) => [
    state.activeTab,
    state.user,
  ]);


  const { success } = useMigrations(JFSDb, migrations)
  console.log("state", success)

  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });


  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }



  return (<>
  <Text>ola</Text>
  </>)
}

function RootLayoutNav({tab}) {

  return (
    <Stack
      screenOptions={{
        headerStyle:{backgroundColor:'#5CA439',},
        headerShadowVisible:false,
        headerTintColor:"#fff",
      }}
    >
      <Stack.Screen   options={{
          title:'',
          headerRight: ()=> (
            <Fragment>
              {tab == 'farmars' && <MenuFarmars isContactFarmer={false}/>}
            </Fragment>
          )
        }}  
        name="(tabs)" 
      />


      
    </Stack>
  );
}


