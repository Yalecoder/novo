import ButtonComponent from "@/components/ui/Button";
import CardComponent from "@/components/ui/Card";
import { useRoute } from "@react-navigation/native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Fragment, useState } from "react";
import { View, Image, Text, ActivityIndicator } from "react-native";

export default function PreviwerPic() {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params;
//   const { push } = useRouter();
//   const { data } = useLocalSearchParams();
  const farmerData = JSON.parse(data);

  const [loading, setLoading] = useState(false); // State for loading indicator

  

  function Next() {
    setLoading(true); // Show loading indicator
    setTimeout(() => {
      // Simulating delay for demonstration
    //   push({
    //     pathname: "/home/farmer/createStepThree",
    //     params: {
    //       data: JSON.stringify(farmerData),
    //     },
    //   });
      navigation.navigate('home/farmer/createStepThree', { data: JSON.stringify(farmerData) });
      setLoading(false); // Hide loading indicator
    }, 1000); // Adjust delay as needed
  }

  function Back() {
    navigation.goBack();
  }

  return (
    <Fragment>
      <View className="p-5 justify-evenly bg-white flex-1">
        <CardComponent className="bg-[#5CA439] h-[65%] p-[0]">
          {/* Display image with conditional rendering */}
          {farmerData?.photo ? (
            <Image
              className="w-[100%] h-[100%] object-none rounded-sm"
              source={{ uri: "data:image/png;base64," + farmerData.photo }}
              style={{ borderRadius: 8 }}
              resizeMode="cover" // Adjust resizeMode as per your requirement
            />
          ) : (
            <ActivityIndicator size="large" color="#5CA439" /> // Show loader if no photo data
          )}   
        </CardComponent>

        {/* Button to navigate to the next page */}
        <ButtonComponent
          className="bg-[#5CA439]"
          title="Avançar"
          action={() => Next()}
          loading={loading}
        />

        {/* Button to go back */}
        <ButtonComponent
          titleClass="text-[#5CA439] font-normal"
          className="border-[#5CA439]  border-2"
          title="Tirar Novamente"
          action={() => Back()}
          loading={loading}
        />
      </View>

      
    </Fragment>
  );
}
