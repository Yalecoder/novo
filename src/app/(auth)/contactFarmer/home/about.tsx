import React from "react";
import { Text, View } from "react-native";

// import { Container } from './styles';

const About: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>About</Text>
      <Text className="text-red-900">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quos excepturi porro quisquam nesciunt iure a quidem, minus, sint libero inventore amet fugit velit repellendus totam necessitatibus. Facere, doloremque nobis.</Text>
    </View>
  );
};

export default About;
