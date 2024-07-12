import { UserData } from "@/types/farmers";
import { userSchema } from "@/utils/validate/farmers";
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

const Formulario = () => {
  const [formData, setFormData] = useState<UserData>({
    username: "",
    email: "",
    age: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: keyof UserData, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" }); // Limpiar el error cuando se cambia el valor del campo
  };

  const handleSubmit = () => {
    try {
      const validatedData = userSchema.parse(formData);
      // Aquí puedes enviar los datos validados a través de una API o realizar otra acción
      Alert.alert("Datos válidos", JSON.stringify(validatedData));
    } catch (error) {
      const validationErrors = error?.errors?.reduce(
        (acc: Record<string, string>, validationError: any) => {
          return { ...acc, [validationError.path[0]]: validationError.message };
        },
        {}
      );
      setErrors(validationErrors);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Nombre de usuario:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        onChangeText={(text) => handleInputChange("username", text)}
        value={formData.username}
      />
      {errors.username && (
        <Text className="color-red-600 mb-4">{errors.username}</Text>
      )}
      <Text>Email:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        onChangeText={(text) => handleInputChange("email", text)}
        value={formData.email}
      />
      {errors.email && <Text className="color-red-600 mb-4">{errors.email}</Text>}
      <Text>idade:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        onChangeText={(text) => handleInputChange("age", text)}
        value={formData.age}
      />
      {errors.age && <Text className="color-red-600 mb-4">{errors.age}</Text>}
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
};

export default Formulario;
