import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import CameraComponent from '@/components/ui/CameraComponent';
import ButtonComponent from '@/components/ui/Button';

const StepTwo = ({ onPrev, onNext }) => {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const RPH = (percentage) => {
    return (percentage / 100) * screenHeight; 
    };

    const RPW = (percentage) => {
      return (percentage / 100) * screenWidth;
    };


  const boxWidth = RPW(40);
  const boxHeight = RPH(30);
  const handleNext = () => {
    // Handle next step actions
    onNext();
  };

  return (
    <View>


<CameraComponent />
     
    </View>
      
     

  );
};

export default StepTwo;
