import React, { useState } from "react";
import { View, ScrollView, Dimensions, Text } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useRoute } from '@react-navigation/native';

import CameraComponent from "@/components/ui/CameraComponent";

const createStepTwo = () => {



  const route = useRoute();
  const { data } = route.params;
  
  // Parse the JSON string to get the object
  const farmerData = JSON.parse(data);


 
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const { push, } = useRouter();

  const onSubmit = (data) => { };

  const handleFormSubmit = () => {

    push("home");
  };

  return (
    <View className="h-full">
      <ScrollView>
        <CameraComponent redirect="/home/farmer/previwerPic" data={farmerData} />
      </ScrollView>
    </View>
  );
};

export default createStepTwo;
